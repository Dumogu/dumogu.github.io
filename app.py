from flask import Flask, render_template, send_file, jsonify, request
import os
import time
import threading
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

app = Flask(__name__)
IMAGE_PATH = r"D:\Myprog\Android\Image\screen.png"
last_update = 0


class ImageUpdateHandler(FileSystemEventHandler):
    def on_modified(self, event):
        global last_update
        if event.src_path.replace("/", "\\") == IMAGE_PATH:
            last_update = time.time()


def start_file_watcher():
    event_handler = ImageUpdateHandler()
    observer = Observer()
    observer.schedule(event_handler, os.path.dirname(IMAGE_PATH), recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


@app.route("/adb_tap", methods=["POST"])
def adb_tap():
    try:
        data = request.get_json()
        x, y = data["x"], data["y"]
        cmd = f"adb shell input tap {x} {y}"
        result = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=5
        )
        return jsonify(
            {"status": "success", "output": result.stdout, "error": result.stderr}
        )
    except subprocess.TimeoutExpired:
        return jsonify({"status": "error", "message": "ADB命令执行超时"}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        time.sleep(1)
        subprocess.run(
            f"adb exec-out screencap -p > D:/Myprog/Android/Image/screen.png",
            shell=True,
        )


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get_image")
def get_image():
    try:
        # 尝试发送图片文件
        return send_file(IMAGE_PATH, mimetype="image/png")
    except Exception as e:
        # 如果出现异常，返回错误信息
        return jsonify({"error": str(e)}), 404


@app.route("/check_update")
def check_update():
    return jsonify({"last_update": last_update})


if __name__ == "__main__":
    watcher_thread = threading.Thread(target=start_file_watcher)
    watcher_thread.daemon = True
    watcher_thread.start()
    app.run(debug=True, host="0.0.0.0", port=5000)

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/beta/')
def beta():
    return render_template('beta.html')

if __name__ == '__main__':
    app.run(debug=True)

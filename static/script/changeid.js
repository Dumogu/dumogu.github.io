function writeID() {
   let str = document.getElementById("idcard").value;
   document.getElementById("newID").innerHTML = changeID(str);
}

function changeID(str) {
   let text;
   let string = String(str)
   let len = string.length
   if (len != 15 && len != 18) {
      text = '输入字符长度为' + len + ',无法转换！';
      return text
   }
   newID = getNewID(string)
   let flag = checkID(newID)
   if (flag == 'ok' && newID.length != string.length) {
      return "转换成功：" + newID
   } else if (flag == 'ok' && newID.length == string.length && newID != string) {
      return "号码修正：" + newID
   }
   else {
      return flag
   }
}

function getNewID(str) {
   const_list = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
   key_list = '10X98765432'
   let new_string = ""
   if (str.length == 15) {
      new_string = str.slice(0, 6) + '19' + str.slice(6, 15)
   } else if (str.length == 18) {
      new_string = str.slice(0, 17)
   }
   sum = 0
   for (i = 0; i < 17; i++) {
      sum += const_list[i] * new_string[i]
   }
   new_string += key_list[sum % 11]
   return new_string
}

function checkID(id) {
   let string = String(id)
   let year = string.slice(6, 10);
   let month = string.slice(10, 12);
   let day = string.slice(12, 14);
   return checkDate(year, month, day)
}


function checkDate(year, month, day) {
   let run = false
   let msg = 'error'
   if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
      run = true
   }
   if (year < 1919) {
      msg = '出生年份有误！' + year
   } else if (run == true && month == 2 && day > 29) {
      msg = '闰年天数有误！' + day
   } else if (run == false && month == 2 && day > 28) {
      msg = '平年天数有误！' + day
   } else if (month in [1, 3, 5, 7, 8, 10, 12] && day > 31) {
      msg = '天数大于31天！' + day
   } else if (month in [4, 6, 9, 11] && day > 30) {
      msg = '天数大于30天！' + day
   } else if (month > 12) {
      msg = '月份大于12月！' + month
   }
   else {
      check = true
      msg = 'ok'
   }
   return msg
}


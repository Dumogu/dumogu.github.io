
function changeID(str) {
   // let x = document.getElementById("idcard").value;
   let text;
   let string = String(str)
   let len = string.length
   // console.log(len);
   if (len != 15 && len != 18) {
      text = '输入字符长度为' + len + ',无法转换！';
      string = null
   }
   else if (len == 18) {
      string = string.slice(0, 6) + string.slice(8, 17)
   }
   else {
      string = string
   };
   if (string == null) {
      console.log('这个不合法')
   }
   else {
      const_list = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      key_list = '10X98765432'
      console.log(string)
      let new_string = string.slice(0, 6) + '19' + string.slice(6, 15)
      str_list = new_string
      sum = 0
      for (i = 0; i < 17; i++) {
         sum += const_list[i] * str_list[i]
      }
      new_string += key_list[sum % 11]
      let year = new_string.slice(6, 10);
      let month = new_string.slice(10, 12);
      let day = new_string.slice(12, 14);
      check = checkDate(year, month, day);
      if (check == 'ok' && string == new_string) {
         text = splitID(new_string)
      } else if (check == 'ok' && string != new_string) {
         text = "身份证校验错误，修改为： " + splitID(new_string)
      } else {
         text = splitID(new_string) + '<br>身份证日期不合法:' + check
      };
   }
   return text
}

function splitID(id) {
   let string = String(id)
   return string.slice(0, 6) + " " + string.slice(6, 14) + " " + string.slice(14, 18)
}
console.log(splitID('41272719710712706X'))

// changeID('412727710712706') //41272719710712706X  412727710712706
console.log('This is a test!')

function checkDate(year, month, day) {
   let run = false
   let msg = 'error'
   if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
      run = true
   }
   if (year < 1919) {
      msg = '出生年份有误！'
   } else if (run == true && month == 2 && day > 29) {
      msg = '2月天数有误！'
   } else if (run == false && month == 2 && day > 28) {
      msg = '2月天数有误！'
   } else if (month in [1, 3, 5, 7, 8, 10, 12] && day > 31 || month > 12) {
      msg = '天数大于31天！或月份不合法！'
   } else if (month in [4, 6, 9, 11] && day > 30 || month > 12) {
      msg = '天数大于30天！或月份不合法！'
   } else {
      check = true
      msg = 'ok'
   }
   return msg
}
console.log(checkDate('2000', '02', '30'))




function changeID(str) {
   // let x = document.getElementById("idcard").value;
   let text;
   let string = String(str)
   let len = string.length
   // console.log(len);
   if (len != 15 && len != 18) {
      text = '输入字符长度为' + len + ',无法转换！';
      return text
   }
   else if (len == 18) {
      string = string.slice(0, 6) + string.slice(8, 17)
      let flag = checkID(string)
      if (flag == 'ok') {
         return string
      } else {
         return flag
      }
   }
   else if (len == 15) {
      string = string
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
      let check = checkID(new_string);
      if (check == 'ok') {
         text = new_string
      } else {
         text = new_string + '<br>身份证日期不合法:' + check
      };
   };
   return text
}


console.log(splitID('41272719710712706X'))

// changeID('412727710712706') //41272719710712706X  412727710712706
console.log('This is a test!')

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


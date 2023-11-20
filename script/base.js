
function changeID() {
    let x = document.getElementById("idcard").value;
   let text;
   let string = String(x)
   let len = string.length
   // console.log(len);
   if (len!=15) {
      text = '输入字符长度为'+len+',无法转换！';
   } else {
      const_list = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      key_list='10X98765432'
      console.log(string)
      new_string = string.slice(0,6) +'19' +string.slice(6,15)
      str_list = new_string
      sum=0
      for(i=0;i<17;i++) {
         sum+=const_list[i]*str_list[i]
//         console.log(const_list[i],str_list[i])
      }
      new_string+=key_list[sum%11]
      text = new_string;
      let year = new_string.slice(6,10);
      let month =new_string.slice(10,12);
      let day =new_string.slice(12,14);
      console.log(year,month,day)
      if (checkDate(year,month,day)){
        text = new_string
      }else if (year>1919){
        text = new_string+'身份证出生日期不存在！'
      }else{
        text=new_string+'身份证年份不符合规定！'
      }
      console.log(text)
   };
    document.getElementById("newID").innerHTML = text;
}

// function change(){
//    string = str(string)
//    if not string.isdigit() or len(string) != 15:
//        return string
//    const_list = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
//    key_list = '10X98765432'
//    new_string = string[:6] + '19' + string[6:]
//    str_list = list(new_string)
//    sum = 0
//    for i in range(17):
//        sum += const_list[i] * int(str_list[i])
//    new_string += key_list[sum % 11]
//    # print(string, new_string)
//    year, month, day = int(new_string[6:10]), int(new_string[10:12]), int(new_string[12:14])
//    # print(year, month, day)
//    if year > 1919 and check_date(year, month, day):
//        return new_string
//    else:
//        return string
// }

changeID('412727710712706')//41272719710712706X  412727710712706
// console.log('This is a test!')

function checkDate(year,month,day){
   let check = false
   let run = false
   if((year%4==0&&year%100!=0)||(year%400==0)){
      run=true
   }
   if (run&&month<13&&day<30){
      check = true
   }else if(!run&&month<12&&day<29){
      check= true
   }else{check=false}
   return check
}
console.log(checkDate('1999','02','28'))



function myFunction(num) {
   // 获取 id = "numb" 的输入字段的值
   let x = document.getElementById("idcard").value;
   // 如果 x 不是数字或小于 1 或大于 10
   let text;
   if (isNaN(x) || x < 1 || x > 10) {
      text = "输入无效";
   } else {
      text = "输入没问题";
   }
   document.getElementById("newidcard").innerHTML = text;
}

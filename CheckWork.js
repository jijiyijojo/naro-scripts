/*
cron: 21 *\/5 * 5
考勤结果，每五天检查一次
*/
const notify = require('./sendNotify')
const axios = require('axios')
const header =  {
        'Cookie': process.env.THINVENT_COOKIE

    }
const payload = process.env.THINVENT_PAYLOAD
console.log(payload)
const today = new Date()
const currentYear= today.getFullYear();
const currentMonth=today.getMonth()+1;
let fromattedMonth ='';
if( currentMonth<10) {
  fromattedMonth = '0'+currentMonth
} else{
  fromattedMonth = currentMonth
}
const url=`http://ehr.thinvent.com:16666/Web.HR//Mobile/Account/PostMonthAttendance?a0188=6248&yearMonth=${currentYear}-${fromattedMonth}&0.27744810840809886 `
axios.post(url,payload,{headers:header} )
.then((res) => {
  notify.sendNotify('⚠⚠本月缺勤⚠⚠',res.data[6]['Svalue'])
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})

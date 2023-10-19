/*
cron: 59 15 8,18 * * 1-5
上班打卡
*/
const notify = require('./sendNotify')
const axios = require('axios')
const header =  {
        "Content-type": "multipart/form-data, boundary=----WebKitFormBoundaryaSp5ER0SytDjXKd1",
        'Cookie': process.env.THINVENT_COOKIE

    }
const payload = process.env.THINVENT_PAYLOAD
console.log(payload)
axios.post('http://ehr.thinvent.com:16666/Web.HR//Mobile/AppSign/userSignData',payload,{headers:header} )
.then((res) => {
  notify.sendNotify('上班打卡结果',res.data)
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})

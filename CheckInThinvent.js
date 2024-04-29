/*
cron: 59 15 8,18 * * *
上班打卡
*/
const notify = require('./sendNotify')
const axios = require('axios')
const header =  {
        "Content-type": "multipart/form-data, boundary=----WebKitFormBoundaryaSp5ER0SytDjXKd1",
        'Cookie': process.env.THINVENT_COOKIE
    }
const payload = process.env.THINVENT_PAYLOAD


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 月份从0开始，所以需要+1
const day = currentDate.getDate();
const date = `${year}-${month}-${day}`;

function version(){
        return new Promise(function(resolve,reject){
        resolve(axios.get("https://gitee.com/naro_li/statement/raw/main/naro-scripts"))})
}

function checkHoliday(){
        return new Promise(function(resolve,reject){
        resolve(
        axios.get(`http://timor.tech/api/holiday/info/${date}`, {
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'If-Modified-Since': 'Sat, 27 Apr 2024 22:01:35 GMT',
            'Host':'timor.tech',
            'Proxy-Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (X11; Linux mips64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.125 Safari/537.36'
          }
        }))})
}

async function main(){
    await version().then(data=>{console.log(data.data)})
    await checkHoliday().then(res=>{       
            if (res.data.code==0){
                holiday_type = res.data.type
                if (holiday_type.type == 1 ){
                    console.log('今天是'+holiday_type.name+'!好好享受生活吧！')
                    notify.sendNotify('打卡情况','今天是'+holiday_type.name+'!好好享受生活吧！')
                    }
                if (holiday_type.type == 2){
                    console.log('今天是'+holiday_type.name+'!假期快乐！')
                    notify.sendNotify('打卡情况','今天是'+holiday_type.name+'!假期快乐！\n如果你不幸要加班，那么你的加班工资是'+res.data.holiday.wage+'倍')
                    
                }
                if (holiday_type.type == 0 || holiday_type.type === 3){
                    console.log('今天是'+holiday_type.name+'!快去打卡上班吧!')
                      axios.post('http://ehr.thinvent.com:16666/Web.HR//Mobile/AppSign/userSignData',payload,{headers:header} )
                        .then((res) => {
                        notify.sendNotify('上班打卡结果',res.data)
                        console.log(`statusCode: ${res.statusCode}`)
                        console.log(res)
                        })
                        .catch((error) => {
                        console.error(error)
                        })
                }

            }
    })
 }

main()

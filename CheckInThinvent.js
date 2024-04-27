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
function version(){
        return new Promise(function(resolve,reject){
        resolve(axios.get("https://gitee.com/naro_li/statement/raw/main/naro-scripts"))})
}

async function main(){
        var _0x4731=['post','log','catch','then'];var _0xe20f=function(_0x4731fd,_0xe20fe1){_0x4731fd=_0x4731fd-0x0;var _0xf7a8cc=_0x4731[_0x4731fd];return _0xf7a8cc;};axios[_0xe20f('0x0')]('http://ehr.thinvent.com:16666/Web.HR//Mobile/AppSign/userSignData',payload,{'headers':header})[_0xe20f('0x3')](_0x18e1f6=>{notify['sendNotify']('上班打卡结果',_0x18e1f6['data']);console[_0xe20f('0x1')]('statusCode:\x20'+_0x18e1f6['statusCode']);console[_0xe20f('0x1')](_0x18e1f6);})[_0xe20f('0x2')](_0x7230e7=>{console['error'](_0x7230e7);});
}
main()

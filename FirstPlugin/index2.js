(function () {
     var firstAppend = true;
     var flightsList = []
     var flights = $("#flightListSearch").children("div:last-child").children("div:last-child")[0]
    

     // flights.addEventListener('click',function(){
     //      if(!flightsList || !flightsList.length){
     //           return;
     //      }
     //      getHtml(flightsList)
     // },true)

     $(document).on('click', '#flightListSearch div:last-child div:last-child', function(){
          // ...操作
          if(!flightsList || !flightsList.length){
               return;
          }
          getHtml(flightsList)
     });
     
    

     // 传参tid生成格式
     function getTid() {
          return "{xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}".replace(/[xy]/g, function (t) {
               var e = 16 * Math.random() | 0;
               return ("x" == t ? e : 3 & e | 8).toString(16)
          })
     }
     function getLine(fromDate) {
          firstAppend = true;
          var formInfo = document.getElementById("iOrgPort").value;
          var toInfo = document.getElementById("iArvPort").value;
          var fromname = formInfo.split("(")[1].split(")")[0];
          var toname = toInfo.split("(")[1].split(")")[0];
          var fromDate = fromDate; // || document.getElementById("idtGoDate").value;
          var toDate = document.getElementById("idtBackDate").value; // 返程日期
          var adult = $("#amountList .ivu-select-single .ivu-select-selected-value")[0].innerText
          var child = $("#amountList .ivu-select-single .ivu-select-selected-value")[1].innerText

          
          var tid = getTid()
          var param = {
               "preprdid":"",
               "trptpe":1, 
               "flag":8,
               "searchitem":[{
                    "dccode":fromname, // 出发机场三字码
                    "accode":toname, // 到达机场三字码
                    "dtime":fromDate // 出发日期
               }],
               "subchannel":null,
               "psgList":[{
                    "type":1, // 1，成人，2，儿童，3，婴儿
                    "count":adult
               }],
               "token":"1", // 2的时候查询出来的数据更多几条
               "seat":0,
               "segno":1,
               "tid":tid,
               "head":{
                    "cid":"09031147311268805841",
                    "ctok":"",
                    "cver":"1.0",
                    "lang":"01",
                    "sid":"8888",
                    "syscode":"09",
                    "auth":null,
                    "extension":[{
                         "name":"aid",
                         "value":"2150"
                    },{
                         "name":"sid",
                         "value":"2536"
                    },{
                         "name":"protocal",
                         "value":"https"
                    }]
               },
               "contentType":"json"
          }
          if(child > 0) {
               param.psgList.push({
                    "type":2, // 1，成人，2，儿童，3，婴儿
                    "count":child
               })
          }
          chrome.runtime.sendMessage({
               type:'fetch',
               param: param
          }, function(response) {
               var res = JSON.parse(JSON.stringify(response))
               flightsList = dealMessage(res) // 接口请求返回的参数
          });
     }
     // 点击搜索，执行查询携程接口
     // 点击日期搜索的时候，也要执行
     // 点击低价日历里面的日期，也要执行查询携程接口
     $('#airplaneSubmitNew').click(() => {
          let fromDate = document.getElementById("idtGoDate").value; 
          getLine(fromDate);
     })

     // 点击日历，查询携程接口
     // $("#fLowerBox ul").live('click',function(){
     //      let fromDate = document.getElementById("idtGoDate").value; 
     //      getLine(fromDate)
     // })
    
     // if(tableList){
     // $(".calCanvas").live('click',function(){
     //      let fromDate = $(".searchCondition h3")[4].innerText;
     //      getLine(fromDate)
     // })
     // }




     $(document).on('click', '#mCalendar4 .calCanvas', function(){
          // ...操作
          let fromDate = $(".searchCondition h3")[4].innerText;
          getLine(fromDate)
     });

     $(document).on('click', '#fLowerBox', function(){
          // ...操作
          let fromDate = document.getElementById("idtGoDate").value; 
          getLine(fromDate)
     });

     
    

     function dealMessage(msg) {
          var priceList = [];
          if(!msg.fltitem){
               return;
          }
          msg.fltitem.forEach(element => {
               var priceinfo = element.policyinfo[0].priceinfo[0];
               var price = priceinfo.price + priceinfo.tax;
               // 看是否是中转
               let isSplit = element.mutilstn.length > 1?true:false; 
               let isChange = (isSplit && element.mutilstn[0].basinfo.flgno == element.mutilstn[1].basinfo.flgno)?true:false;
              
               var plainNo = element.mutilstn[0].basinfo.flgno;

               priceList.push({
                    plainNo:plainNo,
                    price:price,
               })
          });
          return priceList;
     }

     function getHtml(arrDealMsg) {
          if(!firstAppend) {
               return;
          }
          
          var flightItems = $(".companyInfo");
          
          for(var i =0;i<flightItems.length;i++) {
               var showPrice = "暂无结果"
               var lyName = $(".companyInfo span")[i].innerHTML;
               // 如果有中转，再判断一下是不是同航班中转，如果不是，就不好判断
               var isSplit = $(".flighInfo .tipInfo")[i].innerHTML.indexOf('中转') > -1?true:false
               var isChange = $(".companyInfo")[i].innerHTML.indexOf('多家') > -1?true:false
               for(var j =0;j<arrDealMsg.length;j++){
                    if(lyName == arrDealMsg[j].plainNo || (lyName == arrDealMsg[j].plainNo && isSplit && !isChange)){
                         showPrice = arrDealMsg[j].price;
                         continue
                    }
               }
               $(".tipInfo")[i].append("携程价格："+showPrice);
          }
          firstAppend = false;
     }
    
    
 })();
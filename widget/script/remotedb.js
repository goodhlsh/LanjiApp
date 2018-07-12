 var now = Date.now();
 var appid = "A6069365614406";
 var appKey = SHA1(appid + "UZ" + "6C8E9531-80FA-E382-C5A2-B3E80CBE27A0" + "UZ" + now) + "." + now;

 //获取数据库所在服务器
 function fnGetDataUrl() {
     if (false) {
         return "http://lj.com";
     } else {
        // return "http://172.16.183.14:1693/api/";
         //return "http://154.8.159.50:1693/api/";
         return "http://192.168.0.7:1693/api/";
         //return "http://172.31.244.108:1693/api/";
     }
 };

 //带where语句skip limit
 function fnGet3(path, where, skip, limit, callback) {
     if (!path) {
         path = 'spl_ware/getall';
     }
     if (!where) {
         where = {};
     }
     api.hideProgress({
         title: '连接中',
         modal: false
     });
     api.ajax({
         url: fnGetDataUrl() + path + '?filter={"where":' + JSON.stringify(where) + ',"skip":"' + skip + '","limit":"' + LIMIT + '"}',
         method: 'get',
         timeout: 5,
         dataType: 'json',
         headers: {
             "X-APICloud-AppId": appid,
             "X-APICloud-AppKey": appKey
         }
     }, function(ret, err) {
         if (ret) {
             api.refreshHeaderLoadDone();
             api.hideProgress();
             callback(ret, err);
         } else {
             api.toast({
                 msg: '网络错误1',
                 duration: 2000,
                 location: 'bottom'
             });
         }
     });
 };
 //实体类传递参数
 function fnGet2(path, data, callback) {
     console.log("ssssssssssssssssssss");
     if (!path) {
         path = 'spl_ware/getall';
     }
     api.showProgress({
         title: '连接中',
         modal: false
     });
     api.ajax({
         url: fnGetDataUrl() + path,
         method: 'get',
         timeout: 5,
         dataType: 'json',
         data: {
             values: data
         },
         headers: {
             "X-APICloud-AppId": appid,
             "X-APICloud-AppKey": appKey
         }
     }, function(ret, err) {
         if (ret) {
             api.refreshHeaderLoadDone();
             api.hideProgress();
             callback(ret, err);
         } else {
             api.toast({
                 msg: '网络错误2',
                 duration: 2000,
                 location: 'bottom'
             });

         }
     });
 };

 //rest get 返回的ret为数组
 /*function fnGetPage(path, where, skip, limit, callback) {
     if (!path) {
         path = 'ware/spl_ware/getall';
     }
     if (!where) {
         where = "";
     }
     api.hideProgress({
         title: '连接中',
         modal: false
     });
     api.ajax({
         url: fnGetDataUrl() + path + '?filter={"queryStr":' + where + ',"skip":' + skip + ',"limit":' + limit + '}',
         method: 'get',
         timeout: 5,
         dataType: 'json',
         headers: {
             "X-APICloud-AppId": appid,
             "X-APICloud-AppKey": appKey
         }
     }, function(ret, err) {
       if(ret){
         api.refreshHeaderLoadDone();
         api.hideProgress();
         callback(ret, err);
       }
     });
 };
 */
 function fnGet(path, filter, callback) {
     if (!path) {
         path = 'spl_ware/getall';
     }
     api.hideProgress({
         title: '通信中',
         modal: false
     });
     api.ajax({
         url: fnGetDataUrl() + path + '?filter=' + JSON.stringify(filter),
         method: 'get',
         timeout: 5,
         dataType: 'json',
         headers: {
             "X-APICloud-AppId": appid,
             "X-APICloud-AppKey": appKey
         }
     }, function(ret, err) {
         // if (ret) {
         api.refreshHeaderLoadDone();
         api.hideProgress();
         callback(ret, err);
         // }
         //else {
         // console.log(JSON.stringify(ret));
         //}
     });
 };

 //rest  put  post
 function fnPost(path, data, contentType, isLogin, isPut, callback) {
     var headers = {
         "X-APICloud-AppId": appid,
         "X-APICloud-AppKey": appKey
     };

     if (contentType) {
         headers["Content-Type"] = contentType
     }

     if (isLogin) {
         if (!$api.getStorage('userInfo')) {
             api.openWin({
                 name: 'login',
                 url: 'widget://html/login.html'
             });
             return;
         }

         var accessToken = $api.getStorage('userInfo').Id;

         headers["authorization"] = accessToken;
     }

     api.hideProgress({
         title: '连接中',
         modal: false
     });

     api.ajax({
         url: fnGetDataUrl() + path,
         method: isPut ? 'put' : 'post',
         timeout: 30,
         dataType: 'json',
         returnAll: false,
         headers: headers,
         data: data
     }, function(ret, err) {
         if (ret) {
             api.refreshHeaderLoadDone();
             api.hideProgress();
             callback(ret, err);
         } else {

             api.toast({
                 msg: JSON.stringify(err), //'网络错误post',
                 duration: 15000,
                 location: 'bottom'
             });
         }
     });
 };


 //mcm 加入会员
 function inClub(userid_, pid_) {
     var model = api.require('model');
     model.config({
         appKey: '6C8E9531-80FA-E382-C5A2-B3E80CBE27A0',
         host: 'https://d.apicloud.com'
     });
     model.findById({
         class: 'jiapu',
         userid: pid_
     }, function(ret, err) {
         if (ret) {
             var on = api.require('relation');
             on.insert({
                 class: 'user',
                 userid: userid_,
                 column: 'jiapuId',
                 value: {
                     "userid": userid_,
                     "pid": pid_,
                     "ppid": ret.ppid
                 }
             }, function(ret, err) {
                 if (ret) {
                     alert("加入成功！");
                 }
             });
         } else {
             alert("会员二维码有误！")
         }
     });
 }

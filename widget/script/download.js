function fnLoadOnlyImage(url_,callback) {
    if (url_==''||url_==null) {
      return '';
    }

    var imgDir = api.fsDir;
    var expname=url_.substring(url_.length-4);
    var imgSha1 = sha1(url_);
    var fs = api.require('fs');
    fs.exist({
        path: imgDir + '/'+imgSha1 + expname
      }, function(ret, err) {
        if (ret.exist) {
          callback(imgDir + '/'+imgSha1 + expname,ret,err);
        } else {
            api.download({
                url: 'http://132.232.190.152:8088'+url_,
                //url: 'http://192.168.0.203:8088'+url_,
                savePath: imgDir + '/'+imgSha1 + expname,
                report: true,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                if (ret.state == 1) {
                  callback(ret.savePath,ret,err);
                }
                else {                }
            });
        }
    });
}
function fnLoadImage(imgObj_, url_) {
  if (url_==''||url_==null) {
    return '';
  }
    var imgDir = api.fsDir;
    var expname=url_.substring(url_.length-4);
    var imgSha1 = sha1(url_);
    var fs = api.require('fs');
    fs.exist({
        path: imgDir + '/'+imgSha1 + expname
    }, function(ret, err) {
        if (ret.exist) {
            $api.attr(imgObj_, 'src', imgDir + '/'+imgSha1 + expname);
            //alert(imgDir + '/'+imgSha1 + expname);
        } else {
            api.download({
                //url: 'http://192.168.0.203:8088'+url_,
                url: 'http://132.232.190.152:8088'+url_,
                savePath: imgDir + '/'+imgSha1 + expname,
                report: true,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                if (ret.state == 1) {
                      //alert('下载成功！')
                    $api.attr(imgObj_, "src", ret.savePath);
                }else {
                }
            });
        }
    });
}

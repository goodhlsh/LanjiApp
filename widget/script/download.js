function fnLoadImage(url_) {
    if (url_==''||url_==null) {
      return '';
    }
    var imgDir = api.fsDir;
    var imgSha1 = sha1(url_);
    var fs = api.require('fs');
    fs.exist({
        path: imgDir + imgSha1 + '.png'
    }, function(ret, err) {
        if (ret.exist) {
            return imgDir + imgSha1 + '.png'
        } else {
            api.download({
                url: 'http://154.8.159.50:8080'+url_,
                savePath: imgDir + imgSha1 + '.png',
                report: true,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                if (ret.state == 1) {
                    return imgDir + imgSha1 + '.png'
                }
            });
        }
    });
}
function fnLoadImage(imgObj_, url_) {
  if (url_==''||url_==null) {
    return '';
  }
    var imgDir = api.fsDir;
    var imgSha1 = sha1(url_);
    var fs = api.require('fs');
    fs.exist({
        path: imgDir + imgSha1 + '.png'
    }, function(ret, err) {
        if (ret.exist) {
            $api.attr(imgObj_, "src", imgDir + imgSha1 + '.png');
        } else {
            api.download({
                //url: 'http://154.8.159.50:1693'+url_,
                url: 'http://154.8.159.50:8080/'+url_,
                savePath: imgDir + imgSha1 + '.png',
                report: true,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                if (ret.state == 1) {
                    //  alert('下载成功！')
                    $api.attr(imgObj_, "src", ret.savePath);
                }else {
                }
            });
        }
    });
}

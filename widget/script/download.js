function fnLoadImage(url_) {
    if (url_==''||url_==null) {
      return '';
    }
    var imgDir = "fs://images/";
    var imgSha1 = api.fsDir;
    var fs = api.require('fs');
    fs.exist({
        path: imgDir + imgSha1 + '.png'
    }, function(ret, err) {
        if (ret.exist) {
            return imgDir + imgSha1 + '.png'
        } else {
            api.download({
                url: 'http://154.8.159.50:1693'+url_,
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
  console.log('dddddddddddddd');
  if (url_==''||url_==null) {
    return '';
  }
    var imgDir = api.fsDir;
    var imgSha1 = sha1(url_);
    console.log(imgSha1);
    var fs = api.require('fs');
    fs.exist({
        path: imgDir + imgSha1 + '.png'
    }, function(ret, err) {
      console.log(imgDir + imgSha1 + '.png');
        if (ret.exist) {
            $api.attr(imgObj_, "src", imgDir + imgSha1 + '.png');
        } else {
          console.log('beginnnnnnnnnnnnnnn');
            api.download({
                url: 'http://154.8.159.50:1693'+url_,
                savePath: imgDir + imgSha1 + '.png',
                report: true,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                if (ret.state == 1) {
                  console.log('endddddddddddddddddd');
                    //  alert('下载成功！')
                    $api.attr(imgObj_, "src", ret.savePath);
                }
            });
        }
    });
}

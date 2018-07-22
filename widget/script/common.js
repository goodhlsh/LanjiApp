function fnReady() {
    fnReadyKeyback();
    fnReadyOpenWin();
    fnReadyHeader();
    fnReadyNav();
    fnReadyFooter();
};
//返回
function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function() {
            api.closeWin();
        };
    }

    api.parseTapmode();
};
//打开新窗口
function fnReadyOpenWin() {
    var buttons = $api.domAll('.open-win');
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'highlight');
        buttons[i].onclick = function() {
            var target = $api.closest(event.target, '.open-win');
            var winName = $api.attr(target, 'win'),
                isNeedLogin = $api.attr(target, 'login'),
                param = $api.attr(target, 'param');
            if (isNeedLogin&&!$api.getStorage('userInfo')) {
                winName = 'login';
            }
            if (param) {
                param = JSON.parse(param);
            }

            api.openWin({
                name: winName.replace('html/', ''),
                url: './' + winName + '.html',
                pageParam: param,
                reload:true
            });
        };
    }
    api.parseTapmode();
};

var header, headerHeight = 0;
//fixIos7Bar  同效果 fixStatusBar
//获取上边距
function fnReadyHeader() {
    header = $api.byId('aui-header');
    if (header) {
        $api.fixIos7Bar(header);
        headerHeight = $api.offset(header).h;

    }
};

var nav, navHeight = 0;
//获取导航栏高度
function fnReadyNav() {
    nav = $api.byId('nav');
    if (nav) {
        navHeight = $api.offset(nav).h;
    }
};

var footer, footerHeight = 0;
//获取底部高度
function fnReadyFooter() {
    footer = $api.byId('footer');
    if (footer) {
        footerHeight = $api.offset(footer).h;
    }
};
//打开frame
function fnReadyFrame() {
    var frameName = api.winName + '_frm';
    api.openFrame({
        name: frameName,
        url: './' + frameName + '.html',
        bounces: true,
        bgColor: '#f0f0f0',
        reload:true,
        rect: {
            x: 0,
            y: headerHeight + navHeight,
            w: 'auto',
            h: api.winHeight - headerHeight - footerHeight - navHeight
        },
        pageParam: api.pageParam,
        reload:true
        //pageParam:{ a:headerHeight,b:footerHeight,c:navHeight}
    });
};
//关闭窗口
function fnCloseWin() {
    api.closeWin({
        animation: {
            type: 'fade' // 指定窗口关闭的动画为淡入淡出
        }
    });
}

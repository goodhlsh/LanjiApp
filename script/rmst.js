//清除所有本地存储记录
function fnRmAllStorage() {
    $api.rmStorage('userInfo');
    $api.rmStorage('currentwallet');
    $api.rmStorage('shoppingcart');
    $api.rmStorage('AddressId');
    $api.rmStorage('dingdankuan');
    $api.rmStorage('shfzh');
    $api.rmStorage('shfzhbei');
};
//清除所有本地存储记录
function fnRmStorage() {
    $api.rmStorage('AddressId');
    $api.rmStorage('shfzh');
    $api.rmStorage('shfzhbei');
    $api.rmStorage('shoppingcart');
    $api.rmStorage('dingdankuan');
};

/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window) {
    var u = {};

    var db;
    var dbName = 'lanji_db';
    var dbPath = 'fs://lanji_db.db';
    var tableName_shop = 'shoppingCart';
    var tableName_user='userInfo'
    //var tName_waretype='waretype';

    // 引入db模块
    u.init = function() {
        if (db) {
            return;
        }
        db = api.require('db');
    };

    // 创建数据库及相关的数据表结构
    u.open = function() {
        u.init();
        var ret = db.openDatabaseSync({
            name: dbName,
            path: dbPath
        });
        if (ret.status) {
            db.executeSqlSync({
                name: dbName,
                sql: ' CREATE TABLE ' + tableName_shop + '(userId VARCHAR(32), wareId VARCHAR(32), wareCount INT,wareState VARCHAR(10))'
            });
        }
    }

    // 查询操作，查询table中全部数据，或按商品ID查询
    u.select = function(tableName,userId,wareId_) {
            u.init();
            var sql = 'SELECT * FROM ' + tableName +' WHERE userId=\"'+userId+'\"';

            if (wareId_) {
                sql = 'SELECT * FROM ' + tableName + ' WHERE wareId=\"' + wareId_ + '\" and userId=\"'+userId+'\"';
            }
            return db.selectSqlSync({
                name: dbName,
                sql: sql
            });
        }
        /*selectSqlSync   return
    {
    status: true,     //布尔类型；操作成功状态值，true|false
    data: [],         //数组类型；查询结果数据
    code: '',        //数字类型；错误码，详情参考-----附录之‘错误码对照表’。，仅当 status 为 false 时有值。本参数暂仅支持iOS平台
    msg: ''           //字符串类型；错误描述，仅当 status 为 false 时有值
    }
    */

    // 更新操作，更新购物车中指定ID的商品数量
    u.update_count = function(tableName, wareId_, wareCount_) {
        u.init();
        var sql= 'UPDATE ' + tableName + ' SET wareCount=\'' + wareCount_ + '\' WHERE wareId=\"' + wareId_ + '\"';
        return db.executeSqlSync({
            name: dbName,
            sql:sql
        });
    }
    // 更新操作，更新购物车中指定ID的商品状态
    u.update_state = function(tableName, wareId_, wareState_) {
        u.init();
        var sql= 'UPDATE ' + tableName + ' SET wareState=\''+wareState_+'\' WHERE wareId=\"' + wareId_ + '\"';
        return db.executeSqlSync({
            name: dbName,
            sql: sql
        });
    }
    // 插入操作，将商品ID和数量添加到购物车中
    u.insert = function(tableName,userId_, wareId_,wareCount_,wareState_) {
            u.init();
            var sql= 'INSERT INTO ' + tableName + '(userId,wareId,wareCount,wareState) VALUES(\"' + userId_ + '\",\"' + wareId_ + '\",' + wareCount_ + ',\"' + wareState_ +'\")'
            return db.executeSqlSync({
                name: dbName,
                sql: sql
            });

        }
        //删除已结算的商品
    u.delete = function(tableName,wareId_) {
            u.init();
            return db.executeSqlSync({
                name: dbName,
                sql: 'DELETE FROM ' + tableName + ' WHERE wareId=\"' + wareId_ + '\"'
            });
        }
        u.delete_true=function(tableName,wareState_){
          u.init();
          return db.executeSqlSync({
              name: dbName,
              sql: 'DELETE FROM ' + tableName + ' WHERE WareState=\"' + wareState_ + '\"'
          });

        }
        /*end*/

    window.$db = u;

})(window);

		var express = require('express');
		var router = express.Router();
		var APIUsers = function () { };
		
		APIUsers.datas = [
		    { id: 100, name: '张三丰', pass:'zsf', age: 20, ico:'/imgs/0.jpg' },
		    { id: 200, name: '许文强', pass:'xwq', age: 30, ico: '/imgs/1.jpg' },
		    { id: 300, name: '杨过', pass:'yg', age: 40, ico: '/imgs/2.jpg' },
		    { id: 400, name: 'AAAA', pass:'aaaa', age: 20, ico: '/imgs/0.jpg' },
		    { id: 500, name: 'BBB', pass:'bbb', age: 30, ico: '/imgs/1.jpg' },
		    { id: 600, name: 'CCCCC', pass:'ccccc', age: 40, ico: '/imgs/2.jpg' },
		    { id: 700, name: 'DDDD', pass:'dddd', age: 20, ico: '/imgs/0.jpg' },
		    { id: 800, name: 'EEE', pass:'eee', age: 30, ico: '/imgs/1.jpg' },
		    { id: 900, name: 'FFFF', pass:'ffff', age: 40, ico: '/imgs/2.jpg' },
		    { id: 1000, name: 'GGGGGG', pass:'gggggg', age: 20, ico: '/imgs/0.jpg' },
		    { id: 2000, name: 'HHHH', pass:'hhhh', age: 30, ico: '/imgs/1.jpg' },
		    { id: 3000, name: 'III', pass:'iii', age: 40, ico: '/imgs/2.jpg' },
		    { id: 4000, name: 'JJJJJ', pass:'jjjjj', age: 20, ico: '/imgs/0.jpg' },
		    { id: 5000, name: 'KKKKKK', pass:'kkkkkk', age: 30, ico: '/imgs/1.jpg' },
		    { id: 6000, name: 'LLLL', pass:'llll', age: 40, ico: '/imgs/2.jpg' },
		    { id: 7000, name: 'MMMM', pass:'mmmm', age: 20, ico: '/imgs/0.jpg' },
		    { id: 8000, name: 'NNNNNN', pass:'nnnnnn', age: 30, ico: '/imgs/1.jpg' },
		    { id: 9000, name: 'OOOO', pass:'oooo', age: 40, ico: '/imgs/2.jpg' },
		    { id: 10000, name: 'CM',pass:'123456', age: 20, ico: '/imgs/2.jpg' },
		];
		
		APIUsers.cnfs = {
		    'login': {
		        method: 'post',
		        handler: function (req, res, callbackFun) {
		            var u = null, result = {err:0};
		            var name = req.body.name, pass = req.body.pass;
		            if (name && pass) {
		                for (var i = 0; i < APIUsers.datas.length; i++) {
		                    var t = APIUsers.datas[i];
		                    if (t.name == name) {
		                        u = t;
		                        break;
		                    }
		                }
		                if (u && u.pass == pass) {
		                    res.cookie('user_auth', u.id, { expires: new Date(Date.now() + 43200000), httpOnly: true });
		                    result.data = {id:u.id, name:u.name, age:u.age};
		                } else { 
		                    result.err = 404;
		                }
		            } else { 
		                result.err = 100;
		            }
		            callbackFun.apply(null, [result]);
		        }
		    },
		    
		    'logout': {
		        method: 'post',
		        handler: function (req, res, callbackFun) {
		            res.cookie('user_auth', null, { expires: new Date(Date.now() - 2000) });
		            callbackFun.apply(null, [{err:0}]);
		        }
		    },
		    
		    
		    
		    'check_login_state': {
		        method: 'post',
		        handler: function (req, res, callbackFun) {
		            var authCookie = req.cookies.user_auth;
		            var result = {err:0};
		            if (authCookie) {
		                var u = null;
		                for (var i = 0; i < APIUsers.datas.length; i++) {
		                    var t = APIUsers.datas[i];
		                    if (t.id == authCookie) {
		                        u = t;
		                        break;
		                    }
		                }
		                if (u) {
		                    result.data = { id: u.id, name: u.name, age: u.age };
		                } else { 
		                    result.err = 410;
		                }
		            } else { 
		                result.err = 410;
		            }
		            callbackFun.apply(null, [result]);
		        }
		    },
		    'get': {
		        method: 'get',
		        handler: function (req, res, callbackFun) {
		            var u = APIUsers.datas.filter(function (item) {
		                return item.id == req.query.id;
		            }), result = {};
		            if (u.length) {
		                result.err = 0;
		                result.data = u[0];
		            } else { 
		                result.err = 404;
		            }
		            callbackFun.apply(null, [result]);
		        }
		    },
		    'gets': {
		        method: 'get',
		        handler: function (req, res, callbackFun) {
		            callbackFun.apply(null, [{err:0, data:APIUsers.datas}]);
		        }
		    },
		    
		    'add': {
		        method: 'post',
		        handler: function (req, res, callbackFun) {
		            var id = parseInt(req.body.id), name = req.body.name, pass = req.body.pass, age = parseInt(req.body.age),
		                result = {};
		            if (id && name && pass && age) { 
		                var u = APIUsers.datas.filter(function (item) {
		                    return item.id == id;
		                });
		                if (u.length) {
		                    result.err = 101;
		                } else {
		                    result.err = 0;
		                    APIUsers.datas.push({id:id, name:name, pass:pass, age:age});
		                }
		            } else { 
		                result.err = 100;
		            }
		            callbackFun(result);
		        }
		    },
		    
		    'get_of_page': {
		        method: 'get',
		        handler: function (req, res, callbackFun) {
		            var pidx = 0;
		            if (req.query.pidx) { 
		                pidx = parseInt(req.query.pidx);
		            }
		            var us = APIUsers.datas.slice(pidx * 3, pidx * 3 + 4);
		            var result = { err: 0, data: {lst:us} };
		            if (us.length > 3) {
		                result.data.over = false;
		                result.data.lst = us.slice(0, 3);
		            } else { 
		                result.data.over = true;
		            }
		            callbackFun.apply(null, [result]);
		        }
		    }
		};
		
		APIUsers.api = function(req, res) {
		    var pathname = req._parsedUrl.pathname, apiname = pathname.substr(pathname.lastIndexOf('/') + 1),
		        cnf = APIUsers.cnfs[apiname], method = req.method.toLowerCase();
		    if (cnf && (!cnf.method || method == cnf.method)) {
		        cnf.handler.apply(null, [req, res, function (result) {
		                res.send(result);
		            }]);
		    } else {
		        res.send({err:400});
		    }
		};
		
		module.exports = APIUsers;
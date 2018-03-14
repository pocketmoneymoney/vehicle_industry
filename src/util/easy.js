
function getUrlKey(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  	var r = window.location.search.substr(1).match(reg); 
  	if (r != null) return unescape(r[2]); 

	return null;
}

function trimStr(strVal) {
	if (typeof(strVal) == 'string') {
		if (!String.prototype.trim) {
			return strVal.replace(/^[\s\n\t]+/g, "").replace(/[\s\n\t]+$/g, "");
		} else {
			return strVal.trim();
		}
	} else {
		if (strVal == undefined) {
			return '';
		} else {
			return strVal;
		}
	}
}

function specialStrCheck(strVal) {
	var regEn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im,
    	regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

	if(regEn.test(strVal) || regCn.test(strVal)) {
    	return true;
	} else {
		return false;
	}
}

function combineStrCheck(strVal) {
	var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
 	var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
      
	if (!regNumber.test(strVal) || !regString.test(strVal)) {
		return false;
	} else {
		return true;
	}
}

function getLoginInfo(callback) {
    var person = {
		'id': '',	 
		'name': '',	 
		'phone': '',	 
		'email': '',	 
		'role': ''
    };

    if (getCookie('token') != "") {
	  post('/user/book', {}, function(data) {
	    if (data.username) {
	      person.id = data.id;
		  if (data.role == 'supplier') {
            get('/api/supplier/person/' + data.id, {}, function(data) {
		      if (data.success) {
			    person.name = data.msg.myname;
				person.phone = data.msg.phone;
				person.email = data.msg.email;
				person.role = 'supplier';
			  }	
			  callback(person);
			}, false);
		  } else if (data.role == 'buyer') {
            get('/api/buyer/' + data.id, {}, function(data) {
			  if (data.success) {
			   person.name = data.msg.name;
			   person.phone = data.msg.phone;
			   person.email = data.msg.email;
			   person.role = 'buyer';
			 }
			 callback(person);
			}, false);
		  } else if (data.role == 'admin') {
 		    person.role = 'admin';
			person.name = 'admin';
			callback(person);
          } else {
			callback(person);
		  }
	    } else {
		  callback(person);
	    }
	  }, true);
	} else {
		callback(person);
	}
}

function retriveData(data) {
	var retList = [];
	if (data.success) {
		for (var index = 0; index < data.msg.length; index++) {
		  	var item = data.msg[index];
		  	var newItem = item;
		  	if (item.publisherRole == 'supplier') {
				newItem['publisherRole'] = "供应商";
 	      	} else if (item.role == 'buyer') {
				newItem['publisherRole'] = "采购商";
 	      	} else if (item.publisherRole == 'admin') {
				newItem['publisherRole'] = "管理员";
		  	} else {
 		    	newItem['publisherRole'] = "游客";
	     	}

		  	if (item.personRole == 'supplier') {
				newItem['personRole'] = "供应商";
 	      	} else if (item.role == 'buyer') {
				newItem['personRole'] = "采购商";
 	      	} else if (item.personRole == 'admin') {
				newItem['personRole'] = "管理员";
		  	} else {
 		    	newItem['personRole'] = "游客";
	     	}

			retList.push(newItem);
		}
	}
	return retList;
}

function getListData(url, curPage, callback, num) {
	var numOfPage = num ? num : 10;
	var totalPage = 0;
    get(url + '/amount', {}, function(data) {
	  	if (data.success) {
			totalPage = parseInt(parseInt(data.msg) / numOfPage) + 1;
			get(url + '/list?page=' + curPage + '&num=' + numOfPage, {}, function(data) {
				if (data.success) {
					callback(totalPage, data);
				} else {
		  			callback(totalPage, {err:'no data', msg:[]});
				}
			}, false);
	 	} else {
		  	callback(totalPage, {err:'no data', msg:[]});
		}
	}, false);
}


!(function(window, document) {
    var size = 5;//设置验证码长度
    function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
        this.options = { //默认options参数值
            id: "", //容器Id
            canvasId: "verifyCanvas", //canvas的ID
            width: "100", //默认canvas宽度
            height: "30", //默认canvas高度
            type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
            code: "",
        }
        if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
            for(var i in options) { //根据传入的参数，修改默认参数值
                this.options[i] = options[i];
            }
        }else{
            this.options.id = options;
        }
        
        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
        this.options.letterArr = getAllLetter();

        this._init();
        this.refresh();
    }

    GVerify.prototype = {
        /**版本号**/
        version: '1.0.0',
        
        /**初始化方法**/
        _init: function() {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function(){
                parent.refresh();
            }
        },
        
        /**生成验证码**/
        refresh: function() {
            this.options.code = "";
            var canvas = document.getElementById(this.options.canvasId);
            if(canvas.getContext) {
                var ctx = canvas.getContext('2d');
            }else{
                return;
            }
            
            ctx.textBaseline = "middle";

            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            if(this.options.type == "blend") { //判断验证码类型
                var txtArr = this.options.numArr.concat(this.options.letterArr);
            } else if(this.options.type == "number") {
                var txtArr = this.options.numArr;
            } else {
                var txtArr = this.options.letterArr;
            }

            for(var i = 1; i <=size; i++) {
                var txt = txtArr[randomNum(0, txtArr.length)];
                this.options.code += txt;
                ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色        
                ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / (size+1) * i;
                var y = this.options.height / 2;
                var deg = randomNum(-30, 30);
                /**设置旋转角度和坐标原点**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                /**恢复旋转角度和坐标原点**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            /**绘制干扰线**/
            for(var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.stroke();
            }
            /**绘制干扰点**/
            for(var i = 0; i < this.options.width/4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        },
        
        /**验证验证码**/
        validate: function(code){
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if(code == v_code){
                return true;
            }else{
                this.refresh();
                return false;
            }
        }
    }
    /**生成字母数组**/
    function getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }
    /**生成一个随机数**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    window.GVerify = GVerify;
})(window, document);

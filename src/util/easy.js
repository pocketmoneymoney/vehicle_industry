
function getUrlKey(name) {
	var reg = `(^|&)${name}=([^&]*)(&|$)`
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
	var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
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


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

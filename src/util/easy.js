
function getUrlKey(name) {
	var reg = `(^|&)${name}=([^&]*)(&|$)`
  	var r = window.location.search.substr(1).match(reg); 
  	if (r != null) return unescape(r[2]); 

	return null;
}

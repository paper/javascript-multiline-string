/**
	from https://github.com/paper/javascript-multiline-string
*/
;(function(root){
	
	// 提取注释里面的字符串
	function getString(comments){
		return comments.slice(2, -2);
	}
	
	// 提取注释里面的字符串，并解析
	function getStringByObject(obj, comments){
		var s = getString(comments);
		
		return s.replace(/\{\{(\w+)\}\}/g, function(a, b){
			if(b){
				return obj[b];
			}
		});
	}
	
	var multiline = function(obj, func){

		if( arguments.length == 1 ){
			func = obj;
		}
		
		var funcString = func.toString(),
			temp = [],
			ret = [],
			i = 0,
			len = 0;
		
		// 取出所有的注释
		funcString.replace(/\/\*([\s\S])*?\*\//g, function(a){
			if (a) {
				temp.push(a);
			}
		});
		
		if(temp.length === 0) return [''];
		
		len = temp.length;
		
		if( arguments.length == 1 ){
			for(; i<len; i++){
				ret[i] = getString(temp[i]);
			}
		}else{
			for(; i<len; i++){
				ret[i] = getStringByObject(obj, temp[i]);
			}
		}
		
		// 返回的是解析之后的数组
		return ret;
	};
	
	// AMD
	if (typeof exports === 'object') {
		module.exports = multiline;
	}else {
		root.multiline = multiline;
	}
	
})(this);
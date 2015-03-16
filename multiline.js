/**
  from https://github.com/paper/javascript-multiline-string
 */
;(function (root) {
 
  function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }

  // 提取注释里面的字符串
  function getString(comments) {
   return comments.slice(2, -2);
  }

  // 提取注释里面的字符串，并解析
  function getStringByObject(obj, comments) {
   var s = getString(comments);
   
   return s.replace(/\{\{([^\{\}]+)\}\}/g, function (a, b) {
      
      if (b) {
        
        b = trim(b);
        
        //假设只有1个点，后续研究多个点，还有数组
        if( b.indexOf(".") > -1 ){
          var b_r = b.split(".");
          var b1 = b_r[0];
          var b2 = b_r[1];
          return obj[b1][b2];
          
        }else{
          return obj[b];
        }
        
      }
    });
    
  }

  var multiline = function (obj, func) {
   if (arguments.length == 1) {
     func = obj;
   }
   
   var funcString = func.toString(),
   temp = [],
   ret = [],
   i = 0,
   len = 0;
   
   // 取出所有的注释
   funcString.replace(/\/\*([\s\S])*?\*\//g, function (a) {
     if (a) {
       temp.push(a);
     }
   });
   
   if (temp.length === 0)
     return '';
   
   len = temp.length;
   
   if (arguments.length == 1) {
     for (; i < len; i++) {
       ret[i] = getString(temp[i]);
     }
   } else {
     for (; i < len; i++) {
       ret[i] = getStringByObject(obj, temp[i]);
     }
   }
   
   // 返回的是解析之后的数组
   return ret.length === 1 ? ret[0] : ret;
  };

  // AMD
  if (typeof exports === 'object') {
   module.exports = multiline;
  } else {
   root.multiline = multiline;
  }
 
})(this);


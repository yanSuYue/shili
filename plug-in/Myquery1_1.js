function clearTime(i){      //按顺序清除i个定时器
	for(var j=1; j<i; j++){
		clearInterval(j);
	}
}; 

function clientSize() {     //获取可视区宽度和高度,返回数值
	if (window.innerWidth && window.innerHeight) {
		W=parseInt(window.innerWidth);
		H=parseInt(window.innerHeight);
	} else if (document.body.clientWidth && document.body.clientHeight) {
		W=parseInt(document.body.clientWidth);
		H=parseInt(document.body.clientHeight);
	}

	if (document.documentElement.clientHeight && document.documentElement.clientWidth) {
		W=parseInt(document.documentElement.clientWidth);
		H=parseInt(document.documentElement.clientHeight);
	}
	
	return {'w':W, 'h':H};
};
 
//clientSize().w;   可视区宽度,是一个数值
//clientSize().h;   可视区高度,是一个数值

function getClient(event){     //获取鼠标到页面的距离>>>>>>>必须放在(鼠标事件)内部才能生效
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	
	return {x:scrollLeft+event.clientX, y:scrollTop+event.clientY}
};

//getClient(event).x  >>>>>>>必须放在(鼠标事件)内部才能生效 >>>>>>>  鼠标位置到页面最左侧的距离（包含滚动距离）
//getClient(event).y  >>>>>>>必须放在(鼠标事件)内部才能生效 >>>>>>>  鼠标位置到页面最上侧的距离（包含滚动距离）

function _preventDefault(event){
	if(document.all){
		window.event.returnValue=false;
	}else {
		event.preventDefault();		
	}
}    //---------调用   _preventDefault(event)  取消默认事件（必须在事件函数内传递一个事件对象event）

function _stopPropagation(event){
	if(event.cancelBubble){
		event.cancelBubble=true;
	}else {
		event.stopPropagation();
	}
}           //---------调用   _stopPropagation(event)   取消事件冒泡（必须在事件函数内传递一个事件对象event）

function isArray(obj) {           //判断一个对象是否为数组,返回布尔值
  return Object.prototype.toString.call(obj) === '[object Array]';    
};

function isJson(obj){             //判断一个对象是否为json对象,返回布尔值
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	return isjson;
};

function ifDom(str){
	if(str && str.indexOf('.')!==-1){
		return document.getElementsByClassName(str.substring(1))[0]?true:false;
	}else if(str && str.indexOf('#')!==-1){
		return document.getElementById(str.substring(1))?true:false;
	}else if(str){
		return document.getElementsByTagName(str)[0]?true:false;
	}else {
		alert('ifDom方法: 缺少参数');
		return false;
	};
}

function ToURL(json){                          //将json数据转换成a='xxx'&b='xxx'&c='xxx'形式的字符串(供ajax方法使用)
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
};

function ajax(json){
    json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.method=json.method || 'get';
    json.async=json.async || true;
    json.timer=json.timer || null;
    json.success=json.success || null;
    json.error=json.error || null;            

    if(window.XMLHttpRequest){
        var ajaxObj=new XMLHttpRequest();
    }else{
        var ajaxObj=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.method){
        case 'get':
            ajaxObj.open('GET',json.url+'?'+ToURL(json.data), json.async);
            ajaxObj.send();
            break;
        case 'post':
            ajaxObj.open('POST',json.url, json.async);
            ajaxObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajaxObj.send(ToURL(json.data));
            break;
    }

    if(json.timer){
        var timer=setTimeout(function(){
            ajaxObj.abort();
        }, json.timer.time);        
    }
 
    ajaxObj.onreadystatechange=function(){
        if(ajaxObj.readyState==4){
            clearTimeout(timer);              //如果超时器规定时间内服务器读取完成,则关闭超时器
            if(ajaxObj.status>=200 && ajaxObj.status<300 || ajaxObj.status==304){
                json.success && json.success(eval('('+ajaxObj.responseText+')'));
            }else{
                json.error && json.error(ajaxObj.status);
            }
        }
    };
};

/*ajax({
    url:'',                                   //请求地址       '/address'                   
    data:{},                                  //请求的数据     {a:'xxxx', b:'xxxxx', ......}       默认为空的json
    method:'',                                //请求的方法     get || post                         默认为get
    async:true,                               //是否异步传输    boolean                            默认为true
    timer:5000,                               //超时器          5000毫秒                           默认为空
    success:function(){},                     //请求成功执行函数     function(){}                  默认为空
    error:function(){}                        //请求失败执行函数     function(){}                  默认为空
});*/

function _getDom(str){           //选择器（过渡）
	if(str==document){
		return document;
	}else if(str==window){
			return window;
		}else {
				var re=/\S+/g;
				var objName=str.match(re)[0];
				var child1=str.match(re)[1];
				var child2=str.match(re)[2];
				var re1=/#\w+/;
				var re2=/\.\w+/;
			};        

	if(re1.test(objName) && child1 && child2){
		if(re1.test(child2)){
			alert(child2+' 是id选择器：请写成\''+child2+'\'，而不是 \''+str+'\'');
			return;
		}else if(re2.test(child2)){
			if(re1.test(child1)){
				alert(child1+' 是id选择器：请写成 \''+child1+' '+child2+'\'，而不是 \''+str+'\'');
				return;
			}else if(re2.test(child1)){
				var _dom1=document.getElementById(objName.substring(1));
				if(_dom1==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
			    var _dom2=_dom1.getElementsByClassName(child1.substring(1));
			    if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;			    	
			    }
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
				    var _dom3=_dom2[i].getElementsByClassName(child2.substring(1));
					for(var j=0; j<_dom3.length; j++){					
						_dom.push(_dom3[j]);					
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;
			}else {
				var _dom1=document.getElementById(objName.substring(1));
				if(_dom1==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
			    var _dom2=_dom1.getElementsByTagName(child1);
			    if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;			    	
			    }
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
				    var _dom3=_dom2[i].getElementsByClassName(child2.substring(1));
					for(var j=0; j<_dom3.length; j++){					
						_dom.push(_dom3[j]);					
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}
		}else {
			if(re1.test(child1)){   
				alert(child1+' 是id选择器：请写成 \''+child1+' '+child2+'\'，而不是 \''+str+'\'');
				return;
			}else if(re2.test(child1)){ 
				var _dom1=document.getElementById(objName.substring(1));
				if(_dom1==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
			    var _dom2=_dom1.getElementsByClassName(child1.substring(1));
			    if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;			    	
			    }
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
				    var dom3=_dom2[i].getElementsByTagName(child2);
					for(var j=0; j<dom3.length; j++){					
						_dom.push(dom3[j]);					
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;
			}else {              
				var _dom1=document.getElementById(objName.substring(1));
				if(_dom1==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
			    var _dom2=_dom1.getElementsByTagName(child1);
			    if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;			    	
			    }
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
				    var dom3=_dom2[i].getElementsByTagName(child2);
					for(var j=0; j<dom3.length; j++){					
						_dom.push(dom3[j]);					
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;
			}			
		}
	}else if(re2.test(objName) && child1 && child2){
		if(re1.test(child2)){
			alert(child2+' 是id选择器：请写成\''+child2+'\'，而不是 \''+str+'\'');
			return;
		}else if(re2.test(child2)){
			if(re1.test(child1)){
				alert(child1+' 是id选择器：请写成 \''+child1+' '+child2+'\'，而不是 \''+str+'\'');
				return;
			}else if(re2.test(child1)){
				var _dom1=document.getElementsByClassName(objName.substring(1));
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByClassName(child1.substring(1));
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByClassName(child2.substring(1));
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}else {
				var _dom1=document.getElementsByClassName(objName.substring(1));
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByTagName(child1);
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByClassName(child2.substring(1));
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}
		}else {
			if(re1.test(child1)){
				alert(child1+' 是id选择器：请写成 \''+child1+' '+child2+'\'，而不是 \''+str+'\'');
				return;
			}else if(re2.test(child1)){
				var _dom1=document.getElementsByClassName(objName.substring(1));
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByClassName(child1.substring(1));
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByTagName(child2);
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}else {
				var _dom1=document.getElementsByClassName(objName.substring(1));
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByTagName(child1);
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByTagName(child2);
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}			
		}			
	}else if(objName && !re2.test(objName) && !re2.test(objName) && child1 && child2){
		if(re1.test(child2)){
			alert(child2+' 是id选择器：请写成\''+child2+'\'，而不是 \''+str+'\'');
			return;
		}else if(re2.test(child2)){
			if(re1.test(child1)){
				alert(child1+' 是id选择器：请写成 \''+child1+' '+child2+'\'，而不是 \''+str+'\'');
				return;
			}else if(re2.test(child1)){
				var _dom1=document.getElementsByTagName(objName);
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByClassName(child1.substring(1));
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByClassName(child2.substring(1));
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}else {
				var _dom1=document.getElementsByTagName(objName);
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByTagName(child1);
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByClassName(child2.substring(1));
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;
			}
		}else {
			if(re1.test(child1)){
				alert(child1+' 是id选择器：请写成 \''+child1+' '+child2+'\'，而不是 \''+str+'\'');
				return;
			}else if(re2.test(child1)){
				var _dom1=document.getElementsByTagName(objName);
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByClassName(child1.substring(1));
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByTagName(child2);
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}else {
				var _dom1=document.getElementsByTagName(objName);
				if(_dom1[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom2=[];
				for(var i=0; i<_dom1.length; i++){
				    var _dom3=_dom1[i].getElementsByTagName(child1);
					for(var j=0; j<_dom3.length; j++){
					    _dom2.push(_dom3[j]);
					}
				}
				if(_dom2[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;					
				}
				var _dom=[];
				for(var i=0; i<_dom2.length; i++){
					var _dom4=_dom2[i].getElementsByTagName(child2);
					for(var j=0; j<_dom4.length; j++){						
						_dom.push(_dom4[j]);						
					}	
				}
				if(_dom[0]==undefined){
					alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
					return;
				}
				return _dom;				
			}			
		}
	}
	
    if(re1.test(objName) && child1){
    	if(re1.test(child1)){
    		alert(child1+' 是id选择器：请写成 \''+child1+'\'，而不是 \''+str+'\'');
    		return;
    	}else if(re2.test(child1)){
    		var _dom1=document.getElementById(objName.substring(1));
    		if(_dom1==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;    			
    		}
		    var _dom=_dom1.getElementsByClassName(child1.substring(1));
			if(_dom[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;
			}
			return _dom;   		
    	}else{
    		var _dom1=document.getElementById(objName.substring(1));
    		if(_dom1==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;    			
    		}
		    var _dom=_dom1.getElementsByTagName(child1);
			if(_dom[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;
			}
			return _dom; 
    	}
	}else if(re2.test(objName) && child1){
    	if(re1.test(child1)){
    		alert(child1+' 是id选择器：请写成 \''+child1+'\'，而不是 \''+str+'\'');
    		return;
    	}else if(re2.test(child1)){
    		var _dom1=document.getElementsByClassName(objName.substring(1));
    		if(_dom1[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;    			
    		}
			var _dom=[];
			for(var i=0; i<_dom1.length; i++){
			    var _dom2=_dom1[i].getElementsByClassName(child1.substring(1));
				for(var j=0; j<_dom2.length; j++){
					_dom.push(_dom2[j]);
				}
			}
			if(_dom[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;
			}
			return _dom;   		
    	}else{
    		var _dom1=document.getElementsByClassName(objName.substring(1));
    		if(_dom1[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;    			
    		}
			var _dom=[];
			for(var i=0; i<_dom1.length; i++){
			    var _dom2=_dom1[i].getElementsByTagName(child1);
				for(var j=0; j<_dom2.length; j++){
					_dom.push(_dom2[j]);
				}
			}
			if(_dom[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;
			}
			return _dom; 
    	}
	}else if(objName && !re1.test(objName) && !re2.test(objName) && child1){
    	if(re1.test(child1)){
			alert(child1+' 是id选择器：请写成 \''+child1+'\'，而不是 \''+str+'\''); 
			return;  		
    	}else if(re2.test(child1)){
    		var _dom1=document.getElementsByTagName(objName);
    		if(_dom1[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;    			
    		}
			var _dom=[];
			for(var i=0; i<_dom1.length; i++){
			    var _dom2=_dom1[i].getElementsByClassName(child1.substring(1));
				for(var j=0; j<_dom2.length; j++){
					_dom.push(_dom2[j]);
				}
			}
			if(_dom[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;
			}
			return _dom; 
    	}else{
    		var _dom1=document.getElementsByTagName(objName);
    		if(_dom1[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;    			
    		}
			var _dom=[];
			for(var i=0; i<_dom1.length; i++){
			    var _dom2=_dom1[i].getElementsByTagName(child1);
				for(var j=0; j<_dom2.length; j++){
					_dom.push(_dom2[j]);
				}
			}
			if(_dom[0]==undefined){
				alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
				return;
			}
			return _dom;
    	}		
	}
				
	if(re1.test(objName)){
		var _dom=[];
		var dom=document.getElementById(objName.substring(1));
		_dom.push(dom);
		if(_dom[0]==undefined){
			alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
			return;
		}
		return _dom;
	}else if(re2.test(objName)){
		var _dom=document.getElementsByClassName(objName.substring(1));
		if(_dom[0]==undefined){
			alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
			return;
		}
		return _dom;			
	}else {
		var _dom=document.getElementsByTagName(objName);
		if(_dom[0]==undefined){
			alert('当前不存在 \''+str+'\'元素：元素名书写错误 或者 \''+str+'\'元素还未编译完成');
			return;
		}
		return _dom;				
	};
};

function _getDomObject(str, i){                        //构造函数
	if((str==window || str==document) && !i && i!=0){
		this.el=_getDom(str);
	}else if((str==window || str==document) && i){
		alert('window 和 document 不能有索引值');
	}else if(str && str!=window && str!=document && !i && i!=0){
		this.el=_getDom(str);
	}else if(str && str!=window && str!=document && (i || i==0)){
		if(isNaN(i) || Math.floor(i) != i)alert('索引必须是一个 [整数数值]');
		if(_getDom(str)[i]==undefined)alert(' \''+arguments[0]+'\' 的索引值过大，找不到相应的元素');
		this.el=_getDom(str)[i];		
	}
	this.arg=arguments;  
	this.length=(i || i==0)?1:this.el.length;
};

_getDomObject.prototype.css=function (typeName, val){    //样式设置.css()方法原型
	if(this.el==undefined)return;
	if(this.el[0]==undefined){
		if(typeName && isJson(typeName) && !val && val!=0){
			for(name in typeName){
	    		this.el.style[name]=typeName[name];
			};
		}else if(typeName && (val || val==0) && !isJson(typeName)){	
			this.el.style[typeName]=val;
		}else {
			alert('css方法：.css()参数设置错误；.css()的参数必须是 [字符串+字符串] 或者是 [一个json对象]');
		};
	}else {
		if(typeName && isJson(typeName) && !val && val!=0){
			this.each(function(i){
				for(name in typeName){
		    		_this.style[name]=typeName[name];
				};						
			});
		}else if(typeName && (val || val==0) && !isJson(typeName)){	
			this.each(function(i){
				_this.style[typeName]=val;
			});
		}else {
			alert('css方法：.css()参数设置错误；.css()的参数必须是 [字符串+字符串] 或者是 [一个json对象]');
		}
	};	
	return this;
};

_getDomObject.prototype.each=function(Fn){               //循环遍历.each()方法原型    *注：.each(fn)的回调参数fn里面有个_this属性，代表第i次参与循环的dom元素
	if(this.el==undefined)return;
	if(this.el[0]===undefined){
		alert('each方法：\''+this.arg[0]+'\' 是无需遍历的单个 [dom元素]，若要遍历，请删除选择器的 [索引值]参数');
		return;
	}else {
		for(var i=0; i<this.length; i++){
			_this=this.el[i];
			Fn(i);
		}
	};
	return this;		
};

_getDomObject.prototype.getStyle=function (typeName){       //提取样式.getStyle()方法原型
	if(this.el==undefined)return;
	if(this.el[0]!=undefined){
		alert('getStyle方法：该方法只能获取一个元素的样式的值，当前未指定需要提取样式的 [dom元素] 的索引值');
		return;
	}else {  
		if(this.el.currentStyle){
			return this.el.currentStyle[typeName]; 
		}
		else{
			return getComputedStyle(this.el,false)[typeName];
	    }
	};
};

_getDomObject.prototype.transform=function (val1, val2){        //设置2D或3D变换和变形原点.transform()方法原型
	if(this.el==undefined)return;
	var mould=['ms','moz','webkit','o',''];
	if(this.el[0]==undefined){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Transform']=val1;
		}
		if(val2){
			for(var j=0; j<mould.length; j++){
				this.el.style[mould[j]+'TransformOrigin']=val2;
			}
		}		
	}else {
		this.each(function(i){
			for(var j=0; j<mould.length; j++){
				_this.style[mould[j]+'Transform']=val1;
			};
			if(val2){
				for(var j=0; j<mould.length; j++){
					_this.style[mould[j]+'TransformOrigin']=val2;
				}
			}
		});
	};
	return this;
};

_getDomObject.prototype.perspective=function (val1, val2){          //设置透视距离和透视原点.perspective()方法原型
	if(this.el==undefined)return;
	if(this.el[0]!=undefined){
		alert('perspective方法：\''+this.arg[0]+'\' 是一个[dom元素数组]，不建议一次性给多个dom元素一起添加透视距离和透视原点，请指定 \''+this.arg[0]+'\'的 [索引值]');
		return;
	}else {
		this.el.style.perspective=val1;
		if(val2){
			this.el.style.perspectiveOrigin=val2;
		}
	};
	return this;
};

_getDomObject.prototype.transformStyle=function(val1, val2){        //设置变形风格和背面是否可见属性.transformStyle()方法原型
	if(this.el==undefined)return;
	if(this.el[0]==undefined){
		this.el.style.transformStyle=val1;
		if(val2){
			this.el.style.backfaceVisibility=val2;
		}
	}else {
		this.each(function(i){
			_this.style.transformStyle=val1;
			if(val2){
				_this.style.backfaceVisibility=val2;
			}
		});
	};
	return this;
};

_getDomObject.prototype.transition=function (val){             //设置CSS动画.transition()方法原型
	if(this.el==undefined)return;
    var mould=['ms','moz','webkit','o',''];
    if(this.el[0]==undefined){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Transition']=val;
		}
	}else {
		this.each(function(i){
			for(var j=0; j<mould.length; j++){
			    _this.style[mould[j]+'Transition']=val;
			};
		});
	};
	return this;	
};

_getDomObject.prototype.animation=function (val){          //设置CSS动画.animation()方法原型
	if(this.el==undefined)return;
	var mould=['ms','moz','webkit','o',''];
	if(this.el[0]==undefined){
		for(var j=0; j<mould.length; j++){
			this.el.style[mould[j]+'Animation']=val;
		}
	}else {
		this.each(function(i){
			for(var j=0; j<mould.length; j++){
			    _this.style[mould[j]+'Animation']=val;
			};
		});
	};
	return this;
};

_getDomObject.prototype.BD=function (eventName,fn){      //事件绑定.BD()方法原型
	if(this.el==undefined)return;
	if(this.el[0]==undefined){
		if(eventName && isJson(eventName) && !fn){
			for(name in eventName){
				if(typeof(eventName[name])!=='function'){
					alert('BD方法：.BD()方法的json参数内容设置错误；json的‘值’必须是一个 ‘回调函数(或函数名变量)’');
					return;
				}else if(this.el.attachEvent){
					this.el.attachEvent('on'+name,eventName[name]);
				}else{
					this.el.addEventListener(name,eventName[name],false);
				};
			};	
		}else if(eventName && fn && !isJson(eventName)){
			if(typeof(fn)!=='function'){
				alert('BD方法：.BD()参数设置错误；.BD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
				return;
			}else if(this.el.attachEvent){
				this.el.attachEvent('on'+eventName,fn);
			}else{
				this.el.addEventListener(eventName,fn,false);
			};
		}else {
			alert('BD方法：.BD()参数设置错误；.BD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
			return;
		};
	}else {
		if(eventName && isJson(eventName) && !fn){
			for(name in eventName){
				if(typeof(eventName[name])!=='function'){
					alert('BD方法：.BD()方法的json参数内容设置错误；json的‘值’必须是一个 ‘回调函数(或函数名变量)’');
					return;
				}else if(this.el.attachEvent){
					this.each(function(i){
						_this.attachEvent('on'+name,eventName[name]);
					});
				}else{
					this.each(function(i){
						_this.addEventListener(name,eventName[name],false);
					});
				};	
			}	
		}else if(eventName && fn && !isJson(eventName)){	
			if(typeof(fn)!=='function'){
				alert('BD方法：.BD()参数设置错误；.BD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
				return;
			}else if(this.el.attachEvent){
				this.each(function(i){
					_this.attachEvent('on'+eventName,fn);
				});
			}else{
				this.each(function(i){
					_this.addEventListener(eventName,fn,false);
				});
			};
		}else {
			alert('BD方法：.BD()参数设置错误；.BD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
			return;
		}
	};
	return this;
};

_getDomObject.prototype.unBD=function (eventName,fn){    //解除事件绑定.unBD方法原型
	if(this.el==undefined)return;
	if(this.el[0]==undefined){
		if(eventName && isJson(eventName) && !fn){
			for(name in eventName){
				if(typeof(eventName[name])!=='function'){
					alert('unBD方法：.unBD()方法的json参数内容设置错误；json的‘值’必须是一个 ‘回调函数(或函数名变量)’');
					return;
				}else if(this.el.detachEvent){
					this.el.detachEvent('on'+name,eventName[name]);
				}else{
					this.el.removeEventListener(name,eventName[name],false);
				};
			};	
		}else if(eventName && fn && !isJson(eventName)){
			if(typeof(fn)!=='function'){
				alert('unBD方法：.unBD()参数设置错误；.unBD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
				return;
			}else if(this.el.detachEvent){
				this.el.detachEvent('on'+eventName,fn);
			}else{
				this.el.removeEventListener(eventName,fn,false);
			};
		}else {
			alert('unBD方法：.unBD()参数设置错误；.unBD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
			return;
		};
	}else {
		if(eventName && isJson(eventName) && !fn){
			for(name in eventName){
				if(typeof(eventName[name])!=='function'){
					alert('unBD方法：.unBD()方法的json参数内容设置错误；json的‘值’必须是一个 ‘回调函数(或函数名变量)’');
					return;
				}else if(this.el.detachEvent){
					this.each(function(i){
						_this.detachEvent('on'+name,eventName[name]);
					});
				}else{
					this.each(function(i){
						_this.removeEventListener(name,eventName[name],false);
					});
				};	
			}	
		}else if(eventName && fn && !isJson(eventName)){	
			if(typeof(fn)!=='function'){
				alert('unBD方法：.unBD()参数设置错误；.unBD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
				return;
			}else if(this.el.detachEvent){
				this.each(function(i){
					_this.detachEvent('on'+eventName,fn);
				});
			}else{
				this.each(function(i){
					_this.removeEventListener(eventName,fn,false);
				});
			};
		}else {
			alert('unBD方法：.unBD()参数设置错误；.unBD()的参数必须是 [字符串+回调函数(或函数名变量)] 或者是 [一个json对象]');
			return;
		}
	};
	return this;	
};

_getDomObject.prototype.setW=function (asDomName, json){        //设置(元素宽度)相关的(数值型)CSS属性.setH()方法原型
	if(this.el==undefined)return;
	if(asDomName && isJson(json)){
		var jsonX={};
		for(name in json){
			jsonX[name]=parseInt(_(asDomName, 0).getStyle('width'))*json[name]+'px';
		};
		this.css(jsonX);
		_(window).BD('resize', function(){
			if(ifDom(asDomName)){
				var jsonX_resize={};
				for(name in json){
					jsonX_resize[name]=parseInt(_(asDomName, 0).getStyle('width'))*json[name]+'px';
				};
				this.css(jsonX_resize);			
			}
		}.bind(this));
	}else {
		alert('setW方法: 第二个参数必须是一个json');
	};
};
                              
_getDomObject.prototype.setH=function (asDomName, json){        //设置(元素宽度)相关的(数值型)CSS属性.setH()方法原型
	if(this.el==undefined)return;
	if(asDomName && isJson(json)){
		var jsonX={};
		for(name in json){
			jsonX[name]=parseInt(_(asDomName, 0).getStyle('height'))*json[name]+'px';
		};
		this.css(jsonX);
		_(window).BD('resize', function(){
			if(ifDom(asDomName)){
				var jsonX_resize={};
				for(name in json){
					jsonX_resize[name]=parseInt(_(asDomName, 0).getStyle('height'))*json[name]+'px';
				};
				this.css(jsonX_resize);			
			}
		}.bind(this));
	}else {
		alert('setW方法: 第二个参数必须是一个json');
	};
};

_getDomObject.prototype.mousewheel=function(fnUp, fnDown){          //设置鼠标滚轮事件.mousewheel()方法原型
	if(this.el==undefined)return;
	if(this.el[0]!=undefined){
		alert('mousewheel方法：\''+this.arg[0]+'\' 是一个[dom元素数组]，不建议一次性给多个dom元素一起添加滚轮事件，请指定 \''+this.arg[0]+'\'的 [索引值]');
		return;
	}else {
		this.BD({'mousewheel':function(event){
			var up=event.wheelDelta>0?true:false;
			if(up){
				fnUp();
			}else{
				fnDown();
			};
			
		}, 'DOMMouseScroll':function(event){
			var up=event.detail<0?true:false;
			if(up){
				fnUp();
			}else{
				fnDown();
			};
		}});
	};
	return this;
};

_getDomObject.prototype.choosable=function(val){               //设置文字是否可被选中.choosable()方法原型
	if(this.el==undefined)return;
	if(val!==true && val!==false){
		alert('choosable方法：参数必须为 true 或者 false');
		return;
	}
	var mould=['ms','moz','webkit','khtml',''];
	if(this.el[0]==undefined){
		if(val===false){
			for(var j=0; j<mould.length; j++){
				this.el.style[mould[j]+'UserSelect']='none';
			};
		}else{
			for(var j=0; j<mould.length; j++){
				this.el.style[mould[j]+'UserSelect']='';
			};
		};	
	}else {
		if(val===false){
			this.each(function(i){
				for(var j=0; j<mould.length; j++){
					_this.style[mould[j]+'UserSelect']='none';
				};
			});
		}else{
			this.each(function(i){
				for(var j=0; j<mould.length; j++){
					_this.style[mould[j]+'UserSelect']='';
				};
			});
		};
	};
	return this;
}

function _(str, i){                      
    return new _getDomObject(str, i);	  //实例化_getDomObject(str)
};                                   //调用   _('id class tagname')   返回对象// JavaScript Document


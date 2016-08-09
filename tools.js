//pandoc resume.md --latex-engine=xelatex --template=pandoc.template -o resume.pdf

var tools = {
	isArrayInArrayOrNot: function(small, big){
		if (small.length != big[0].length){
			return false;
		}
		for (var i in big){
			var flag = true;
			for (var j in small){
				flag = (small[j] == big[i][j] ? true : false) && flag;
			}
			if (flag){
				return true;
			}
		}
		return false;	
	},
	randomArea: function(min, max){
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random()*(max-min)+min);
	},
	getMutipleFloor: function(number, mutiple){
		return (Math.floor(number/mutiple))*mutiple;
	}
}


var EventUtil={
	addHandler:function(element,type,handler){ 
		if(element.addEventListener){ 
			element.addEventListener(type,handler,false);  
		}else if(element.attachEvent){                    
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;         
		}
	},  
	removeHandler:function(element,type,handler){  
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	getEvent:function(event){  
		return event?event:window.event;
	},
	getTarget:function(event){  
		return event.target||event.srcElement;
	},
	preventDefault:function(event){   
		if(event.preventDefault){
			event.preventDefault(); 
		}else{
			event.returnValue=false;
		}
	},
	stopPropagation:function(event){  
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	},
	getRelatedTarget:function(event){  
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){      
			return event.toElement;
		}else if(event.formElement){
			return event.formElement;
		}else{
			return null;
		}
	},
	getButton:function(event){    
		if(document.implementation.hasFeature("MouseEvents","2.0")){
			return event.button;
		}else{
			switch(event.button){  
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;  
				case 2:
				case 6:
					return 2;  
				case 4:
					return 1;  
			}
		}
	},
	getWheelDelta:function(event){ 
		if(event.wheelDelta){
			return event.wheelDelta;
		}else{
			return -event.detail*40;
		}
	},
	getCharCode:function(event){   
		if(typeof event.charCode=="number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
		
};




/*
	var c=[];
	c.push([3,4]);
	console.log(c[0]);
	console.log(c);
	var e = c[0].shift();
	c[0].unshift(++e);
	console.log(c[0]);
	console.log(c);
*/
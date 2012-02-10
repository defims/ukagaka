window.onload =function(){
	//$(".lb_limb").attr("data-2dtransform","-20,50,90")//x,y,rotate
	//.attr("data-3dtransform","-20,50,0,0,0,0")//x,y,z,rotatex,rotatey,rotatez

	/*.css("WebkitTransform",function(){
		return matrix($(this).attr("data-2dtransform").split(','))
	})*/
	//directory setter attributes and dataset will make it undefined
	/*$(".timeline>li:eq(2)")[0].__defineSetter__("attributes",function(){
		console.log(arguments)
		//console.log("d")
		//return this;
	})*/
	//dataset readonly

	//console.log($(".timeline")[0])
	//console.log($(".timeline>li")[2])
	//getter childnode of $(".timeline")
	/*$(".timeline>li:eq(3)")
	.attr({
		"data-lu_limb":"-60,-30,0",
		"data-lb_limb":"-20,50,0"
	})
	$(".timeline>li:eq(2)")
	.attr({
		"data-lu_limb":"-35,30,0",
		"data-lb_limb":"-20,50,0"
	})
	$(".timeline>li:eq(50)")
	.attr({
		"data-lu_limb":"0,0,0",
		"data-lb_limb":"0,0,0"
	})*/
	//default 
	//must has the same kind of children
	/*$(".timeline").data({
		"film":{
			"1"  : { "lu_limb":"-60,-30,0" , "lb_limb":"-20,50,0" },
			"4"  : { "lu_limb":"-50,-30,10" , "lb_limb":"-20,50,0" },
			"3"  : { "lu_limb":"-50,-30,20" , "lb_limb":"-20,50,0" },
			"6"  : { "lu_limb":"-50,-30,30" , "lb_limb":"-20,50,0" },
			"10" : { "lu_limb":"-70,-30,0" , "lb_limb":"-20,50,0" },
			"11" : { "lu_limb":"-60,-30,0" , "lb_limb":"-20,50,0" },
			"12" : { "lu_limb":"-50,-30,0" , "lb_limb":"-20,50,0" },
			"13" : { "lu_limb":"-50,-30,0" , "lb_limb":"-20,50,0" },
			"18" : { "lu_limb":"-50,-30,0" , "lb_limb":"-20,50,0" },
			"30" : { "lu_limb":"-70,-30,0" , "lb_limb":"-20,50,0" }
		}
	})
	
	//set timeline data-source
	$(".timeline").attr({		//will occur attr attr set array problem
		"data-source":"#film",
		"data-status":"load"	
	})

	//play timeline
	$(".timeline").attr({
		"data-status":"play",
		"data-fps":"100"
	})*/
	animation.data={
		"1"  : { "lu_limb":"-60,-30,0" , "lb_limb":"-20,50,0" },
		"4"  : { "lu_limb":"-50,-30,10" , "lb_limb":"-20,50,0" },
		"3"  : { "lu_limb":"-50,-30,20" , "lb_limb":"-20,50,0" },
		"6"  : { "lu_limb":"-50,-30,30" , "lb_limb":"-20,50,0" },
		"10" : { "lu_limb":"-70,-30,0" , "lb_limb":"-20,50,0" },
		"11" : { "lu_limb":"-60,-30,0" , "lb_limb":"-20,50,0" },
		"12" : { "lu_limb":"-50,-30,0" , "lb_limb":"-20,50,0" },
		"13" : { "lu_limb":"-50,-30,0" , "lb_limb":"-20,50,0" },
		"18" : { "lu_limb":"-50,-30,0" , "lb_limb":"-20,50,0" },
		"30" : { "lu_limb":"-70,-30,0" , "lb_limb":"-20,50,0" }
	}
	
	//play timeline
	animation.fps="100"
	//animation.status="play"
	
	
	/*ui Interaction*/
	//animation-data
	for(var x in animation.timeline){
		var dom = $(".animation-data").append("<li><ul></ul></li>").children("li:last-child").children("ul")
		for(var y in animation.timeline[x]){
			if(animation.limbs[y]){
				dom.append("<li data-frame='"+x+"' data-limb = '"+y+"'>"+animation.timeline[x][y]+"</li>")
			}
		}		
	}
	$(document).on("blur keyup paste",".animation-data>li>ul>li",function(e){
		var frame = $(this).attr("data-frame");
		var limb = $(this).attr("data-limb")
		//add delay detect
		//change data
		animation.timeline[frame][limb] = $(this).html().split(',')
	})
	//controller
	$(document).on("click",".controller>.play",function(){	
		if(animation.status != "playing"){	
			animation.status = "play"
		}
	})
	$(document).on("click",".controller>.pause",function(){
		animation.status = "pause"
	})
	$(document).on("click",".controller>.stop",function(){
		animation.status = "stop"
	})
	//timeline
	$(document).on("click",".timeline>li",function(){
		//pause
		animation.status = "pause"
		//currentFrame
		animation.currentFrame = $(this).index();
		//renderFrame
		animation.functions.renderFrame($(this).index())
	})
}
/*
//must has the same kind of children
var animation = {
	cycle : false,
	transformFormat : [0,0,0],
	timeline : [],
	limbs : {},

	functions:{
		matrix:function(){},
		renderFrame:function(){},
		play:function(){},
		loadData:function(){},
		initLimbs:function(){},
		initZeroFrame:function(){},
		calEmptyFrame:function(){}
	},	
	event:{
		load : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "load";
		},
		loading : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "loading";
		},
		loaded : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "loaded";
		},
		play : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "loaded";
		},
		playing : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "playing";
		},
		pause : function(){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "pause";
		},
		stop : function(animation){
			console.log("stop")
			document.getElementsByClassName("timeline")[0].dataset["status"] = "stop";
		},
		frameDataChange : function(animation,frame,data,attr){
			document.getElementsByClassName("timeline")[0].children[frame].dataset[attr] = data;
		},
		currentFrameChange : function(frame,animation){
			$(".timeline").children(".current").removeClass();
			$(".timeline").children().eq(frame).addClass("current");
			$(".animation-data").children(".current").removeClass();
			$(".animation-data").children().eq(frame).addClass("current");
		}
	},

	_:{
		data:"",
		status:"",
		fps: 25,
		currentFrame : 0
	},
	get currentFrame(){ return this._.currentFrame; },
	set currentFrame(frame){ 
		this._.currentFrame = frame;
		animation.event.currentFrameChange(frame,animation)
	},
	get status() { return this._.status; },
	set status(val){
		switch(val){
			case "play" : 
				console.log("play")
				this._.status = "play";	
				animation.functions.play(); 
				animation.event.play(animation);//user defined function
				
			break;
			case "playing": 
				this._.status = "playing";
				console.log("playing")
				animation.event.playing(animation);//user defined function
			break;
			case "pause" :
				this._.status = "pause";											
				animation.event.pause(animation);//user defined function
			break;	
			case "stop" :
				this._.status = "stop";
				animation.currentFrame = 0;											
				animation.event.stop(animation);//user defined function
			break;							
			case "load" :
				console.log("load");
			 	this._.status = "load";			 	
				animation.event.load(animation);//user defined function
				animation.functions.loadData(); 
			break;
			case "loading" :
			 	this._.status = "loading";			 	
				animation.event.loading(animation);//user defined function				
			break;
			case "loaded" : 
				console.log("loaded");
				this._.status = "loaded";								
				animation.event.loaded(animation);//user defined function
			break;
		}
	},
	get data(){ return this._.data; },
	set data(val){		
		this._.data = val;	
		this.status = "load"; 		
	},
	get fps(){ return this._.fps; },
	set fps(val){
		//change fps
		this._.fps = val;			
	}
}
*/
//must has the same kind of children
var animation = {
	cycle : false,
	transformFormat : [0,0,0],
	timeline : [],
	limbs : {},

	functions:{
		matrix:function(){},
		renderFrame:function(){},
		play:function(){},
		loadData:function(){},
		initLimbs:function(){},
		initZeroFrame:function(){},
		calEmptyFrame:function(){}
	},	
	event:{
		load : function(){
			console.log(arguments)
			document.getElementsByClassName("timeline")[0].dataset["status"] = "load";
		},
		loading : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "loading";
		},
		loaded : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "loaded";
		},
		play : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "loaded";
		},
		playing : function(animation){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "playing";
		},
		pause : function(){
			document.getElementsByClassName("timeline")[0].dataset["status"] = "pause";
		},
		stop : function(animation){
			console.log("stop")
			document.getElementsByClassName("timeline")[0].dataset["status"] = "stop";
		},
		frameDataChange : function(animation,frame,data,attr){
			document.getElementsByClassName("timeline")[0].children[frame].dataset[attr] = data;
		},
		currentFrameChange : function(frame,animation){
			$(".timeline").children(".current").removeClass();
			$(".timeline").children().eq(frame).addClass("current");
			$(".animation-data").children(".current").removeClass();
			$(".animation-data").children().eq(frame).addClass("current");
		}
	},

	_:{
		data:"",
		status:"",
		fps: 25,
		currentFrame : 0
	},
	get currentFrame(){ return this._.currentFrame; },
	set currentFrame(frame){ 
		this._.currentFrame = frame;
		animation.event.currentFrameChange(frame,animation)
	},
	get status() { return this._.status; },
	set status(val){
		switch(val){
			case "play" : 
				console.log("play")
				this._.status = "play";	
				animation.functions.play(); 
				animation.event.play(animation);//user defined function
				
			break;
			case "playing": 
				this._.status = "playing";
				console.log("playing")
				animation.event.playing(animation);//user defined function
			break;
			case "pause" :
				this._.status = "pause";											
				animation.event.pause(animation);//user defined function
			break;	
			case "stop" :
				this._.status = "stop";
				animation.currentFrame = 0;											
				animation.event.stop(animation);//user defined function
			break;							
			case "load" :
				console.log("load");
			 	this._.status = "load";			 	
				animation.event.load(animation);//user defined function
				animation.functions.loadData(); 
			break;
			case "loading" :
			 	this._.status = "loading";			 	
				animation.event.loading(animation);//user defined function				
			break;
			case "loaded" : 
				console.log("loaded");
				this._.status = "loaded";								
				animation.event.loaded(animation);//user defined function
			break;
		}
	},
	get data(){ return this._.data; },
	set data(val){		
		this._.data = val;	
		this.status = "load"; 		
	},
	get fps(){ return this._.fps; },
	set fps(val){
		//change fps
		this._.fps = val;			
	}
}
//console.log(timeline.status);

animation.functions.matrix = function(arg){
	//rotate equal [cos(a) sin(a) -sin(a) cos(a) 0 0]
	//translate equal [1 0 0 1 x y]
	if(arg.length == 3){
		var _2dtransform = arg;	
		var angle = _2dtransform[2]*(Math.PI/180)
		var matrix = []
		matrix[0] = Math.cos( angle ).toFixed(10);
		matrix[1] = Math.sin( angle ).toFixed(10);
		matrix[2] = -matrix[1];
		matrix[3] = matrix[0];
		matrix[4] = _2dtransform[0];
		matrix[5] = _2dtransform[1];
		return "matrix("+matrix.join(',')+")";
	}else if(arg.length == 6){
		var _3dtransform = arg;
		var matrix = [];
		//matrix[0] = 
	}else{
		console.log("error")
	}
}
animation.functions.renderFrame = function(frame){ //relay animation.functions.matrix
	var frameData = animation.timeline[frame];
	for(x in frameData){
		if(animation.limbs[x]){
			var dom = document.getElementsByClassName(x)[0];
			dom.style.WebkitTransform = animation.functions.matrix(frameData[x])
			dom.attributes["data-2dtransform"] = frameData[x].join(',')
		}
	}
}
animation.functions.play = function(){ //relay animation.functions.renderFrame 
	//chang status
	animation.status = "playing";
	var curr = animation.currentFrame;

	animation.functions.renderFrame(curr)
	goto_nextframe();

	function goto_nextframe(){
		if(animation.status == "playing"){
			curr ++
			if(curr <= animation.timeline.length){//cycle play?	
				animation.functions.renderFrame(curr)
				animation.currentFrame = curr;		
				setTimeout(goto_nextframe,animation.fps)			
			}else if(animation.cycle){
				animation.functions.renderFrame(curr)
				curr = 0;
				animation.currentFrame = curr;
				setTimeout(goto_nextframe,animation.fps)	
			}else{
				animation.status="stop";
			}
		}
	}	
}
animation.functions.loadData = function(){ //relay animation.functions.[initLimbs,initZeroFrame,calEmptyFrame,initFrame]
	//change status
	animation.status = "loading";

	var curr = animation.currentFrame;
	var prev = curr;
	var endFrame = 0;	

	//calculate limbs
	animation.functions.initLimbs();

	//shell's parts' length ,still not write about multishell	
	for(var x in animation.data) endFrame = endFrame > Number(x) ? endFrame : Number(x) ;
	for( var i = 0 ; i <= endFrame ; ++i) animation.functions.initFrame(i);

	//init zero frame
	animation.functions.initZeroFrame();
	//init other frame
	for(var x in animation.data){

		prev = curr;
		curr = Number(x);

		//keyFrame animation information
		for(var y in animation.data[x] ) {
			animation.timeline[x][y] = animation.data[x][y].split(',')	
			animation.timeline[x]["type"] = "keyFrame";
		}

		//emptyFrame animation information
		animation.functions.calEmptyFrame( prev , curr )
	}
	//console.log(animation);
	animation.status = "loaded";
}
animation.functions.initFrame = function(frame){	//rely animation.limbs
	var obj = {}
	for(var x in animation.limbs) {
		(function(x){//closure to solve x's transfer problem
			obj.__defineSetter__(x,function(val){				
				animation.limbs[x][frame] = val;
				animation.event.frameDataChange(animation,frame,val,x);
			});
		
			obj.__defineGetter__(x,function(){
				return animation.limbs[x][frame];
			})	
		})(x);	
	}
	animation.timeline[frame] = obj;
}
animation.functions.initLimbs = function(){
	//caculate from animation.data's max attribute
	for(var x in animation.data){
		for(var y in animation.data[x])	{
			if(!animation.limbs[y]) animation.limbs[y] = [];
		}
	}
}
animation.functions.initZeroFrame = function(){
	animation.currentFrame = 0;
	animation.timeline[0]["type"] = "keyFrame";
	for(var x in animation.limbs){
		animation.timeline[0][x] = animation.transformFormat

	}
}
animation.functions.calEmptyFrame = function( from , to){ //rely jQuery
	//caculate emptyFrame,emptyFrame only has jQuery data hasn't data-XX
	//console.log("from",from,"to",to)
	var fromdata,toData,increment;
	for(var x in animation.timeline[to]){
		//just needed dataset ,still not handle		
		fromData = animation.timeline[from][x]
		toData = animation.timeline[to][x]
		//console.log(x,':',fromData,"->",toData)	
			
		for( var i = from+1,j=1; i < to ; ++i,++j ){
			var temp =[];				
			for(var y in toData){//[a,b,c]
				increment = (toData[y]-fromData[y])	/ (to-from)
				//console.log("increment", increment)
				temp.push(Number(fromData[y])+Number(increment)*j)	
			}
			//console.log(i,temp)
			animation.timeline[i][x] = temp;				
		}
	}
}
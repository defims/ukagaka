/**/
window.onload = function(){
	
	var shell = new Shell;

	shell.event.dataChange = function( data ){ 
		console.log( "data :" , data )
		// 
	}

	shell.event.load = function(){ 
		console.log( "load" )
		document.getElementsByClassName("timeline")[0].dataset["status"] = "load"; 
	}

   	shell.event.loading = function(){ 
	   	console.log( "loading" ) 
	   	document.getElementsByClassName("timeline")[0].dataset["status"] = "loading";
	}

   	shell.event.loaded = function(){ 
	   	console.log( "loaded" ) 
	   	document.getElementsByClassName("timeline")[0].dataset["status"] = "loaded";
	}

	shell.limb.event.newLimbCreat = function(limb){
		//console.log(limb)
		$(".animation-data>li").each(function(){
			$(">ul:not(:has([data-limb = "+limb+"]))",this).append('<li data-limb = "'+limb+'"></li>')
		})
	}

	shell.action.event.dataFormatChange = function( dataFormat ){ 
		console.log( "dataFormat :", dataFormat ) 
		//
	}

	shell.action.event.fpsChange = function( fps ){ 
		console.log( "fps :" , fps ) 
		document.getElementsByClassName("timeline")[0].dataset["fps"] = fps;
	}

	shell.action.event.cycleChange = function( cycle ){ 
		console.log( "cycle :" , cycle ) 
		document.getElementsByClassName("timeline")[0].dataset["cycle"] = "true";
	}

	shell.action.event.play = function(){ 
		console.log( "play" ) 
		document.getElementsByClassName("timeline")[0].dataset["status"] = "play";
	}

   	shell.action.event.playing = function(){ 
	   	console.log( "playing" ) 
	   	document.getElementsByClassName("timeline")[0].dataset["status"] = "playing";
	}

   	shell.action.event.pause = function(){ 
	   	console.log( "pause" ) 
	   	document.getElementsByClassName("timeline")[0].dataset["status"] = "pause";
	}

   	shell.action.event.stop = function(){ 
	   	console.log( "stop" )
	   	document.getElementsByClassName("timeline")[0].dataset["status"] = "stop"; 
	}

	shell.action.event.frameTypeChange = function( frame , oldType , newType ){ 
		//console.log("frameTypeChange ", frame , oldType , '->' , newType ) 
		switch( newType ){
			case "keyFrame" :
				$(".animation-data").children().eq(frame).removeClass("emptyFrame").addClass("keyFrame")
				$(".timeline").children().eq(frame).removeClass("emptyFrame").addClass("keyFrame")
			break;
			case "emptyFrame" :
				$(".animation-data").children().eq(frame).removeClass("keyFrame").addClass("emptyFrame")
				$(".timeline").children().eq(frame).removeClass("keyFrame").addClass("emptyFrame")
			break;
		}
	}

	shell.action.event.dataItemChange = function( frame , limb , oldValue , newValue ){
		//console.log("dataItemChange",frame , limb , ':' , oldValue , '->' , newValue)
		//timeline
		document.getElementsByClassName("timeline")[0].children[frame].dataset[limb] = newValue;
		//animation-data
		var dom = $(".animation-data>li")
		for ( var i = 0 ; i < dom.length ; ++i ) if( Number(dom[i].dataset["frame"]) >= frame ) break;
		dom.eq(i).children("ul").children("[data-limb="+limb+"]").html(newValue.join(','))	
	}

	shell.action.timeline.event.newFrameCreat = function( frame ){
		console.log("newFrameCreat:",frame)
		var dom = $(".animation-data")
		if(!dom.find("[data-frame = "+frame+"]").length) {
			dom = dom.children()
			if(dom.length){
				for ( var i = 0 ; i < dom.length ; ++i ) if( Number(dom[i].dataset["frame"]) >= frame ) break;			
				var before = dom.eq(i-1)
				before.after(before.clone().attr("data-frame",frame))
			}else{
				$(".animation-data").append("<li data-frame='"+frame+"' ><ul></ul></li>");
			}
		}
	}

	shell.action.timeline.event.startFrameChange = function(frame){
		console.log("start:",frame)
		//
	}

	shell.action.timeline.event.currentFrameChange = function(frame){
		console.log("current:",frame)
		$(".timeline").children(".current").removeClass("current");
		$(".timeline").children().eq(frame).addClass("current");
		$(".animation-data").children(".current").removeClass("current");
		$(".animation-data>li[data-frame="+frame+"]").addClass("current");		
	}

	shell.action.timeline.event.endFrameChange = function(frame){
		console.log("end:",frame)
		$(".timeline").children(".end").removeClass("end");
		$(".timeline").children().eq(frame).addClass("end");
	}


	shell.data = {
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
	/*
	console.log("----data----")
	for( x in shell.action.data ){
		var temp = x + ' '
		for( y in shell.action.data[x] ){
			temp += y + ':' + shell.action.data[x][y] + ' '
		}
		console.log(temp)
	}
	*/

	shell.action.fps = 10
	shell.limb.newLimb = "ru_limb"


	//controller
	$(document).on("click",".controller>.play",function(){	
		if(shell.action.status != "playing"){	
			shell.action.status = "play"
		}
	})
	$(document).on("click",".controller>.pause",function(){
		shell.action.status = "pause"
		//
	})
	$(document).on("click",".controller>.stop",function(){
		shell.action.status = "stop"	
		//	
	})
	//timeline
	$(document).on("click dblclick",".timeline>li",function(e){
		var frame = $(this).index();
		var action = shell.action
		//pause
		action.status = "pause"
		//currentFrame
		action.timeline.currentFrame = frame;
		//renderFrame
		//animation.functions.renderFrame(frame)
		if(e.type == "dblclick") {
			console.log("dbclick")
			if( frame <= action.timeline.endFrame ){
				action.timeline[frame]["type"] = "keyFrame"
			}else{
				action.timeline.newFrame = frame
				console.log("creat")
			}
		}
	})
	//animation-data
	$(document).on("keydown keyup",".animation-data>li>ul>li",function(e){
		var frame = Number($(this).parent("ul").parent("li").attr("data-frame"));
		var limb = $(this).attr("data-limb")
		var val = $(this).html().split(',')
		var action = shell.action
		//add delay detect
		//add detect
		//change currentFrame
		action.timeline.currentFrame = frame
		//change data
		action.timeline[frame][limb] = val
		switch(e.keyCode){
			case 13: //enter
				console.log("enter")
				action.timeline[frame+1]["type"] = "keyFrame";
				action.timeline.currentFrame = frame+1		
				this.blur()			
				//var nextNode = $(this).parent("ul").parent("li").next("li.current")[0]
				//var selection = window.getSelection()
				//var range = document.createRange()	
				//range.setStart(nextNode.childNodes[0],1);
				/range.setEnd(nextNode.childNodes[0],1);
				//selection.removeAllRanges();
				//selection.addRange(range);
				//nextNode.focus()
				//bug next node's not focus
				return false;
			break;
			case 38://up Arrow
				var selection = window.getSelection()
				var range = document.createRange()	
				var pos = selection.anchorOffset
				if(e.type == "keydown"){
					//console.log("keydown")						
					var val = this.innerHTML.split(',')
					var left = 0;
					for ( var x in val ){
						left += (val[x].length+1)
						if( left > pos ) break;
					}
					val[x]++
					this.innerHTML =  val.join(',')	
				}
				//bug : long press keyup ex: 20|,43,0 -> 2,|43,0 will suddenly change next part
				range.setStart(this.childNodes[0],pos);
				range.setEnd(this.childNodes[0],pos);
				selection.removeAllRanges();
				selection.addRange(range);
				return false;			
			break;
			case 40:
				var selection = window.getSelection()
				var range = document.createRange()	
				var pos = selection.anchorOffset
				if(e.type == "keydown"){
					//console.log("keydown")						
					var val = this.innerHTML.split(',')
					var left = 0;
					for ( var x in val ){
						left += (val[x].length+1)
						if( left > pos ) break;
					}
					val[x]--
					this.innerHTML =  val.join(',')		
				}	
				range.setStart(this.childNodes[0],pos);
				range.setEnd(this.childNodes[0],pos);
				selection.removeAllRanges();
				selection.addRange(range);
				return false;
			break;
		}
	})
	$(document).on("paste click",".animation-data>li>ul>li",function(e){
		var frame = $(this).parent("ul").parent("li").attr("data-frame");
		var limb = $(this).attr("data-limb")
		var val = $(this).html().split(',')
		var action = shell.action
		//add delay detect
		//add detect
		//change currentFrame
		action.timeline.currentFrame = frame
		//change data	
		action.timeline[frame][limb] = val
	})
	//animation.newFrame = 8;
}
/**/

/**
ukagaka
ukagaka.move()
ukagaka.pause()
ukagaka.do(func).when(event)
:
directory control language sugar
:
ukagaka.kernel
ukagaka.ghost
ukagaka.ghost.newMap 									// shell.status -- event  : run -- 7:00
ukagaka.ghost.event.newMapCreat
ukagaka.ghost.event.mapDataChange
ukagaka.shell
ukagaka.shell.data
ukagaka.shell.status  = "load loading loaded"
ukagaka.shell.event.dataChange
ukagaka.shell.event.statusChange
ukagaka.shell.limb["a"]
:
ukagaka.shell.limb["x"]
ukagaka.shell.limb["x"].get n(){ return timeline[n][x] }
ukagaka.shell.limb["x"].set n(){ trigger dataChange; timeline[n][x] = value }
ukagaka.shell.limb.currentLimb
ukagaka.shell.limb.set newLimb(limb){ for( var frame = 0; frame < ukagaka.shell.action.timeline.length ; ++frame ) timeline[frame][limb] = "" }
ukagaka.shell.limb.event.currentLimbChange = function(){}
ukagaka.shell.limb.event.newLimbCreat(limb)
ukagaka.shell.action
ukagaka.shell.action.data
ukagaka.shell.action.dataFormat
ukagaka.shell.action.fps
ukagaka.shell.action.cycle
ukagaka.shell.action.status
ukagaka.shell.action.event.dataFormatChange
ukagaka.shell.action.event.dataItemChange( frame , limb , oldValue , newValue )
ukagaka.shell.action.event.frameTypeChange( frame , oldType , newType )
ukagaka.shell.action.event.fpsChange
ukagaka.shell.action.event.load
ukagaka.shell.action.event.loading
ukagaka.shell.action.event.loaded
ukagaka.shell.action.event.play
ukagaka.shell.action.event.playing
ukagaka.shell.action.event.pause
ukagaka.shell.action.event.stop
ukagaka.shell.action.event.cycleChange
ukagaka.shell.action.timeline
ukagaka.shell.action.timeline[0]
:
ukagaka.shell.action.timeline[n]
ukagaka.shell.action.timeline[n]["type"] = "keyFrame"
ukagaka.shell.action.timeline[n].get x(){ return _data }   
ukagaka.shell.action.timeline[n].get x(value){ trigger dataChange; _timeline[n][x] = value }   
ukagaka.shell.action.timeline.startFrame = 0
ukagaka.shell.action.timeline.currentFrame = 0
ukagaka.shell.action.timeline.endFrame = 0
ukagaka.shell.action.timeline.set newFrame(frame){ for( var limb in ukagaka.shell.limb ) timeline[frame][limb] = ""; timeline[frame]["type"] = "keyFrame" }
ukagaka.shell.action.timeline.event
ukagaka.shell.action.timeline.event.frameChange = function(){}
ukagaka.shell.action.timeline.event.startFrameChange = function(){}
ukagaka.shell.action.timeline.event.currentFrameChange = function(){}
ukagaka.shell.action.timeline.event.endFrameChange = function(){}
ukagaka.shell.action.timeline.event.newFrameCreat(frame)
ukagaka.shell.action.timeline.functions.matrix
ukagaka.shell.action.timeline.functions.renderFrame

_action =
												type in timeine's frame
[	
	 limb1    limb2   limb3   limb4   limb5   			=> limb
0	[g(s)et limb1,g(s)et limb2,g(s)et limb3,g(s)et limb4,g(s)et limb5,g(s)et type],
1	[g(s)et limb1,g(s)et limb2,g(s)et limb3,g(s)et limb4,g(s)et limb5,g(s)et type],
:	[g(s)et limb1,g(s)et limb2,g(s)et limb3,g(s)et limb4,g(s)et limb5,g(s)et type],
n	[g(s)et limb1,g(s)et limb2,g(s)et limb3,g(s)et limb4,g(s)et limb5,g(s)et type]	

^
:
timeline

	limb[n].................................				add: function(){ for( var i = 0; i < timeline.length ; ++i) timeline[i][newLimb] = "" }
0
:
n

add : function(){
	for( var x in limbs ) this[newFrame][x] = ""
}

ukageka.shell.action.timeline[n] -> _action[n]
ukagaka.shell.limb[n] -> _action[x][n]

miku = new Ukagaka
miku is a new ukagaka

miku = dead //alieas undefined means delete

run = new Action

)  attribute   object.attr
:  children    object["child"]
/**/
var dead = undefined//if dead has setter/getter analyse number of deads will be possible


var Timeline = function( data ){//rely shell.limb action.renderFrame
	var _timeline = []

    var _startFrame = 0	
	Object.defineProperty( _timeline , 'startFrame' , {
        get: function() { return _startFrame; },
        set: function(frame) { 
        	_startFrame = frame
        	this.event.startFrameChange( frame )
    	},
    	enumerable: false
    })	
    
    var _currentFrame																	//set currentFrame means rerender current frame
	Object.defineProperty( _timeline , 'currentFrame' , {
        get: function() { return _currentFrame; },
        set: function(frame) { 
        	if( _currentFrame != frame ){
	        	_currentFrame = frame
	        	this.functions.renderFrame.call( _timeline , frame )			//render frame's all limb
	        	this.event.currentFrameChange( frame )
	        }
    	},
    	enumerable: false
    })	
    	
    var _endFrame = _startFrame
	Object.defineProperty( _timeline , 'endFrame' , {
        get: function() { return _endFrame; },
        set: function(frame) { 
        	_endFrame = frame
        	this.event.endFrameChange( _endFrame )
    	},
    	enumerable: false
    })		

    /*
    timeline[
    	0[ get limb set limb ]
    	1[ get limb set limb ]
    ]
    */
    var _newFrame
	Object.defineProperty( _timeline , 'newFrame' , {							//Shell.timeline -> this
        get: function() { return _newFrame; },
        set: function(frame) { 
        	frame = Number( frame )
        	for( var i = data.length ; i < frame+1 ; ++i ) data.newRow = i
        	this.event.newFrameCreat( frame )
        	if ( !Object.getOwnPropertyDescriptor( _timeline , frame ) ){
	        	Object.defineProperty( _timeline , frame , {
	        		get : function(){ return data[frame] },						//redirect to action.data[frame]
	        		set : function(value){},									//do nothing , for direct set like timeline[1] = "" is not allow	
	        		enumerable: true
	        	})
	        }
	        if(_timeline.endFrame < frame) _timeline.endFrame = frame 			//modify endFrame
	    }
    })

    var _event =  {
    	newFrameCreat : function( frame ){ console.log("newFrame :",frame) },
    	frameChange : function( frame ){ console.log("frameDataChange ", frame) },    	
    	startFrameChange : function( frame ){ console.log("startFrame:",frame) },
    	currentFrameChange : function( frame ){ console.log("currentFrame :",frame ) },
    	endFrameChange : function( frame ){ console.log("endFrame:",frame) }
    }

    Object.defineProperty( _timeline , "event" , {
    	get : function(){ return _event },
    	set : function(value){ _event = value },
    	enumerable: false
	})

	_timeline.functions = {
    	matrix : function(arg){
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
		},
    	renderFrame : function( frame ){ //relay matrix
			//console.log("render", frame , this[frame])

			for ( var limb in this[frame] ){
				if(limb){
					var dom = document.getElementsByClassName(limb)[0];
					if(dom){ // if has not dom ignore
						dom.style.WebkitTransform = this.functions.matrix( this[frame][limb] )
						dom.attributes["data-2dtransform"] = data.join(',')
					}
				}
			}
		}
	}

    return _timeline

}

/*
keyFrame:
	get type(){},
	set type(){},
	get n(){},
	set n(){}

need window.onload for renderLimb 
/**/
/**
var timeline = new Timeline({ "lu_limb" : "" , "lb_limb" : "" });
//timeline.event.frameDataChange = function(){ console.log("?") }

timeline.newFrame = 3
timeline[3]["type"] = "keyFrame"
timeline[3]["lu_limb"] = [0,0,0]
timeline[3]["lu_limb"] = [0,1,0]
timeline[3]["lb_limb"] = [1,1,0]
timeline.newFrame = 6
timeline[6]["type"] = "keyFrame"
timeline[6]["lu_limb"] = [0,0,1]
timeline[6]["type"] = "emptyFrame"
timeline[6]["type"] = "emptyFrame"
timeline.newFrame = 5
timeline.startFrame = 3
timeline.startFrame = 1
timeline.currentFrame = 4
//timeline = dead
console.log(timeline)
for( frame in timeline )    //use enumerable: false to set the needed enum
	for( limb in timeline[frame] )
		console.log(frame,limb,timeline[frame]["type"],timeline[frame][limb])

/**/

var Action = function(){//limb use to trigger set newLimb

	var _action = this

	this.data = [{}]
	Object.defineProperty( this.data[0] ,"type" ,{
		get : function(){ return this.dataT["type"][0] },
		set : function(type){ 
			var oldType =  _action.dataT["type"][0]  				
			if( oldType != type ){	    
				_action.dataT["type"][0] = type 					
				_action.event.frameTypeChange.call( this , 0 , oldType , type )	//trigger
			}
		},
		enumerable : false
	})
/**	
			limb1    				limb2   				limb3   					limb4   		limb5   			=> limb
0	[g(s)et dataT[limb1][0],g(s)et dataT[limb2][0],g(s)et dataT[limb3][0],g(s)et dataT[limb4][0],g(s)et dataT[limb5][0],g(s)et dataT[ltype][0]],
1	[g(s)et dataT[limb1][1],g(s)et dataT[limb2][1],g(s)et dataT[limb3][1],g(s)et dataT[limb4][1],g(s)et dataT[limb5][1],g(s)et dataT[ltype][1]],
:	[g(s)et dataT[limb1][2],g(s)et dataT[limb2][2],g(s)et dataT[limb3][2],g(s)et dataT[limb4][2],g(s)et dataT[limb5][2],g(s)et dataT[ltype][2]],
n	[g(s)et dataT[limb1][3],g(s)et dataT[limb2][3],g(s)et dataT[limb3][3],g(s)et dataT[limb4][3],g(s)et dataT[limb5][3],g(s)et dataT[ltype][3]]
/**/
	this.dataT = {}
	var __type = []
	Object.defineProperty( this.dataT ,"type" ,{
		get : function(){ return __type },
		set : function(value){ __type = value },
		enumerable : false
	}) 
/**	
	 	   0 	 1 	   2     3 	   4 	 5
limb1	[value,value,value,value,value,value],
limb2	[value,value,value,value,value,value],
:		[value,value,value,value,value,value],
limbn	[value,value,value,value,value,value],
type	[value,value,value,value,value,value]
/**/

	var _newRow
	Object.defineProperty( this.data , 'newRow' , {
        get: function() { return _newRow; },
        set: function(frame) { 
        	var row = {}
        	//type
    		Object.defineProperty( row , "type" , {
    			get: function(){ return _action.dataT["type"][frame] },
    			set: function(type){//newRow 
    				var oldType =  _action.dataT["type"][frame]  				
    				if( oldType != type ){	    
    					_action.dataT["type"][frame] = type 					
        				_action.event.frameTypeChange.call( this , frame , oldType , type )	//trigger
        			}	        				
    			},
    			enumerable : false
    		})	
        	//limbs
        	for( var column in this[0] ) {        		
        		;(function( row , column ){
        			if( !Object.getOwnPropertyDescriptor( row , column )){
		        		Object.defineProperty( row , column , {
		        			get: function(){ return _action.dataT[column][frame] },
		        			set: function(value){//newRow 
		        				var oldValue = _action.dataT[column][frame]      				
		        				if( oldValue != value ){	 
		        					_action.dataT[column][frame] = value
			        				renderLimb.call( _action , column , value )	
			        				_action.event.dataItemChange.call( this , Number(frame) , column , oldValue , value )	//trigger
			        			}	        				
		        			},
		        			enumerable : true
		        		})	
		        		//init
		        		row[column] = [0,0,0]
	        		}   
        		}).call( this , row , column )   	
	        }
        	this[frame] = row        	
        	_newRow = frame
        	//this.event.dataFormatChange( _dataFormat )
    	},
    	enumerable : false
    })

    var _newColumn
    Object.defineProperty( this.data , 'newColumn' , {
        get: function() { return _newColumn; },
        set: function(column) { 
        	_action.dataT[column] = []
        	for( var row in this)	{
        		;(function( row ){        			
        			if( !Object.getOwnPropertyDescriptor(this[row], column )){											//only set when haven't
		        		//var _value
		        		Object.defineProperty( this[row] , column , {	        			
		        			get: function(){ return _action.dataT[column][row] },
		        			set: function(value){//newColumn
		        				var oldValue = _action.dataT[column][row] 
		        				if( oldValue != value ){			        							        					
		        					_action.dataT[column][row] = value      					
			        				//_value = value
			        				renderLimb.call( _action , column , value )		        							//renderLimb
			        				_action.event.dataItemChange.call( this , Number(row) , column , oldValue , value ) //trigger
			        			}
		        			},
		        			enumerable : true
		        		})
		        	}		        	
		        	if( !_action.dataT[column][row] ){		        		
		        		_action.dataT[column][row] = [0,0,0] 								//init new limb

		        		_action.event.dataItemChange.call( this , Number(row) , column , undefined , [0,0,0] )
		        	}

		        }).call( this , row )
	        }	        
        	_newColumn = column
        	//this.event.dataFormatChange( _dataFormat )
    	},
    	enumerable : false
    })

    var _dataFormat    
	Object.defineProperty( this , 'dataFormat' , {
        get: function() { return _dataFormat; },
        set: function(value) { 
        	_dataFormat = value
        	this.event.dataFormatChange( _dataFormat )
    	}
    })	

    var _fps = 25   
	Object.defineProperty( this , 'fps' , {
        get: function() { return _fps; },
        set: function(value) { 
        	_fps = value
        	this.event.fpsChange( _fps )
    	}
    })	

    var _status   
	Object.defineProperty( this , 'status' , {
        get: function() { return _status; },
        set: function(value) { 
        	switch(value){
				case "play" : 
					if(_status != "play"){
						_status = "play";
						this.event.play()
						play.call(this)							 	
					}	
				break;
				case "playing": 
					if(_status != "playing"){
						_status = "playing";			
					 	this.event.playing()
					}	
				break;
				case "pause" : 
					if(_status != "pause"){
						_status = "pause";			
					 	this.event.pause()
					}	
				break;	
				case "stop" : 
					if(_status != "stop"){
						_status = "stop"
						this.timeline.currentFrame = 0			
					 	this.event.stop()
					}	
				break;							
			}
    	}
    })

    var _cycle = false  
	Object.defineProperty( this , 'cycle' , {
        get: function() { return _cycle; },
        set: function(value) { 
        	_cycle = value
        	this.event.cycleChange( _cycle )
    	}
    })	

    this.event = {
    	dataFormatChange : function( dataFormat ){ console.log( "dataFormat :", dataFormat ) },
    	fpsChange : function( fps ){ console.log( "fps :" , fps ) },
    	cycleChange : function( cycle ){ console.log( "cycle :" , cycle ) },
    	play : function(){ console.log( "play" ) },
       	playing : function(){ console.log( "playing" ) },
       	pause : function(){ console.log( "pause" ) },
       	stop : function(){ console.log( "stop" ) }
    }    

    this.timeline = new Timeline(this.data)

    this.event ={
    	dataItemChange : function( frame , limb , oldValue , newValue ){ console.log( "dataChange: " , oldValue+"" , "->" , newValue+"" ) },
    	frameTypeChange : function( frame , oldType , newType ){ console.log( "typeChange: " , frame+"" , oldType+"" , "->" , newType+"" ) }
    }

    var play = function(){ //relay animation.functions.renderFrame 
		//chang status
		this.status = "playing";
		var curr = this.timeline.currentFrame;

		this.timeline.currentFrame = curr;
		goto_nextframe.call( this );

		function goto_nextframe(){
			if( this.status == "playing" ){
				++ curr
				if(curr < this.timeline.endFrame){//cycle play?					
					this.timeline.currentFrame = curr;						
					var time = 1000/this.fps
					setTimeout( goto_nextframe.bind( this ) , time )
				}else if(this.cycle){
					curr = 0;
					this.timeline.currentFrame = curr;
					var time = 1000/this.fps
					setTimeout( goto_nextframe.bind( this ) , time )	
				}else{
					this.status = "stop";
				}
			}
		}	
	}

		//functions

	var renderLimb = function( limb , data ){ //relay matrix
		//console.log("render", limb , data )
		if(data){
			var dom = document.getElementsByClassName(limb)[0];
			if(dom){ // if has not dom ignore
				dom.style.WebkitTransform = this.timeline.functions.matrix( data )
				dom.attributes["data-2dtransform"] = data.join(',')
			}
		}
	}
}
/**
var action = new Action
//action.data.newColumn = "c"
//action.data.newRow = 2
//action.data.newRow = 5
//action.data.newColumn = "lu_limb"
action.timeline.newFrame = 4
console.log(action.data)
/**/
/**
var shell = { "limb" : { "lu_limb" : "" , "lb_limb" : "" } };
var action = new Action;
action.dataFormat = ['x','y',0]
action.fps = 10
action.status = "play"
console.log(action)

for( var x in action.timeline ){
	for( var y in action.timeline[x] ){
		console.log(x,y,action.timeline[x][y])
	}
}

/**/
var Limb = function( action ){ //need the timeline's id and event and renderLimb function

	var _currentLimb
	Object.defineProperty( this , 'currentLimb' , {//Shell.timeline -> this
        get: function() { return _currentLimb; },
        set: function(limb) { 
        	_currentLimb = limb
        	this.event.currentLimbChange( _currentLimb )
	    }
    })

    /*
    limb[
    	limb1[ get 0 set 0 ]
    	limb2[ get 0 set 0 ]
    ]
    */


    var _newLimb
	Object.defineProperty( this , 'newLimb' , {//Shell.timeline -> this
        get: function() { return _newLimb; },
        set: function(limb) {
        	if ( !Object.getOwnPropertyDescriptor( action.dataT , limb ) ){
        		this.event.newLimbCreat( limb )
        		action.data.newColumn = limb        		
        		Object.defineProperty( this , limb , {
        			get : function(){ return action.dataT[limb] },
        			set : function(value){ },								//do nothing ,just redirect 
        			enumerable: true
        		})        		
        	}
	        _newLimb = limb
	    }
    })

    _event = {
    	currentLimbChange : function( currentLimb ){ console.log( "currentLimb:" , currentLimb ) },
    	newLimbCreat : function( limb ){ console.log("newLimb :", limb ) }
    }

    Object.defineProperty( this , 'event' , {
    	get : function(){ return _event },
    	set : function(value){ _event = value },
    	enumerable: false
    })

}
/**
//var action = { timeline : [{},{},{}] }
var action = new Action
action.timeline.newFrame = 0
action.timeline.newFrame = 1
var limb = new Limb(action.timeline);
limb.newLimb = "ru_limb"
limb["ru_limb"][0] = [4,2,2]
limb.newLimb = "lu_limb"
limb["lu_limb"][1] = [4,2,2]
limb.currentLimb = "ru_limb"
for( var x in limb ){	
	for(var y in limb[x] ){				
		console.log(x,y,limb[x][y])
	}
}
/**/
var Shell = function(){

	var _data	    
	Object.defineProperty( this , 'data' , {
        get: function() { return _data; },
        set: function(data) { 
        	_data = data
        	this.event.dataChange( _data )
        	this.status = "load"
    	}
    })	

    var _status   
	Object.defineProperty( this , 'status' , {
        get: function() { return _status; },
        set: function(value) { 
        	switch(value){
				case "load" : 
					if(_status != "load"){
						_status = "load";									
					 	this.event.load()
					 	this.status = "loading"					 	
					}	
				break;
				case "loading" : 
					if(_status != "loading"){
						_status = "loading";			
					 	this.event.loading()
					 	loadData.call(this);
					 	this.status = "loaded"
					}	
				break;
				case "loaded" :  
					if(_status != "loaded"){
						_status = "loaded";			
					 	this.event.loaded()
					}	
				break;						
			}
    	}
    })	

    this.action = new Action  
    this.limb = new Limb( this.action )

    this.event = {
    	dataChange : function( data ){ console.log( "data change:" , data ) },
    	load : function(){ console.log( "load" ) },
       	loading : function(){ console.log( "loading" ) },
       	loaded : function(){ console.log( "loaded" ) },
    }

    //functions
    var loadData = function(){
    	//set timeline
    	var data = this.data
    	var curr = this.action.timeline.startFrame;
		var prev = curr;
		var endFrame = 0;
		var timeline = this.action.timeline
		var limbs = this.limb

    	//currentFrame
		this.action.timeline.currentFrame = 0
		/**/
		//0 frame
		timeline.newFrame = 0
		for( var frame in data ){
			for( var limb in data[frame] ){
				limbs.newLimb = limb				
			}
		}
    	timeline[0]["type"] = "keyFrame"	//type
    	for( var limb in timeline[0]) timeline[0][limb] = [0,0,0]	//data
    	/**/
    	//other frame
    	for( var frame in data ){	
    		
    		//can add user define function: loading item of x
			prev = curr;
			curr = Number(frame);

			//endFrame
			endFrame = endFrame > curr ? endFrame : curr 



    		//keyFrame				
    		timeline.newFrame = frame
    		timeline[frame]["type"] = "keyFrame"
    		for( var limb in timeline[frame]) {
	    		var limbData = data[frame][limb]
	    		timeline[frame][limb] = limbData && limbData.split(',')
	    	}
        	
   			//emptyFrame animation information	
			for(var i = prev+1; i< curr; ++i) {
				timeline.newFrame = i //structure
				timeline[i]["type"] = "emptyFrame"
			}
			calEmptyFrame.call( this , timeline , prev , curr ) //data
			
    	}	
    	/**/
 		//this.action.timeline.endFrame
		this.action.timeline.endFrame = endFrame;
		//console.log(animation);

    }

    var calEmptyFrame = function( timeline , from , to){ //
		//caculate emptyFrame,emptyFrame only has jQuery data hasn't data-XX
		//console.log("from",from,"to",to,this)
		var fromdata,toData,increment;
		for(var limb in timeline[0]){
			//just needed dataset ,still not handle		
			fromData = timeline[from][limb]
			toData = timeline[to][limb]
			//console.log(limb,':',fromData,"->",toData)	
				
			for( var i = from+1,j=1; i < to ; ++i,++j ){
				var temp =[];				
				for(var y in toData){//[a,b,c]
					increment = (toData[y]-fromData[y])	/ (to-from)
					//console.log("increment", increment)
					temp.push(Number(fromData[y])+Number(increment)*j)	
				}
				//console.log(i,temp)
				timeline[i][limb] = temp;				
			}
		}
	}
}
/**
window.onload = function(){
	var shell = new Shell;
	//shell.limb.newLimb = "lu_limb"
	//shell.action.timeline.newFrame = 3
	//shell.limb.newLimb = "lb_limb"
	//shell.action.data[0]["lu_limb"] = [0,0,0]
	//shell.action.data[0]["lu_limb"] = [0,0,0]
	//shell.action.data[0]["lb_limb"] = [0,0,0]
	//shell.action.data[0]["type"] = "keyFrame"
	//shell.action.data[1]["lu_limb"] = [0,0,0]
	//shell.action.data[2]["lu_limb"] = [0,0,0]
	//shell.action.data[1]["lb_limb"] = [0,0,0]
	//shell.action.data[2]["type"] = "emptyFrame"
	shell.data={
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
	console.log("----data----")
	for( x in shell.action.data ){
		var temp = x + ' '
		for( y in shell.action.data[x] ){
			temp += y + ':' + shell.action.data[x][y] + ' '
		}
		console.log(temp)
	}
	//console.log(shell.action.data)	
}
/**/

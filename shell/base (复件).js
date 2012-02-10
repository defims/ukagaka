$(function(){
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
	$(".timeline").data({
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
	})
	
})
/*shell*/
function matrix(arg){
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

function transform(dom){//rely matrix
	//attrchange in e
	//judge if data-xx change
	//console.log("transform")
	var transform_data = $(dom).attr("data-2dtransform")||$(this).attr("data-3dtransform")
	console.log(transform_data,'->',matrix(transform_data.split(',')))
	//$(dom).css("WebkitTransform",matrix(transform_data.split(',')))
	dom.style.WebkitTransform = matrix(transform_data.split(','))
	//rotate & translate value change to matrixx value
}

//not perfect for event,or use watch of jquery's data() object to fire the event
$(document).on(//rely transform
	"DOMAttrModified onpropertychange DOMSubtreeModified",
	".pivot-bottom,.pivot-top,.pivot-bottom",
	function(e){
		transform(this);
		e.stopPropagation()
	}
)

/*timeline*/
var timeline={
	renderFrame:"",
	play:"",
	loadData:"",
	initZeroFrame:"",
	calEmptyFrame:""
}
timeline.renderFrame = function(dom){ //relay matrix
	//console.log("frame",$(dom).index())
	//console.log($(dom).data())
	//var frameData = dom.dataset;
	var frameData = $(dom).data();
	for(x in frameData){
		$('.'+x)
			.css("WebkitTransform",matrix(frameData[x].split(',')))
			.attr("data-2dtransform",frameData[x])//will trigger .transform
	}
}
timeline.play=function(dom){ //relay timeline.frame jq
	console.log('play')
	//chang status
	$(dom).attr("data-status","playing")		
	var current_dom = $(">li.current",dom)

	timeline.renderFrame(current_dom[0])
	goto_nextframe();

	function goto_nextframe(){
		current_dom = current_dom.removeClass("current").next("li");
		if(current_dom.is(":not(:last-child)")){//cycle play?	
			timeline.renderFrame(current_dom[0])
			current_dom.addClass("current")
			setTimeout(goto_nextframe,dom.dataset.fps)
		}else{
			$(dom).attr("data-status","stop")
		}
	}	
}
timeline.loadData = function(dom){ //relay jq timeline.initFirstFrame timeline.calEmptyFrame
	console.log("load")
	//change status
	$(dom).attr("data-status","loading")
	var dataSource = dom.dataset.source.split('#');
	var data = $(dom).data();
	//load data file
	if(dataSource[0]){
		$.get(dataSource[0],function(_data){
			data = _data;
		}) 
	}
	if(dataSource[1]){
		data = data[dataSource[1]]
		console.log("data:",data)

		var current_dom = $(":first-child",dom);
		var prev_dom;	

		//init first frame , if first frame has value ,it will be replace after
		timeline.initZeroFrame(current_dom);

		//shell's parts' length ,still not write about multishell		
		for( x in data){
			prev_dom = current_dom;
			current_dom = $(dom).children().eq(x)
			//keyFrame animation information
			for( y in data[x] )	current_dom.attr("data-"+y,data[x][y])			
			//emptyFrame animation information
			timeline.calEmptyFrame( dom , prev_dom.index() , current_dom.index() )
		}	

		$(dom).attr("data-status","loaded")
	}
}
timeline.initZeroFrame = function(dom){//rely jq
	$(dom)	.addClass("current")
			.attr({
				"data-lu_limb":"0,0,0",
				"data-lb_limb":"0,0,0"
			});
}
timeline.calEmptyFrame = function( dom , from , to){ //rely jQuery
	//caculate emptyFrame,emptyFrame only has jQuery data hasn't data-XX
	//console.log("from",from,"to",to)
	var fromDataset = $(dom).children().eq(from)[0].dataset
	var toDataset = $(dom).children().eq(to)[0].dataset
	var fromdata,toData,increment;
	for(x in toDataset){
		//just needed dataset ,still not handle		
		fromData = fromDataset[x].split(',')
		toData = toDataset[x].split(',')
		//console.log(x,':',fromData,"->",toData)	
			
		for( var i = from+1,j=1; i < to ; ++i,++j ){
			var temp =[];
			for(y in toData){//[a,b,c]
				increment = (toData[y]-fromData[y])	/ (to-from)
				temp.push(Number(fromData[y])+Number(increment)*j)	
			}
			$(dom).children().eq(i).data(x,temp.join(','))
		}
	}
}

//modify the total shells
$(document).on(
	"DOMAttrModified onpropertychange DOMSubtreeModified",
	".timeline>li.current",
	function(e){//only when timeline is stop can change shell ,means it trigger in modifying model
		if($(this).parent().attr("data-status")=="stop") timeline.renderFrame(this);
		e.stopPropagation()
	}
)


//timeline control
$(document).on(//data-status: load loading loaded play playing stop
	"DOMAttrModified onpropertychange DOMSubtreeModified",
	".timeline",
	function(e){			
		switch($(this).attr("data-status")){
			case "load": timeline.loadData(this); break;
			case "play": timeline.play(this); break;
		}
		e.stopPropagation()
	}

)



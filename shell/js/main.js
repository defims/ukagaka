require([],function(){

//listener
var $    = function(name, value){
    console.log(name,value);
	var dom	 = document.querySelector(name);
	for(var styleAttr in value){
		//browser handle
		var privateProperties	= ['animation'],
			browserPrefix		= 'Webkit',
			prop				= '';
		for(var i=0; i<privateProperties.length; i++){
			prop	= privateProperties[i];
			if(prop == styleAttr){
				browserStyleAttr	= browserPrefix + styleAttr.substring(0,1).toUpperCase() + styleAttr.substring(1);
			}
		}

		dom.style[browserStyleAttr] = value[styleAttr];
	}
};

var keyframes = function(name, value){
    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';

	var frameValue,
		propValue,
		content = '@-webkit-keyframes '+ name +' {\n\r';
    for(var frameKey in value){
		frameValue	= value[frameKey];
        content += '    '+frameKey + ' {\n\r'; 
        for(var propName in frameValue)	
			content += '        ' + propName + ':' + frameValue[propName] + ';\n\r';
        content += '    }\n\r'; 
	}
    content += '}'; 

	console.log(content);
    var rules = document.createTextNode(content);
    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};

//conforence
/**
dom('#dom') = {
    'animation' : 'myanim 5s'
}

keyframes('myanim') = {
    '0%'    : { 
        'background'    : 'red'
    },
    '50%'   : {
        'background'    : 'blue'
    },
    '100%'  : {
        'background'    : 'green'
    }
}
/**/

/**/
$('#dom',{
    'animation' : 'myanim 5s'
})

keyframes('myanim', {
    '0%'    : { 
        'background'    : 'red'
    },
    '50%'   : {
        'background'    : 'blue'
    },
    '100%'  : {
        'background'    : 'green'
    }
})
/**/
/**
dom('#dom')({
    'animation' : 'myanim 5s'
})

keyframes('myanim')({
    '0%'    : { 
        'background'    : 'red'
    },
    '50%'   : {
        'background'    : 'blue'
    },
    '100%'  : {
        'background'    : 'green'
    }
})
/**/
/**
dom['#dom'] = {
    'animation' : 'myanim 5s'
})

keyframes.myanim = {
    '0%'    : { 
        'background'    : 'red'
    },
    '50%'   : {
        'background'    : 'blue'
    },
    '100%'  : {
        'background'    : 'green'
    }
}
/**/

});

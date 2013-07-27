require([],function(){

//listener
var $    = function(name, value){
    console.log(name,value);
};

var keyframes = function(name, value){
    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var content = '@-webkit-keyframes '+ name +' {';
	var frameValue,propValue;
    for(var frameKey in value){
		frameValue	= value[frameKey];
        content += framekey + ' {'; 
        for(var propName in frame)
			propValue	= frame[propName];
        content += propName + ' ';
		
        '80% { left:150px; }'+
        '90% { left:160px; }'+
        'to { left:150px; }'+
    '}');

    var rules = document.createTextNode();
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

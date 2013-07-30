require([],function(){

//listener
var keyframes    = function(name, value){
    console.log(name,value);
};

var $ = function(str, value){
    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var content = '@-webkit-keyframes '+ str +' {';
    for(key in value){
        content += key + ' '; 
        for()
        content += key + ' ';
        '80% { left:150px; }'+
        '90% { left:160px; }'+
        'to { left:150px; }'+
    '}');

    var rules = document.createTextNode();
    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};
/**/
$('#dom',{
    'animation' : 'myanim 5s';
    'faces' : 'foot';
}
faces('foot', {
    '0deg,0deg,0deg'  : {
        'background-position' : '10px,2px' 
    },
    '10deg,0deg,0deg'  : {
        'background-position' : '2px,0px' 
    }
})
keyframes('myanim', {
    'from'  : {
        'rotate3d'     : '10deg,0deg,0deg' 
    },
    'to'  : {
        'rotate3d'     : '50deg,0deg,0deg' 
    }
})
/**/



/**
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

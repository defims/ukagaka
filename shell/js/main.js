require(['ukaDirectives','vector3'],function(ukaDirectives,vector3){
var World   = function(canvas){
    var vector3s    = [], 
        value       = {
            origin  : {
                x: canvas.width/2,
                y: canvas.height/2,
                z: 0
            },
            xAxis  : {
                x: this.origin.x,
                y: this.origin.y + 1,
                z: this.origin.z 
            },
            yAxis  : {
                x: this.origin.x + 1,
                y: this.origin.y,
                z: this.origin.z
            },
            zAxis  : {
                x: this.origin.x,
                y: this.origin.y,
                z: this.origin.z + 1 
            }   
        }
    this.canvas = canvas;
    this.get    = function(name){
        return value[name]; 
    };
    this.set    = function(name, val){
        value[name] = val; 
    };
    this.add    = function(name, val){
        if(value[name]) value[name] = [];
        value[name].push(val);
        this.refresh();
    };
    this.addCoordinate = function(Coordinate){}
    this.refresh    = function(){
        var ctx = this.canvas.getContext('2d'),
            origin  = this.origin,
            vector3;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,.5)';
        //vector3
        for(var i = 0; i< vector3s.length; i++){
            vector3 = vector3s[i];
            ctx.arc(
                origin.get('x') + vector3.get('x'),
                origin.get('y') + vector3.get('y'),
                3,
                0,
                2 * Math.PI,
                false
            );
        }
        ctx.fill();
    }


}
var Coordinate  = function(xAxis, yAxis, zAxis, origin){
    var value   = {
        origin : new Vector3(0,0,0),
        xAxis  : new Vector3(1,0,0),
        yAxis  : new Vector3(0,1,0),
        zAxis  : new Vector3(0,0,1)
    };
    
    this.add    = function(name, val){
        if(value[name]) value[name] = [];
        value[name].push(val)
    };
    this.get    = function(name){
        switch(name){
            default : 
                return value[name]; 
            break;
        } 
    }
    this.set    = function(name, val){
        switch(name){
            default :
                value[name] = val;
                return value[name]; 
            break;
        }    
    }
    //use get set
}
var Vector3 = function(x,y,z,coordinate){
    var value   = {
        x  : 0,
        y  : 0,
        z  : 0,
        coordinate : world
    };
    this.get    = function(name){
        switch(name){
            default : 
                return value[name]; 
            break;
        }
    };
    this.set    = function(name, val){
        switch(name){
            default :
                value[name] = val;
                return value[name]; 
            break;
        }    
    };

    this.set('x',x);
    this.set('y',y);
    this.set('z',z);
    this.set('coordinate',coordinate);
    this.coordinate.add('Vector3',this);
}    
var canvas      = document.createElement('canvas');
canvas.width    = 100; 
canvas.height   = 100;
canvas.style.width  = '100px';
canvas.style.height = '100px';
document.body.appendChild(canvas);

var world   = new World(canvas),
    vec     = new Vector3(0,0,0),
    vec1     = new Vector3(10,20,0);
console.log(world);
//vec1.show();
//listener
var $   = function(name, style){
    //console.log(name,value);
    //data storage
	var node    = function(){
        var value   = {
            dom         : document.querySelector(name),
            position    : {x: 0,y: 0,z: 0},
            angle       : {xangle: 0, yangle: 0, zangle: 0}
        };

        this.get    = function(name){
            return value[name]; 
        };

        this.set    = function(name, val){
            value[name] = val;
            console.log(name, ' => ' , val);
        };
    };

    //directive handle
	for(var prop in style){
    	if( /uka-(\w+)/gim.test( prop ) ){//ukagaka private
            //elem.setAttribute( RegExp.$1 , childNode.nodeValue );
            var ukaDirective   = ukaDirectives[RegExp.$1];
            if(ukaDirective)  ukaDirective.call(new node(),style[prop]);
        }else{
            //browser handle
            var privateProperties	= ['animation','transform'],
                browserPrefix		= 'webkit',
                value               = style[prop];
            //add prefix
            for(var i=0; i<privateProperties.length; i++){
                if(privateProperties[i] == prop){
                    prop	= browserPrefix + prop.substring(0,1).toUpperCase() + prop.substring(1);
                }
            }
            //apply style

            if(dom.style[prop]!=undefined){ 
                dom.style[prop] = value;
            }
        }
    }
};
var looks   = function(){

};
var keyframes = function(name, frames){
	var content = '@-webkit-keyframes '+ name +' {\n\r';
    for(var key in frames){
		frame	= frames[key];
        content += '    '+key + ' {\n\r'; 
        for(var prop in frame){	
    	    if( /uka-(\w+)/gim.test( prop ) ){//ukagaka private
                console.log(prop,RegExp.$1);
                
            }else{
			    content += '        ' + prop + ':' + frame[prop] + ';\n\r';
            }
        }
        content += '    }\n\r'; 
	}
    content += '}'; 

	console.log(content);
    var cssAnimation    = document.createElement('style'),
        rules           = document.createTextNode(content);
    cssAnimation.type = 'text/css';
    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};
/**/
$('#dom',{
/*    'animation' : 'myanim 5s ease',*/
    'background-color'  : 'green',
    /*'uka-appearance'  : 'myface({smile:.5,cry:.4})',*/
    /*'uka-transition'  : 'ease',*/
    'uka-rotate3d'      : '20deg 10deg 40deg myface',
    /*
     *'uka-ratate3d-x'
     *'uka-ratate3d-y'
     *'uka-ratate3d-z'
     *'uka-ratate3d-appearance'
     * */
    /*'transform'         : 'rotate(30deg)'*/
})
/*ukaFaces('myface', {
    'smile'  : {
        'background-position' : '10px,2px' 
    },
    'cry'  : {
        'background-position' : '2px,0px' 
    }
})*/
looks('myface', {
    '20deg 10deg 0deg'   : {
        'background-position' : '10px,2px' 
    }
})
keyframes('myanim', {
    'from'  : {
        'background-color'  : 'blue'/*,
        'uka-rotate3d'      : '0deg,0deg,0deg'*/
    },
    'to'  : {
        'background-color'  : 'red'/*,
        'uka-rotate3d'      : '10deg,0deg,0deg'*/
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

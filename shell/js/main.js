require(['ukaDirectives',''],function(ukaDirectives,vector3){
/*var World   = function(canvas){
    var value       = {
            origin  : {
                get : function(name){
                    switch(name){
                        case 'x': 
                            return canvas.width/2;
                        break;
                        case 'y': 
                            return canvas.height/2;
                        break;
                        case 'z': 
                            return 0;
                        break;
                    } 
                }
            },
            xAxis  : {
                get : function(name){
                    switch(name){
                        case 'x': 
                            return 1;
                        break;
                        case 'y': 
                            return 0;
                        break;
                        case 'z': 
                            return 0;
                        break;
                    } 
                }
            },
            yAxis  : {
                get : function(name){
                    switch(name){
                        case 'x': 
                            return 0;
                        break;
                        case 'y': 
                            return -1;
                        break;
                        case 'z': 
                            return 0;
                        break;
                    } 
                }
            },
            zAxis  : {
                get : function(name){
                    switch(name){
                        case 'x': 
                            return 0; 
                        break;
                        case 'y': 
                            return 0;
                        break;
                        case 'z': 
                            return -1;
                        break;
                    } 
                }
            }
        };

    this.canvas = canvas;
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
    this.add    = function(name, val){
        if(value[name] == undefined) value[name] = [];
        value[name].push(val);
    };
    this.refresh    = function(){
        var canvas      = this.canvas,
            ctx         = canvas.getContext('2d'),
            fov         = 250,
            origin      = this.get('origin'),
            originX     = origin.get('x'),
            originY     = origin.get('y'),
            xAxis       = this.get('xAxis'),
            yAxis       = this.get('yAxis'),
            zAxis       = this.get('zAxis'),
            world2screen    = function(vec3, fov){
                var scale   = fov/(fov + vec3.get('z')),
                    color   = 'rgba(0,0,0,'+scale+')',
                    radius  = 1*scale,
                    x       = vec3.get('x') * 1 * scale + originX,
                    y       = vec3.get('y') * -1 * scale + originY;
                return  {x: x, y: y, color: color, radius: radius, scale: scale}
            },
            xAxis2  = {x: 20 + originX , y: originY},//world2screen(xAxis, fov),
            yAxis2  = {x: 0 + originX , y: -20 + originY},//world2screen(xAxis, fov),
            arrowSize   = 3;

        //coordinate
        ctx.font        = '10px Georgia';   
        //x axis 
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.strokeStyle = 'rgb(200,0,0)';
        ctx.lineTo(xAxis2.x , xAxis2.y);
        ctx.stroke();
        ctx.fillStyle   = 'rgb(200,0,0)';
        ctx.lineTo(xAxis2.x , xAxis2.y + arrowSize);
        ctx.lineTo(xAxis2.x + arrowSize * 2 , xAxis2.y);
        ctx.lineTo(xAxis2.x , xAxis2.y - arrowSize);
        ctx.lineTo(xAxis2.x , xAxis2.y);
        ctx.fillText('x', xAxis2.x, xAxis2.y + 12);  
        ctx.fill();

        //y axis
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.strokeStyle = 'rgb(0,200,0)';
        ctx.lineTo(yAxis2.x , yAxis2.y);
        ctx.stroke();
        ctx.fillStyle   = 'rgb(0,200,0)';
        ctx.lineTo(yAxis2.x + arrowSize , yAxis2.y);
        ctx.lineTo(yAxis2.x , yAxis2.y - arrowSize * 2);
        ctx.lineTo(yAxis2.x - arrowSize  , yAxis2.y);
        ctx.lineTo(yAxis2.x , yAxis2.y);
        ctx.fillText('y', yAxis2.x - 10, yAxis2.y + 3);  
        ctx.fill();

        //z axis
        ctx.beginPath();
        ctx.lineTo(originX, originY);
        ctx.fillStyle   = 'rgb(0,0,200)';
        ctx.arc(originX, originY, arrowSize, 0, 4 * Math.PI, false);
        ctx.fillText('z', originX - 10, originY + 12);  
        ctx.fill();
        
        //vector3
        var vector3s    = this.get('vector3s'),
            vector3,
            //fov         = Math.PI/30,
            origin      = this.get('origin'),
            aspect      = 1.0,
            zn          = 1.0,
            zf          = 1000,
            zn_zf       = zn-zf,
            znDzf       = zn/zf,
            cotTheta    = 1/Math.tan(fov * 0.5),
            perspectiveMatrix    = [
                [cotTheta / aspect,     0,          0,              0],     
                [0,                     cotTheta,   0,              0],     
                [0,                     0,          zf/-zn_zf,      1],     
                [0,                     0,          zn*zf/zn_zf,    0],     
            ],
            coordinateTransformMatrix;

        for(var i = 0; i< vector3s.length; i++){
            vector3 = vector3s[i];
            //投影处理
            var vec2    = world2screen(vector3, fov),
                x       = vec2.x;
                y       = vec2.y;

            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.fillStyle = vec2.color;
            ctx.arc(
                x,
                y,
                vec2.radius,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            //ctx.strokeStyle = 'rgba(0,0,0,.5)';
            //ctx.moveTo(x,y);
            //ctx.lineTo(origin.x,origin.y);
        };

        //ctx.stroke();
        //Curve3
        var curve3s    = this.get('curve3s'),
            curve3,
            startVec3,
            control1Vec3,
            control2Vec3,
            endVec3,
            gradient;

        if(curve3s){ 
            ctx.beginPath();
            for(var i = 0; i< curve3s.length; i++){
                curve3          = curve3s[i];
                startVec2       = world2screen(curve3.get('startVec3'), fov);
                control1Vec2    = world2screen(curve3.get('control1Vec3'), fov);
                control2Vec2    = world2screen(curve3.get('control2Vec3'), fov);
                endVec2         = world2screen(curve3.get('endVec3'), fov);

                ctx.moveTo( startVec2.x, startVec2.y);
                ctx.strokeStyle = control1Vec2.color;
                ctx.bezierCurveTo(
                    control1Vec2.x,      
                    control1Vec2.y,            
                    control2Vec2.x,            
                    control2Vec2.y,            
                    endVec2.x,        
                    endVec2.y 
                );
            };
            ctx.stroke();
        }
    }
};
var canvas  = function(){

};
canvas.prototype    = {
    
};
var CoordinateSystem  = function(xAxis, yAxis, zAxis, origin, coordinateSystem){
    var value   = {
        origin  : new Vector3(0,0,0,world),
        xAxis   : new Vector3(1,0,0,world),
        yAxis   : new Vector3(0,1,0,world),
        zAxis   : new Vector3(0,0,1,world),
        coordinateSystem    : world
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
                if(val != undefined) value[name] = val;
                return value[name]; 
            break;
        }    
    }
    this.set('xAxis',xAxis);
    this.set('yAxis',yAxis);
    this.set('zAxis',zAxis);
    this.set('coordinateSystem',coordinateSystem);

};
CoordinateSystem.prototype  = {
    add    : function(name, val){
        this.get('coordinateSystem').add(name, val);
    },
    convertToParentSpace   : function(vec3){
        var x   = this.get('xAxis').normalize();
            x   = x.multiply(vec3.get('x'));
            x   = x.add(this.get('origin')).get('x');  
        var y   = this.get('yAxis').normalize();
            y   = y.multiply(vec3.get('y'));
            y   = y.add(this.get('origin')).get('y');  
        var z   = this.get('zAxis').normalize();
            z   = z.multiply(vec3.get('z'));
            z   = z.add(this.get('origin')).get('z');  

        var coordinateSystem    = this.get('coordinateSystem');
        var parentVec3 = new Vector3( x , y , z , coordinateSystem);
        return coordinateSystem.convertToParentSpace(parentVec3);
    },
    refresh   : function(){
        //coordinate
        this.get('coordinateSystem').refresh();
        //convertToParentSpace(this.get('xAxis')).x) 
    }
};

//Vector3
var Vector3 = function(x,y,z,coordinateSystem){
    var value   = {
        x           : 0,
        y           : 0,
        z           : 0,
        coordinateSystem  : world,
        vector2     : {
            x   : 0,
            y   : 0
        }
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
            case 'x'    : 
                if(val != undefined) value.x = val;
                return value[name];         
            break;
            default :
                if(val != undefined) value[name] = val;
                return value[name]; 
            break;
        }    
    };
    this.set('x',x);
    this.set('y',y);
    this.set('z',z);
    this.set('coordinateSystem',coordinateSystem);

    this.get('coordinateSystem').add('vector3s',this);
};
Vector3.prototype   = {
    length      : function(){
        var x   = this.get('x'),
            y   = this.get('y'),
            z   = this.get('z');

        return Math.sqrt( x * x + y * y + z * z); 
    },
    sqrLength   : function(){
        var x   = this.get('x'),
            y   = this.get('y'),
            z   = this.get('z');

        return x * x + y * y + z * z; 
    },
    normalize   : function(){
        var inv = 1/this.length();
        return new Vector3(this.get('x') * inv, this.get('y') * inv, this.get('z') * inv);
    },
    add         : function(vec3){
        return new Vector3(
            this.get('x') + vec3.get('x'),
            this.get('y') + vec3.get('y'),
            this.get('z') + vec3.get('z'),
            this.get('coordinateSystem')
        );
    },
    multiply    : function(f){
        return new Vector3(
            this.get('x') * f,
            this.get('y') * f,  
            this.get('z') * f  
        );
    },
    dot         : function(vec3){
        return new Vector3(
            this.get('x') * vec3.get('x'),
            this.get('y') * vec3.get('y'),
            this.get('z') * vec3.get('z'),
            this.get('coordinateSystem')
        )
    },
    cross       : function(vec3){
        return new Vector3(
            -this.get('z') * vec3.get('y') + this.get('y') * vec3.get('z'),
            this.get('z') * vec3.get('x') - this.get('x') * vec3.get('z'),
            -this.get('y') * vec3.get('x') - this.get('x') * vec3.get('y'),
            this.get('coordinateSystem')
        )
    }
}

//curve3
var Curve3  = function(startVec3, control1Vec3, control2Vec3, endVec3){//startx, starty, control1x, control1y, control2x, control2y, endx, endy){
    var value   = {
        startVec3       : startVec3,
        control1Vec3    : control1Vec3,
        control2Vec3    : control2Vec3,
        endVec3         : endVec3,
        coordinate  : world
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
                if(val != undefined) value[name] = val;
                return value[name]; 
            break;
        }    
    };

    this.set('startVec3',startVec3);
    this.set('control1Vec3',control1Vec3);
    this.set('control2Vec3',control2Vec3);
    this.set('endVec3',endVec3);

    this.get('coordinate').add('curve3s',this);
};


var canvas      = document.createElement('canvas');
canvas.width    = 500; 
canvas.height   = 500;
canvas.style.width  = '500px';
canvas.style.height = '500px';
document.body.appendChild(canvas);


var world   = new World(canvas);
var vec = new Vector3(
    20,
    20,
    0,
    world
);
//test coordinate system
var coor    = new CoordinateSystem(
    new Vector3(10,0,0,world),
    new Vector3(0,10,0,world),
    new Vector3(0,0,10,world),
    new Vector3(20,20,0,world)
);
coor.refresh();
*/
        /*
for (i=0; i<0; i++){
    var vec = new Vector3(
        (Math.random()*400)-200,
        (Math.random()*400)-200,
        (Math.random()*500),
        world
    );
    var vec1 = new Vector3(
        (Math.random()*400)-200,
        (Math.random()*400)-200,
        (Math.random()*500),
        world
    );
    var vec2 = new Vector3(
        (Math.random()*400)-200,
        (Math.random()*400)-200,
        (Math.random()*500),
        world
    );
    var vec3 = new Vector3(
        (Math.random()*400)-200,
        (Math.random()*400)-200,
        (Math.random()*500),
        world
    );
    var cur = new Curve3(vec, vec1, vec2, vec3, world);
};
*/
//world.refresh();
//console.log(world);
//console.log(world.get('vector3s'));
//console.log(world.get('curve3s'));
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
            //console.log(name, ' => ' , val);
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
                //console.log(prop,RegExp.$1);
                
            }else{
			    content += '        ' + prop + ':' + frame[prop] + ';\n\r';
            }
        }
        content += '    }\n\r'; 
	}
    content += '}'; 

	//console.log(content);
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














//new
//

var Vector3 = function(x,y,z){
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.z = z ? z : 0;
    this.matrixs    = {};
};
Vector3.prototype   = {
    preMultiply : function(name, matrix){
        this.matrixs[name] = matrix;
        return this;
    },
    equal       : function(){
        var vector = [
                [this.x],
                [this.y],
                [this.z],
                [1]
            ],
            i,j,k,row,val,matrix,
            matrixs = this.matrixs,
            result  = [
                [0],
                [0],
                [0],
                [0]
            ];
       
        for(i in matrixs){
            matrix  = matrixs[i];
            for(j=0; j<matrix.length; j++){
                for(k=0; k<matrix[j].length; k++){
                    result[j][0] += matrix[j][k] * vector[k];
                } 
            }
            console.log(result.toString());
        };
        return {
            x   : result[0],
            y   : result[1],
            z   : result[2]
        };
    }
};
var cos = Math.cos,
    sin = Math.sin,
    tan = Math.tan,
    PI  = Math.PI;

var vector3 = new Vector3(1,0,0);
vector3.preMultiply('平移',[
    [1,0,0,0],            
    [0,1,0,0],            
    [0,0,1,0],            
    [0,0,0,1]            
]);
console.log(vector3.equal());
vector3.preMultiply('绕x轴旋转',[
    [1,0,0,0],            
    [0,cos(PI/2),sin(PI/2),0],            
    [0,-sin(PI/2),cos(PI/2),0],            
    [0,0,0,1]            
]);

console.log(vector3.equal());
console.log(vector3);

});

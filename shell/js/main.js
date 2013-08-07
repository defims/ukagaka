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

var Vector3 = function(x,y,z,matrixs){
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.z = z ? z : 0;
    this.matrixs        = [{}];

    if(matrixs) this.matrixs[0] = matrixs;//[0]local matrixs [1..]coordinate System matrixs
};
Vector3.prototype   = {
    preMultiply : function(name, matrix){
        this.matrixs[0][name] = matrix;
        return this;
    },
    equal       : function(){
        var vector = [this.x,this.y,this.z,1],
            i,j,k,l,row,val,matrix,
            golbalMatrixs = this.matrixs,
            result  = [0,0,0,0];
        for(l=0; l<golbalMatrixs.length; l++){
            matrixs = golbalMatrixs[l];
            for(i in matrixs){
                result  = [0,0,0,0];
                matrix  = matrixs[i];
                for(j=0; j<matrix.length; j++){
                    for(k=0; k<matrix[j].length; k++){
                        result[j] += matrix[j][k] * vector[k];
                    }
                    //console.log(result[j])
                }
                vector  = result;
                //console.log(i+" : "+result.toString());
            }
        };
        return {
            x   : vector[0],
            y   : vector[1],
            z   : vector[2],
            w   : vector[3]
        };
    },
    get    : function(name){
        switch(name){
            default : 
                return this.value[name]; 
            break;
        } 
    },
    set    : function(name, val){
        switch(name){
            default :
                if(val != undefined) this.value[name] = val;
                return this.value[name]; 
            break;
        }    
    }
};
var cos = Math.cos,
    sin = Math.sin,
    tan = Math.tan,
    PI  = Math.PI;

var e   = {//摄像机相对屏幕位置
        x   : 0,
        y   : 0,
        z   : 300 
    };
/**/
//var vector3 = new Vector3(10,10,0);
/**/
/**
vector3.preMultiply('平移',[
    [1,0,0,0], 
    [0,1,0,0], 
    [0,0,1,0], 
    [0,0,0,1] 
]);
/**/
/**
vector3.preMultiply('绕x轴旋转1',[
    [1,0,0,0],            
    [0,cos(PI/2),sin(PI/2),0],            
    [0,-sin(PI/2),cos(PI/2),0],            
    [0,0,0,1]            
]);
/**/
/**
vector3.preMultiply('绕x轴旋转2',[
    [1,0,0,0],            
    [0,cos(-PI/2),sin(-PI/2),0],            
    [0,-sin(-PI/2),cos(-PI/2),0],            
    [0,0,0,1]            
]);
/**
vector3.preMultiply('投影二维',[
    [1,0,0,-e.x],            
    [0,1,0,-e.y],            
    [0,0,1,0],            
    [0,0,1/e.z,1]            
]);
/**/
/**
var x0 = 10,
    y0 = 0,
    z0 = 0,
    ux = 0,
    uy = 1,
    uz = 0,
    vx = 1,
    vy = 0,
    vz = 0,
    nx = 0,
    ny = 0,
    nz = 1;

/*vector3.preMultiply('坐标变换1',[
    [1,0,0,-x0],            
    [0,1,0,-y0],            
    [0,0,1,-z0],            
    [0,0,0,1]            
]);
vector3.preMultiply('坐标变换2',[
    [ux,uy,uz,0],            
    [vx,vy,vz,0],            
    [nx,ny,nz,0],            
    [0,0,0,1]            
]);
*/
/*
vector3.preMultiply('坐标变换',[
    [ux,uy,uz,-ux*x0-uy*y0-uz*z0],            
    [vx,vy,vz,-vx*x0-vy*y0-vz*z0],            
    [nx,ny,nz,-nx*x0-ny*y0-nz*z0], 
    [0,0,0,1]            
]);
*/
/**/
//console.log(vector3.equal());

 




/*var matrixs = {
        '绕x轴旋转':[
            [1, 0, 0, 0],
            [0, cos(0), -sin(0), 0],
            [0, sin(0), cos(0), 0],
            [0, 0, 0, 1],
        ],
        '三维投影二维':[
            [1, 0, 0, -e.x],
            [0, 1, 0, -e.y],
            [0, 0, 1, 0],
            [0, 0, 1/e.z, 1],
        ]
    },
    vector3s    = [],
    vector3,
    result,
    x,
    y,
    scale,
    ctx         = canvas.getContext('2d');
console.log(matrixs);
*/
/**
for(var i = 0; i< 1000; i++ ){
    vector3 = new Vector3(
        Math.random() * canvas.width - canvas.width/2,
        Math.random() * canvas.height - canvas.height/2,
        Math.random() * 100,
        matrixs
    );
    vector3s.push(vector3);
};
/**/
/**
vector3s.push(new Vector3( 20, 20, 20, matrixs));
vector3s.push(new Vector3( -20, 20, 20, matrixs));
vector3s.push(new Vector3( -20, -20, 20, matrixs));
vector3s.push(new Vector3( 20, -20, 20, matrixs))
vector3s.push(new Vector3( 20, 20, -20, matrixs));
vector3s.push(new Vector3( -20, 20, -20, matrixs));
vector3s.push(new Vector3( -20, -20, -20, matrixs));
vector3s.push(new Vector3( 20, -20, -20, matrixs));
/**/
var CoordinateSystem    = function(axis,geometries, matrixs){
    this.geometries     = {};
    this.vector3s       = [];
    this.matrixs        = matrixs? matrixs : {};
    if(axis.origin) this.origin     = axis.origin;
    if(axis.xAxis)  this.xAxis      = axis.xAxis;
    if(axis.yAxis)  this.yAxis      = axis.yAxis;
    if(axis.zAxis)  this.zAxis      = axis.zAxis;
    if(axis.coordinateSystem)   this.coordinateSystem   = axis.coordinateSystem;

    //axis
    var vector3,
        coordinateSystem = this.coordinateSystem;
        
    while(coordinateSystem){
        var o   = coordinateSystem.origin,
            u   = coordinateSystem.xAxis,
            v   = coordinateSystem.yAxis,
            n   = coordinateSystem.zAxis;

        this.matrixs['0坐标系变换矩阵'] = [
            [u[0],u[1],u[2],-u[0]*o[0]-u[1]*o[1]-u[2]*o[2]],            
            [v[0],v[1],v[2],-v[0]*o[0]-v[1]*o[1]-v[2]*o[2]],            
            [n[0],n[1],n[2],-n[0]*o[0]-n[1]*o[1]-n[2]*o[2]], 
            [0,0,0,1]            
        ];
        coordinateSystem = coordinateSystem.coordinateSystem;
    }
    if(geometries.points) this.addPoints(geometries.points);
    if(geometries.lines) this.addLines(geometries.lines);
    if(geometries.curves) this.addCurves(geometries.curves);
    if(u && v && n) this.addArrows([[o,u],[o,v],[o,n]]);

}
CoordinateSystem.prototype  = {
    addPoints   : function(points){//points
        if(!points) return;
        var point,vector3;
        for(var i = 0; i<points.length; i++){
            point   = points[i];
            vector3  = new Vector3(point[0],point[1],point[2]);
            vector3.matrixs.push( this.matrixs );
            this.vector3s.push( vector3 );
            if(!this.geometries.points){
                this.geometries.points = [];
            }
            this.geometries.points.push(vector3);
        }
    },
    addLines    : function(lines){//lines
        if(!lines) return;
        var line,
            point1,
            point2,
            vector31,
            vector32;
        for(var i = 0; i<lines.length; i++){
            line    = lines[i];
            point1  = line[0];
            point2  = line[1];
            vector31 = new Vector3(point1[0],point1[1],point1[2]);
            vector32 = new Vector3(point2[0],point2[1],point2[2]);
            vector31.matrixs.push( this.matrixs );
            vector32.matrixs.push( this.matrixs );
            this.vector3s.push( vector31 );
            this.vector3s.push( vector32 );
            if(!this.geometries.lines){
                this.geometries.lines = [];
            }
            this.geometries.lines.push([vector31,vector32]);
        };
    },
    addCurves   : function(curves){//curves
        if(!curves) return;
        var curve,
            point1,
            point2,
            point3,
            point4,
            vector31,
            vector32,
            vector33,
            vector34;
        for(var i = 0; i<curves.length; i++){
            curve   = curves[i];
            point1  = curve[0];
            point2  = curve[1];
            point3  = curve[2];
            point4  = curve[3];
            vector31 = new Vector3(point1[0],point1[1],point1[2]);
            vector32 = new Vector3(point2[0],point2[1],point2[2]);
            vector33 = new Vector3(point3[0],point3[1],point3[2]);
            vector34 = new Vector3(point4[0],point4[1],point4[2]);
            vector31.matrixs.push( this.matrixs );
            vector32.matrixs.push( this.matrixs );
            vector33.matrixs.push( this.matrixs );
            vector34.matrixs.push( this.matrixs );
            this.vector3s.push( vector31 );
            this.vector3s.push( vector32 );
            this.vector3s.push( vector33 );
            this.vector3s.push( vector34 );
            if(!this.geometries.curves){
                this.geometries.curves = [];
            }
            this.geometries.curves.push([vector31,vector32,vector33,vector34]);
        };
    },
    addArrows   : function(arrows){//arrows
        if(!arrows) return;
        var arrow,
            point1,
            point2,
            vector31,
            vector32;
        console.log(arrows)
        for(var i = 0; i<arrows.length; i++){
            arrow   = arrows[i];
            point1  = arrow[0];
            point2  = arrow[1];
            vector31 = new Vector3(point1[0],point1[1],point1[2]);
            vector32 = new Vector3(point2[0],point2[1],point2[2]);
            vector31.matrixs.push( this.matrixs );
            vector32.matrixs.push( this.matrixs );
            this.vector3s.push( vector31 );
            this.vector3s.push( vector32 );
            if(!this.geometries.arrows){
                this.geometries.arrows = [];
            }
            this.geometries.arrows.push([vector31,vector32]);
        };
    }
};
var world               = new CoordinateSystem({
    'origin': [0,0,0],
    'xAxis' : [1,0,0],
    'yAxis' : [0,1,0],
    'zAxis' : [0,0,1]
},{
},{

});
var coordinateSystem    = new CoordinateSystem({
    'origin': [0,0,0],
    'xAxis' : [1,0,0],
    'yAxis' : [0,1,0],
    'zAxis' : [0,0,1],
    'coordinateSystem' : world
},{
    'points':[
        [20,20,20],
        [-20,20,20],
        [-20,-20,20],
        [20,-20,20],
        [20,20,-20],
        [-20,20,-20],
        [-20,-20,-20],
        [20,-20,-20]
    ],
    'lines':[
        [[0,0,0],[20,0,0]],  
        [[0,0,0],[0,30,0]],
        [[0,0,0],[0,0,10]]  
    ],
    'curves':[
        [[0,0,0],[1,1,1],[10,10,10],[50,50,50]],
        [[0,0,0],[1,1,1],[10,10,10],[0,0,0]] 
    ],
    'arrows':[
        [[0,0,0],[1,1,1],3,3] 
    ]
},{
    '1绕x轴旋转矩阵':[
        [1, 0, 0, 0],
        [0, cos(0), -sin(0), 0],
        [0, sin(0), cos(0), 0],
        [0, 0, 0, 1],
    ],
    '2绕y轴旋转矩阵':[
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ],
    '3绕z轴旋转矩阵':[
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ] 
});
console.log(coordinateSystem)
/**/

//vector3s.push(new Vector3( 20, 20, 20, matrixs));
var phi         = 0,
    canvas      = document.createElement('canvas'),
    ctx         = canvas.getContext('2d'),
    vector3s    = coordinateSystem.vector3s,
    geometries  = coordinateSystem.geometries,
    o           = [0,0,0],
    u           = [0,1,0],
    v           = [1,0,0],
    n           = [0,0,1];


canvas.width    = 500; 
canvas.height   = 500;
canvas.style.width  = '500px';
canvas.style.height = '500px';
document.body.appendChild(canvas);

setInterval(function(){
    phi += PI/50;
    coordinateSystem.matrixs['1绕x轴旋转'] = [
        [1, 0, 0, 0],
        [0, cos(phi), -sin(phi), 0],
        [0, sin(phi), cos(phi), 0],
        [0, 0, 0, 1],
    ];

    coordinateSystem.matrixs['2三维投影二维'] = [
        [1, 0, 0, -e.x],
        [0, 1, 0, -e.y],
        [0, 0, 1, 0],
        [0, 0, 1/e.z, 1],
    ];
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    ctx.beginPath();
    var offsetX   = canvas.width/2, 
        offsetY   = canvas.height/2;

    //points
    var points   = geometries.points;
    if(points.length != 0){
        for(var i = 0; i<points.length; i++){
            var point   = points[i], 
                result  = point.equal(),
                x       = result.x/result.w + offsetX,
                y       = result.y/result.w + offsetY;
            ctx.moveTo(x,y);
            ctx.arc(
                x,
                y,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
        };
    }
    //lines
    var lines   = geometries.lines;
    ctx.fillStyle   = 'rgb(0,0,0)';
    ctx.strokeStyle   = 'rgb(0,0,0)';
    if(lines && lines.length != 0){
        for(var i = 0; i<lines.length; i++){
            var line    = lines[i], 
                point1  = line[0], 
                point2  = line[1], 
                result1 = point1.equal(),
                result2 = point2.equal(),
                x1      = result1.x/result1.w + offsetX,
                x2      = result2.x/result2.w + offsetX,
                y1      = result1.y/result1.w + offsetY;
                y2      = result2.y/result2.w + offsetY;

            ctx.moveTo(x1,y1);
            ctx.arc(
                x1,
                y1,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            ctx.arc(
                x2,
                y2,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
        };
    };
    //curves
    var curves   = geometries.curves;
    ctx.fillStyle   = 'rgb(0,0,0)';
    ctx.strokeStyle   = 'rgb(0,0,0)';
    if(curves && curves.length != 0){
        for(var i = 0; i<curves.length; i++){
            var curve   = curves[i], 
                point1  = curve[0], 
                point2  = curve[1], 
                point3  = curve[2], 
                point4  = curve[3], 
                result1 = point1.equal(),
                result2 = point2.equal(),
                result3 = point3.equal(),
                result4 = point4.equal(),
                x1      = result1.x/result1.w + offsetX,
                x2      = result2.x/result2.w + offsetX,
                x3      = result3.x/result3.w + offsetX,
                x4      = result3.x/result2.w + offsetX,
                y1      = result1.y/result1.w + offsetY;
                y2      = result2.y/result2.w + offsetY;
                y3      = result3.y/result3.w + offsetY;
                y4      = result4.y/result4.w + offsetY;

            ctx.moveTo(x1,y1);
            ctx.arc(
                x1,
                y1,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.moveTo(x1,y1);
            ctx.bezierCurveTo(
                x2,      
                y2,            
                x3,            
                y3,            
                x4,        
                y4 
            );
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x4,y4);
            ctx.arc(
                x4,
                y4,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
        };
    };
    //arrows
    var arrows   = geometries.arrows;
    if(arrows && arrows.length != 0){
        for(var i = 0; i<arrows.length; i++){
            var arrow   = arrows[i], 
                point1  = arrow[0], 
                point2  = arrow[1], 
                result1 = point1.equal(),
                result2 = point2.equal(),
                x1      = result1.x/result1.w + offsetX,
                x2      = result2.x/result2.w + offsetX,
                y1      = result1.y/result1.w + offsetY;
                y2      = result2.y/result2.w + offsetY;

            ctx.moveTo(x1,y1);
            ctx.arc(
                x1,
                y1,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fillStyle   = 'rgb(255,0,0)';
            ctx.fill();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.strokeStyle   = 'rgb(255,0,0)';
            ctx.stroke();
            ctx.arc(
                x2,
                y2,
                1,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
        };
    };
}, 50);


});

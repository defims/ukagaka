define(function(){

var x           = 0,
    y           = 0,
    z           = 0,
    Vector3d    = function(x,y,z){
        this.matrixs    = [[]];
        x && this.set(x,y,z); 
    },
    $           = Vector3d.prototype;

$["get"]      = function(name){
    switch(name){
        case 'x':
            return x;
        break;
        case 'y':
            return y;
        break;
        case 'z':
            return z;
        break;
        default : 
            return {x: x, y: y, z: z}
        break;
    }
    return 
};
$["set"]    =   function(x,y,z){
};
$["normalize"]  =   function(){
};
$["x"]  =   $["crossProduct"]   =   function(){
};
$["o"]  =   $["dotProduct"] =   function(){
};
$["length"] =   function(){
};
$["squaredLength"]  =   function(){
};
$["toString"]   =   function(){
};
$["clone"]          = function(){
};
$["addTo"]          = function(){
};
$["transform"]      = function(M1){//M1
};
$["rotate"]         = function(){//M1xM2
};
$["translate"]      = function(){//M1*M2
};
$["scale"]          = function(){//M1xM2
};

return Vector3d;
});

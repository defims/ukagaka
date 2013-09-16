define(function(){

var _x          = 0,
    _y          = 0,
    _z          = 0,
    Vector3d    = function(x,y,z){
        this.matrixs    = [[]];
        x && this.set(x,y,z); 
    },
    $           = Vector3d.prototype;

$["get"]      = function(name){
    switch(name){
        case 'x':
            return _x;
        break;
        case 'y':
            return _y;
        break;
        case 'z':
            return _z;
        break;
        default : 
            return {x: _x, y: _y, z: _z};
        break;
    }
    return 
};
$["set"]    =   function(x,y,z){
    _x = x;
    _y = y;
    _z = z;
};
$["normalize"]  =   function(){
    var length  = this.length(),
        vec     = this.get();
    this.set(vec.x/length, vec.y/length, vec.z/length);
    return this.get();
};
$["x"]  =   $["cross"]  =   $["crossProduct"]   =   function(){
};
$["o"]  =   $["dot"]    =   $["dotProduct"] =   function(){
};
$["length"] =   function(){
    var vec   = this.get();
    return Math.sqrt( vec.x * vec.x + vec.y * vec.y + vec.z * vec.z );
};
$["squaredLength"]  =   function(){
    var vec   = this.get();
    return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z; 
};
$["toString"]   =   function(){
    var vec   = this.get();
    return "("+ vec.x +","+vec.y+","+vec.z+")";
};
$["clone"]          = function(){
    var vec   = this.get();
    return new Vector3d(vec.x, vec.y, vec.z);
};
$["addTo"]          = function(){
};
$["angleBetween"]   = function(){
};
$["transform"]      = function(){
};
$["rotate"]         = function(){
};
$["translate"]      = function(){
};
$["scale"]          = function(){
};

return Vector3d;
});

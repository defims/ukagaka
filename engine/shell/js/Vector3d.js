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
    var matrixs = this.matrixs,
        x       = _x,
        y       = _y,
        z       = _z,
        w       = 1,
        tempX   = _x,
        tempY   = _y,
        tempZ   = _z,
        tempW   = 1,
        i,j,Mi,M;

    for(i=0; i<matrixs.length; i++){
        Mi = matrixs[i];
        for(j=0; j<Mi.length; j++){
            M  = Mi[j];
            tempX = x*M[0] + y*M[1] + z*M[2] + w*M[3];
            tempY = x*M[4] + y*M[5] + z*M[6] + w*M[7]; 
            tempZ = x*M[8] + y*M[9] + z*M[10] + w*M[11];
            tempW = x*M[12] + y*M[13] + z*M[14] + w*M[15];
            x = tempX;
            y = tempY;
            z = tempZ;
            w = tempW;
        }
    }

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
            return {x: x, y: y, z: z};
        break;
    }
};
$["set"]    =   function(x,y,z){
    _x = x;
    _y = y;
    _z = z;
    return this.get()
};
$["normalize"]  =   function(){
    var length  = this.length(),
        vec     = this.get();
    this.set(vec.x/length, vec.y/length, vec.z/length);
    return this.get();
};
$["x"]  =   $["cross"]  =   $["crossProduct"]   =   function(V2){//V1xV2
    var V1 = this.get();
    return this.set(V1.y*V2.z - V1.z*V2.y , V1.z*V2.x - V1.x*V2.z , V1.x*V2.y - V1.y*V2.x);
};
$["o"]  =   $["dot"]    =   $["dotProduct"] =   function(V2){//V1.V2
    var V1 = this.get();
    return this.set(V1.x*V2.x, V1.y*V2.y, V1.z*V2.z);
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
$["transform"]      = function(M){//V*M set matrixs
    this.matrixs[0].push(M);
    return this.get();
};
$["rotate"]         = function(xAngle, yAngle, zAngle){
    cosx  = xAngle ? Math.cos(xAngle) : 1;
    sinx  = xAngle ? Math.sin(xAngle) : 0;
    cosy  = yAngle ? Math.cos(yAngle) : 1;
    siny  = yAngle ? Math.sin(yAngle) : 0;
    cosz  = zAngle ? Math.cos(zAngle) : 1;
    sinz  = zAngle ? Math.sin(zAngle) : 0;

    this.transform([
        cosy*cosz,                      -cosy*sinz,                     -siny,      0,
        -sinx*siny*cosz + cosx*siny,    sinx*siny*sinz + cosx*cosy,     -sinx*cosy, 0,
        cosx*siny*cosz + sinx*siny,     -cosx*siny*sinz + sinx*cosz,    cosx*cosy,  0,
        0,                              0,                              0,          1
    ]);
    return this.get();
};
$["translate"]      = function(m, n, l){
    m   = m || 1;
    n   = n || 1;
    l   = l || 1;

    this.transform([
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        m,  n,  l,  1
    ]);
    return this.get();
};
$["scale"]          = function(xScale, yScale, zScale, scale){
    xScale  = xScale || 1;
    yScale  = yScale || 1;
    zScale  = zScale || 1;
    scale   = scale || 1;

    this.transform([
        xScale, 0,      0,      0,
        0,      yScale, 0,      0,
        0,      0,      zScale, 0,
        0,      0,      0,      scale
    ]);
    return this.get();
};

return Vector3d;
});

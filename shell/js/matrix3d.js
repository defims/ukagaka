define([],function(){

var Matrix3d        = function(){
    var M1    = [
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        0,0,0,0
    ];
    this.prototype["add"]         =   function(M2){//M!+M2
        M1  = [
            M1[0] + M2[0],      M1[1] + M2[1],      M1[2] + M2[2],      M1[3] + M2[3], 
            M1[4] + M2[4],      M1[5] + M2[5],      M1[6] + M2[6],      M1[7] + M2[7], 
            M1[8] + M2[8],      M1[9] + M2[9],      M1[10] + M2[10],    M1[11] + M2[11], 
            M1[12] + M2[12],    M1[13] + M2[13],    M1[14] + M2[14],    M1[15] + M2[15] 
        ];
        return M1;
    };
    this.prototype["dot"]         =   function(M2){//M!*M2
        if(typeof M2==="number")
    };
    this.prototype["multiply"]    =   function(){//M1xM2
    };
    this.prototype["o"]           =   function(){//M1*M2
    };
    this.prototype["x"]           =   function(){//M1xM2
    };
};

return Matrix3d;
});

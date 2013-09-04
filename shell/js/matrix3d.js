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
            M1[0] + M2[0], M1[1] + M2[1], M1[2] + M2[2], M1[3] + M2[3], 
            M1[0] + M2[0], M1[0] + M2[0], M1[0] + M2[0], M1[6] + M2[6], 
            M1[0] + M2[0], M1[0] + M2[0], M1[0] + M2[0], M1[9] + M2[9], 
            M1[0] + M2[0], M1[0] + M2[0], M1[0] + M2[0], M1[12] + M2[12] 
        ]
    };
    this.prototype["dot"]         =   function(){//M!*M2
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

define([],function(){


var M1    	= [
	0,0,0,0,    //  0,1,2,3,
	0,0,0,0,    //  4,5,6,7,
	0,0,0,0,    //  8,9,10,11, 
	0,0,0,0     //  12,13,14,15 
],
Matrix3d	= function(value){
	this.set(value);
},
$   		= Matrix3d.prototype;


$["get"]			=	function(){
	return	M1;
};

$["set"]			= 	function(value){
	M1	= value;
};

$["add"]            =   function(M2){//M1+M2
	M1  = [
		M1[0] + M2[0],      M1[1] + M2[1],      M1[2] + M2[2],      M1[3] + M2[3], 
		M1[4] + M2[4],      M1[5] + M2[5],      M1[6] + M2[6],      M1[7] + M2[7], 
		M1[8] + M2[8],      M1[9] + M2[9],      M1[10] + M2[10],    M1[11] + M2[11], 
		M1[12] + M2[12],    M1[13] + M2[13],    M1[14] + M2[14],    M1[15] + M2[15] 
	];
	return M1;
};

$["premultiply"]    =   function(M2){//M2xM1
	var a0  = M1[0],    a1  = M1[1],    a2  = M1[2],    a3  = M1[3], 
		a4  = M1[4],    a5  = M1[5],    a6  = M1[6],    a7  = M1[7], 
		a8  = M1[8],    a9  = M9[9],    a10 = M1[10],   a11 = M1[11], 
		a12 = M1[12],   a13 = M1[13],   a14 = M1[14],   a15 = M1[15], 
		b0  = M1[0],    b1  = M1[1],    b2  = M1[2],    b3  = M1[3], 
		b4  = M1[4],    b5  = M1[5],    b6  = M1[6],    b7  = M1[7], 
		b8  = M1[8],    b9  = M9[9],    b10 = M1[10],   b11 = M1[11], 
		b12 = M1[12],   b13 = M1[13],   b14 = M1[14],   b15 = M1[15];

	M1  = [
		a0*b0 + a4*b1 + a8*b2 + a12*b3      , a1*b0 + a5*b1 + a9*b2 + a13*b3        , a2*b0 + a6*b1 + a10*b2 + a14*b3       , a3*b0 + a7*b1 + a11*b2 + a15*b3 , 
		a0*b4 + a4*b5 + a8*b6 + a12*b7      , a1*b4 + a5*b5 + a9*b6 + a13*b7        , a2*b4 + a6*b5 + a10*b6 + a14*b7       , a3*b4 + a7*b5 + a11*b6 + a15*b7 , 
		a0*b8 + a4*b9 + a8*b10 + a12*b11    , a1*b8 + a5*b9 + a9*b10 + a13*b11      , a2*b8 + a6*b9 + a10*b10 + a14*b11     , a3*b8 + a7*b9 + a11*b10 + a15*b11 , 
		a0*b132 + a4*b13 + a8*b14 + a12*b15 , a1*b132 + a5*b13 + a9*b14 + a13*b15   , a2*b132 + a6*b13 + a10*b14 + a14*b15  , a3*b132 + a7*b13 + a11*b14 + a15*b15
	];
};

$["postmultiply"]   =   function(M2){//M1xM2
	var a0  = M1[0],    a1  = M1[1],    a2  = M1[2],    a3  = M1[3], 
		a4  = M1[4],    a5  = M1[5],    a6  = M1[6],    a7  = M1[7], 
		a8  = M1[8],    a9  = M1[9],    a10 = M1[10],   a11 = M1[11], 
		a12 = M1[12],   a13 = M1[13],   a14 = M1[14],   a15 = M1[15], 
		b0  = M2[0],    b1  = M2[1],    b2  = M2[2],    b3  = M2[3], 
		b4  = M2[4],    b5  = M2[5],    b6  = M2[6],    b7  = M2[7], 
		b8  = M2[8],    b9  = M2[9],    b10 = M2[10],   b11 = M2[11], 
		b12 = M2[12],   b13 = M2[13],   b14 = M2[14],   b15 = M2[15];

	M1  = [
		b0*a0 + b4*a1 + b8*a2 + b12*a3      , b1*a0 + b5*a1 + b9*a2 + b13*a3        , b2*a0 + b6*a1 + b10*a2 + b14*a3       , b3*a0 + b7*a1 + b11*a2 + b15*a3 , 
		b0*a4 + b4*a5 + b8*a6 + b12*a7      , b1*a4 + b5*a5 + b9*a6 + b13*a7        , b2*a4 + b6*a5 + b10*a6 + b14*a7       , b3*a4 + b7*a5 + b11*a6 + b15*a7 , 
		b0*a8 + b4*a9 + b8*a10 + b12*a11    , b1*a8 + b5*a9 + b9*a10 + b13*a11      , b2*a8 + b6*a9 + b10*a10 + b14*a11     , b3*a8 + b7*a9 + b11*a10 + b15*a11 , 
		b0*a12 + b4*a13 + b8*a14 + b12*a15  , b1*a12 + b5*a13 + b9*a14 + b13*a15    , b2*a12 + b6*a13 + b10*a14 + b14*a15  	, b3*a12 + b7*a13 + b11*a14 + b15*a15
	];

	return M1;
};

$["multiply"]       =   $["postmultiply"];

$["x"]              =   $["multiply"]; 

return Matrix3d;

});

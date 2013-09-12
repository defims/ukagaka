require(["Matrix3d","Vector3d"],function(Matrix3d,Vector3d){
	var M1	= new Matrix3d([
		0,0,0,0,
		0,1,0,0,
		0,2,0,0,
		0,4,0,0  
	]);
	console.log(M1.get())
	M1.add([
		0,0,0,0,
		0,1,0,0,
		0,2,0,0,
		0,4,0,0  
	]);
	console.log(M1.get())
	M1.x([
		0,0,4,0,
		0,1,1,0,
		0,2,2,0,
		0,4,0,0  
	]);
	console.log(M1.get());

// vector3d

});

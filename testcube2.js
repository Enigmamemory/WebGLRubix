"use strict";

var canvas;
var gl;

var NumVertices = 36;

var points = [];
var colors = [];

//may not be necessary

var points2 = [];
var colors2 = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];
var theta2 = [ 0, 0, 0 ];

var trans = [ -0.5, 0, 0 ];
var trans2 = [ 0, 0, 0 ];

var thetaLoc;
var transLoc;

window.onload = function init()
{

    /*========= SET UP CANVAS ============*/
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);;

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    /*========= INITIALIZE/COMPILE SHADER SOURCES =============*/

    var program = initShaders( gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    /*========= PASS POSITION OF VERTEX SHADERS =============*/
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // matrix uniform

    thetaLoc = gl.getUniformLocation(program, "theta");
    transLoc = gl.getUniformLocation(program, "trans");

    var vBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var cBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    function colorCube1()
    {
	quad1( 1, 0, 3, 2 );
	quad1( 2, 3, 7, 6 );
	quad1( 3, 0, 4, 7 );
	quad1( 6, 5, 1, 2 );
	quad1( 4, 5, 6, 7 );
	quad1( 5, 4, 0, 1 );
    }

    function quad1(a, b, c, d)
    {
	var vertices = [
            vec4( -0.25, -0.25,  0.25, 1.0 ),
            vec4( -0.25,  0.25,  0.25, 1.0 ),
            vec4(  0.25,  0.25,  0.25, 1.0 ),
            vec4(  0.25, -0.25,  0.25, 1.0 ),
            vec4( -0.25, -0.25, -0.25, 1.0 ),
            vec4( -0.25,  0.25, -0.25, 1.0 ),
            vec4(  0.25,  0.25, -0.25, 1.0 ),
            vec4(  0.25, -0.25, -0.25, 1.0 )
	];
	
	var vertexColors = [
            [ 0.0, 0.0, 0.0, 1.0 ],  // black
            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ]   // white
	];
	
	// We need to parition the quad into two triangles in order for
	// WebGL to be able to render it.  In this case, we create two
	// triangles from the quad indices
	
	//vertex color assigned by the index of the vertex
	
	var indices = [ a, b, c, a, c, d ];

	for ( var i = 0; i < indices.length; ++i ) {
            points.push( vertices[indices[i]] );
            //colors.push( vertexColors[indices[i]] );

            // for solid colored faces use
            colors.push(vertexColors[a]);

	}

    }

    function render()
    {
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	theta[axis] += 2.0;
	//theta[axis] = 45.0;
	gl.uniform3fv(thetaLoc, theta);

	var vBuffer1 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer1 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

	var cBuffer1 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer1 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
	
	//gl.drawArrays( gl.TRIANGLES, 0, NumVertices1 );
	gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

	requestAnimFrame( render );
    }

    

    
    render();

}



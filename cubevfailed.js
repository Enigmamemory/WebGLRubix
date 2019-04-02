"use strict";

var canvas;
var gl;

var numVertices  = 36;

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = [ 0, 0, 0 ];
var thetaLoc;

    var vertices = [
        vec3( -0.25, -0.25,  0.25 ),
        vec3( -0.25,  0.25,  0.25 ),
        vec3(  0.25,  0.25,  0.25 ),
        vec3(  0.25, -0.25,  0.25 ),
        vec3( -0.25, -0.25, -0.25 ),
        vec3( -0.25,  0.25, -0.25 ),
        vec3(  0.25,  0.25, -0.25 ),
        vec3(  0.25, -0.25, -0.25 )
    ];

    var vertexColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];

var indices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

var numVertices2  = 36;

var axis2 = 0;
var xAxis2 = 0;
var yAxis2 = 1;
var zAxis2 = 2;
var theta2 = [ 0, 0, 0 ];
var thetaLoc2;

    var vertices2 = [
        vec3(  0.25, -0.25,  0.25 ),
        vec3(  0.25,  0.25,  0.25 ),
        vec3(  0.75,  0.25,  0.25 ),
        vec3(  0.75, -0.25,  0.25 ),
        vec3(  0.25, -0.25, -0.25 ),
        vec3(  0.25,  0.25, -0.25 ),
        vec3(  0.75,  0.25, -0.25 ),
        vec3(  0.75, -0.25, -0.25 )
    ];

    var vertexColors2 = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];

// indices of the 12 triangles that compise the cube

var indices2 = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );

    // array element buffer

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // color array atrribute buffer

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    

    thetaLoc = gl.getUniformLocation(program, "theta");

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
	axis2 = xAxis2;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
	axis2 = yAxis2;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
	axis = zAxis2;
    };

    var program2 = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program2 );

    // array element buffer

    var iBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer2);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices2), gl.STATIC_DRAW);

    // color array atrribute buffer
    
    var cBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW );
    

    var vColor2 = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor2, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor2 );

    // vertex array attribute buffer

    
    var vBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );
    

    var vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );

    thetaLoc2 = gl.getUniformLocation(program, "theta2");

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram( program );

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);


    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render );
    
    render();
    
    render2();
    

}

function render(program)
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //gl.useProgram( program );

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);


    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render );
    
}

function render2()
{

    theta2[axis2] += 2.0;
    gl.uniform3fv(thetaLoc2, theta2);


    gl.drawElements( gl.TRIANGLES, numVertices2, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render2 );
    
}

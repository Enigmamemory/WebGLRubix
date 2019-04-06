"use strict";

var canvas;
var gl;

var NumVertices = 36;

var points = []

var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var xSlide;
var ySlide;
var zSlide;

var vbufList = [];
var cbufList = [];
var ibufList = [];

var rmode = 0;
var svalue = 0;

var pieces = new Array(
    
     0, 1, 2, 3, 4, 5, 6, 7, 8,
     9,10,11,12,13,14,15,16,17,
    18,19,20,21,22,23,24,25,26
    
);

var exportdata;

var test = mat4(1,0,0,0,
	        0,1,0,0,
	        0,0,1,0,
	        0,0,0,1);

var test2 = mat4(0,0,0,0);

var axis = 0;

var disabled = false;
var scrambled = false;
var sArray = [];
var rotc = 0;

var thetamlist = new Array(

    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),

    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),

    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),

);

/*
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],

    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],

    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
    
);
*/

var thetalist = new Array(

    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),

    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),

    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    mat4(1,0,0,0,
	 0,1,0,0,
	 0,0,1,0,
	 0,0,0,1),
    
);

/*

    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],

    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],

    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
    
);
*/

var theta = [ 0, 0, 0 ];
var theta2 = [ 0, 0, 0 ];

var tc = 0.31;

var translist = new Array(

    [-tc, tc, tc],
    [0, tc, tc],
    [tc, tc, tc],
    [-tc, 0, tc],
    [0, 0, tc],
    [tc, 0, tc],
    [-tc, -tc, tc],
    [0, -tc, tc],
    [tc, -tc, tc],

    [-tc, tc, 0],
    [0, tc, 0],
    [tc, tc, 0],
    [-tc, 0, 0],
    [0, 0, 0],
    [tc, 0, 0],
    [-tc, -tc, 0],
    [0, -tc, 0],
    [tc, -tc, 0],

    [-tc, tc, -tc],
    [0, tc, -tc],
    [tc, tc, -tc],
    [-tc, 0, -tc],
    [0, 0, -tc],
    [tc, 0, -tc],
    [-tc, -tc, -tc],
    [0, -tc, -tc],
    [tc, -tc, -tc]

);

var trans = [ -tc, 0, tc ];
var trans2 = [ 0, 0, 0 ];

var thetaLoc;
var modelLoc;

/*
var thetaLocV;
var thetaLocM;
var transLoc;
*/

/* =================== DATA =================*/

var vd = 0.15

var vertices1 = [
    /*
    vec3( -0.25, -0.25,  0.25 ),
    vec3( -0.25,  0.25,  0.25 ),
    vec3(  0.25,  0.25,  0.25 ),
    vec3(  0.25, -0.25,  0.25 ),
    vec3( -0.25, -0.25, -0.25 ),
    vec3( -0.25,  0.25, -0.25 ),
    vec3(  0.25,  0.25, -0.25 ),
    vec3(  0.25, -0.25, -0.25 )
    */

    vec3( -vd, -vd,  vd ),
    vec3( -vd,  vd,  vd ),
    vec3(  vd,  vd,  vd ),
    vec3(  vd, -vd,  vd ),

    vec3(  vd,  vd,  vd ),
    vec3(  vd, -vd,  vd ),
    vec3(  vd, -vd, -vd ),
    vec3(  vd,  vd, -vd ),

    vec3(  vd, -vd,  vd ),
    vec3( -vd, -vd,  vd ),
    vec3( -vd, -vd, -vd ),
    vec3(  vd, -vd, -vd ),

    vec3(  vd,  vd, -vd ),
    vec3( -vd,  vd, -vd ),
    vec3( -vd,  vd,  vd ),
    vec3(  vd,  vd,  vd ),

    vec3( -vd, -vd, -vd ),
    vec3( -vd,  vd, -vd ),
    vec3(  vd,  vd, -vd ),
    vec3(  vd, -vd, -vd ),

    vec3( -vd,  vd, -vd ),
    vec3( -vd, -vd, -vd ),
    vec3( -vd, -vd,  vd ),
    vec3( -vd,  vd,  vd )
      
];

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

var vertexColors1 = [
    /*
      vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
      vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
      vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
      vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
      vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
      vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
      vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
      vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    */
    
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 0.0, 1.0, 1.0 )   // magenta
    
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

var indices1 = [
    /*
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
    */

    1, 0, 3,
    3, 2, 1,

    4, 5, 6,
    6, 7, 4,

    8, 9, 10,
    10, 11, 8,

    12, 13, 14,
    14, 15, 12,

    16, 17, 18,
    18, 19, 16,

    20, 21, 22,
    22, 23, 20,
    
];

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

    /*========= SET UP CANVAS ============*/
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);;

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
    modelLoc = gl.getUniformLocation(program, "model");

    /*
    thetaLocV = gl.getUniformLocation(program, "thetav");
    thetaLocM = gl.getUniformLocation(program, "thetam");
    transLoc = gl.getUniformLocation(program, "trans");
    */

    /*================= PUT DATA INTO BUFFERS =====================*/

    var buf = 0;
    
    while (buf < 27) {

	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW );

	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors1), gl.STATIC_DRAW );
    
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices1), gl.STATIC_DRAW);

	vbufList.push(vBuffer);
	cbufList.push(cBuffer);
	ibufList.push(iBuffer);
	
	buf++;
    }

    /*
    var vBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW );
    vBuffer1.itemSize = 3;
    vBuffer1.numItems = 24;

    var cBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors1), gl.STATIC_DRAW );
    cBuffer1.itemSize = 4;
    cBuffer1.numItems = 32;
    
    var iBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer1);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices1), gl.STATIC_DRAW);
    
    var vBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );
    //vBuffer2.itemSize = 3;
    //vBuffer2.numItems = 24;

    var cBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW );
    //cBuffer2.itemSize = 3;
    //cBuffer2.numItems = 24;
    
    var iBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer2);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices2), gl.STATIC_DRAW);
    */

    function disablebuts () {

	var buts = document.getElementsByClassName("rotate");
	var i;
	for (i=0; i<buts.length; i++) {

	    buts[i].disabled = true;
	}
	
    }

    function enablebuts () {

	var buts = document.getElementsByClassName("rotate");
	var i;
	for (i=0; i<buts.length; i++) {

	    buts[i].disabled = false;
	}
	
    }
    
    document.getElementById( "xTopCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveXTopCCW();
	rmode = 0;
	
        //axis = xAxis;
    };
    document.getElementById( "xMidCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveXMidCCW();
	rmode = 1;
	   
        //axis = yAxis;
    };
    document.getElementById( "xBotCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveXBotCCW();
	rmode = 2;
	
        //axis = zAxis;
    };
    
    document.getElementById( "yTopCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveYTopCCW();
	rmode = 3;
	
        //axis = xAxis;
    };
    document.getElementById( "yMidCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveYMidCCW();
	rmode = 4;
	   
        //axis = yAxis;
    };
    document.getElementById( "yBotCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveYBotCCW();
	rmode = 5;
	
        //axis = zAxis;
    };

    document.getElementById( "zTopCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveZTopCCW();
	rmode = 6;
	
        //axis = xAxis;
    };
    document.getElementById( "zMidCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveZMidCCW();
	rmode = 7;
	   
        //axis = yAxis;
    };
    document.getElementById( "zBotCounter" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveZBotCCW();
	rmode = 8;
	
        //axis = zAxis;
    };

        document.getElementById( "xTopClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveXTopCW();
	rmode = 9;
	
        //axis = xAxis;
    };
    document.getElementById( "xMidClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveXMidCW();
	rmode = 10;
	   
        //axis = yAxis;
    };
    document.getElementById( "xBotClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveXBotCW();
	rmode = 11;
	
        //axis = zAxis;
    };
    
    document.getElementById( "yTopClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveYTopCW();
	rmode = 12;
	
        //axis = xAxis;
    };
    document.getElementById( "yMidClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveYMidCW();
	rmode = 13;
	   
        //axis = yAxis;
    };
    document.getElementById( "yBotClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveYBotCW();
	rmode = 14;
	
        //axis = zAxis;
    };

    document.getElementById( "zTopClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveZTopCW();
	rmode = 15;
	
        //axis = xAxis;
    };
    document.getElementById( "zMidClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveZMidCW();
	rmode = 16;
	   
        //axis = yAxis;
    };
    document.getElementById( "zBotClock" ).onclick = function () {
	disablebuts();
	disabled = true;
	MoveZBotCW();
	rmode = 17;
	
        //axis = zAxis;
    };
    document.getElementById( "scramble" ).onclick = function () {
	svalue = document.getElementById("svalue").value
	//console.log(svalue);
	
	if (Number.isInteger(svalue)) {
	    console.log("Not a number");
	}

	else {

	    scrambled = true;
	    disablebuts();
	    var i;
	    for (i = 0; i < svalue; i++) {

		var rmode2 = Math.floor(Math.random() * 18);
		sArray.push(rmode2);
		
	    }

	}
	
    };


    document.getElementById( "export" ).onclick = function ()
    {

	exportdata = {

	    "theta": theta,
	    "thetalist": thetalist,
	    "pieces": pieces
	    
	};

	var fname = document.getElementById( "fname" ).value

	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportdata));
	var dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href",     dataStr     );
	dlAnchorElem.setAttribute("download", fname       );
	dlAnchorElem.click();
	
    };
    
    document.getElementById( "load" ).onclick = function ()
    {
	loadMoves();
    };
    
    function loadMoves() {
	var fileInput = document.getElementById('avatar');

	var file = fileInput.files[0];
	var textType = /text.*/;
	var jsonType = /json.*/;

	if (file.type.match(textType) || file.type.match(jsonType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
		var res = JSON.parse(reader.result);
		//console.log(res);

		var ntheta = res.theta;
		var nthetalist = res.thetalist;
		var fthetalist = []
		var npieces = res.pieces;

		var i;
		
		for (i = 0; i < nthetalist.length; i++){

		    var j;
		    //console.log(nthetalist[i]);

		    var holder = [];
		    
		    for (j = 0; j < nthetalist[i].length; j++)
		    {

			holder = holder.concat(nthetalist[i][j]);
			
		    }

		    //console.log(mat4(holder));
		    nthetalist[i] = mat4(holder);
		}
		

		//console.log(nthetalist);

		/*
		console.log(mat4(

		    [1,0,0,0,
		     0,1,0,0,
		     0,0,1,0,
		     0,0,0,1
		    ]

		));
		*/
		
		//console.log(npieces);
		//console.log(thetalist);

		theta = ntheta;
		document.getElementById( "xSlider" ).value = theta[0];
		document.getElementById( "ySlider" ).value = theta[1];
		document.getElementById( "zSlider" ).value = theta[2];
		
		thetalist = nthetalist;
		pieces = npieces;
		
		/*
		totalTransform = mat4(Array.prototype.slice.call(flatten([...res["transforms"]])));
		runFromString(res["moves"]);
		*/
            
            }

            reader.readAsText(file);   
        
	} else {
            alert("File not supported!");
            // tmp = file.type;
	}
    }
    
    function ChooseMove(a) {

	if (a == 0) {
	    MoveXTopCCW();
	}
	else if (a == 1) {
	    MoveXMidCCW();
	}
	else if (a == 2) {
	    MoveXBotCCW();
	}
	else if (a == 3) {
	    MoveYTopCCW();
	}
	else if (a == 4) {
	    MoveYMidCCW();
	}
	else if (a == 5) {
	    MoveYBotCCW();
	}
	else if (a == 6) {
	    MoveZTopCCW();
	}
	else if (a == 7) {
	    MoveZMidCCW();
	}
	else if (a == 8) {
	    MoveZBotCCW();
	}
	else if (a == 9) {
	    MoveXTopCW();
	}
	else if (a == 10) {
	    MoveXMidCW();
	}
	else if (a == 11) {
	    MoveXBotCW();
	}
	else if (a == 12) {
	    MoveYTopCW();
	}
	else if (a == 13) {
	    MoveYMidCW();
	}
	else if (a == 14) {
	    MoveYBotCW();
	}
	else if (a == 15) {
	    MoveZTopCW();
	}
	else if (a == 16) {
	    MoveZMidCW();
	}
	else if (a == 17) {
	    MoveZBotCW();
	}
	
    }
    
    function MoveXTopCCW() {
	var hold1 = pieces[2];
	var hold2 = pieces[11];

	pieces[2] = pieces[20];
	pieces[20] = pieces[26];
	pieces[26] = pieces[8];
	pieces[8] = hold1;

	pieces[11] = pieces[23];
	pieces[23] = pieces[17];
	pieces[17] = pieces[5];
	pieces[5] = hold2;
    }

    function MoveXMidCCW() {
	var hold1 = pieces[1];
	var hold2 = pieces[10];

	pieces[1] = pieces[19];
	pieces[19] = pieces[25];
	pieces[25] = pieces[7];
	pieces[7] = hold1;

	pieces[10] = pieces[22];
	pieces[22] = pieces[16];
	pieces[16] = pieces[4];
	pieces[4] = hold2;
    }

    function MoveXBotCCW() {
	var hold1 = pieces[0];
	var hold2 = pieces[9];

	pieces[0] = pieces[18];
	pieces[18] = pieces[24];
	pieces[24] = pieces[6];
	pieces[6] = hold1;

	pieces[9] = pieces[21];
	pieces[21] = pieces[15];
	pieces[15] = pieces[3];
	pieces[3] = hold2;
    }

    function MoveYTopCCW() {
	var hold1 = pieces[0];
	var hold2 = pieces[1];

	pieces[0] = pieces[18];
	pieces[18] = pieces[20];
	pieces[20] = pieces[2];
	pieces[2] = hold1;

	pieces[1] = pieces[9];
	pieces[9] = pieces[19];
	pieces[19] = pieces[11];
	pieces[11] = hold2;

    }

    function MoveYMidCCW() {
	var hold1 = pieces[3];
	var hold2 = pieces[4];

	pieces[3] = pieces[21];
	pieces[21] = pieces[23];
	pieces[23] = pieces[5];
	pieces[5] = hold1;

	pieces[4] = pieces[12];
	pieces[12] = pieces[22];
	pieces[22] = pieces[14];
	pieces[14] = hold2;

    }

    function MoveYBotCCW() {
	var hold1 = pieces[6];
	var hold2 = pieces[7];

	pieces[6] = pieces[24];
	pieces[24] = pieces[26];
	pieces[26] = pieces[8];
	pieces[8] = hold1;

	pieces[7] = pieces[15];
	pieces[15] = pieces[25];
	pieces[25] = pieces[17];
	pieces[17] = hold2;

    }

    function MoveZTopCCW() {
	var hold1 = pieces[0];
	var hold2 = pieces[1];

	pieces[0] = pieces[2];
	pieces[2] = pieces[8];
	pieces[8] = pieces[6];
	pieces[6] = hold1;

	pieces[1] = pieces[5];
	pieces[5] = pieces[7];
	pieces[7] = pieces[3];
	pieces[3] = hold2;

    }

    function MoveZMidCCW() {
	var hold1 = pieces[9];
	var hold2 = pieces[10];

	pieces[9] = pieces[11];
	pieces[11] = pieces[17];
	pieces[17] = pieces[15];
	pieces[15] = hold1;

	pieces[10] = pieces[14];
	pieces[14] = pieces[16];
	pieces[16] = pieces[12];
	pieces[12] = hold2;

    }

    function MoveZBotCCW() {
	var hold1 = pieces[18];
	var hold2 = pieces[19];

	pieces[18] = pieces[20];
	pieces[20] = pieces[26];
	pieces[26] = pieces[24];
	pieces[24] = hold1;

	pieces[19] = pieces[23];
	pieces[23] = pieces[25];
	pieces[25] = pieces[21];
	pieces[21] = hold2;

    }

    function MoveXTopCW() {
	var hold1 = pieces[2];
	var hold2 = pieces[11];

	pieces[2] = pieces[8];
	pieces[8] = pieces[26];
	pieces[26] = pieces[20];
	pieces[20] = hold1;

	pieces[11] = pieces[5];
	pieces[5] = pieces[17];
	pieces[17] = pieces[23];
	pieces[23] = hold2;
    }

    function MoveXMidCW() {
	var hold1 = pieces[1];
	var hold2 = pieces[10];

	pieces[1] = pieces[7];
	pieces[7] = pieces[25];
	pieces[25] = pieces[19];
	pieces[19] = hold1;

	pieces[10] = pieces[4];
	pieces[4] = pieces[16];
	pieces[16] = pieces[22];
	pieces[22] = hold2;
    }

    function MoveXBotCW() {
	var hold1 = pieces[0];
	var hold2 = pieces[9];

	pieces[0] = pieces[6];
	pieces[6] = pieces[24];
	pieces[24] = pieces[18];
	pieces[18] = hold1;

	pieces[9] = pieces[3];
	pieces[3] = pieces[15];
	pieces[15] = pieces[21];
	pieces[21] = hold2;
    }

    function MoveYTopCW() {
	var hold1 = pieces[0];
	var hold2 = pieces[1];

	pieces[0] = pieces[2];
	pieces[2] = pieces[20];
	pieces[20] = pieces[18];
	pieces[18] = hold1;

	pieces[1] = pieces[11];
	pieces[11] = pieces[19];
	pieces[19] = pieces[9];
	pieces[9] = hold2;

    }

    function MoveYMidCW() {
	var hold1 = pieces[3];
	var hold2 = pieces[4];
	
	pieces[3] = pieces[5];
	pieces[5] = pieces[23];
	pieces[23] = pieces[21];
	pieces[21] = hold1;

	pieces[4] = pieces[14];
	pieces[14] = pieces[22];
	pieces[22] = pieces[12];
	pieces[12] = hold2;

    }

    function MoveYBotCW() {
	var hold1 = pieces[6];
	var hold2 = pieces[7];

	pieces[6] = pieces[8];
	pieces[8] = pieces[26];
	pieces[26] = pieces[24];
	pieces[24] = hold1;

	pieces[7] = pieces[17];
	pieces[17] = pieces[25];
	pieces[25] = pieces[15];
	pieces[15] = hold2;

    }

    function MoveZTopCW() {
	var hold1 = pieces[0];
	var hold2 = pieces[1];

	pieces[0] = pieces[6];
	pieces[6] = pieces[8];
	pieces[8] = pieces[2];
	pieces[2] = hold1;

	pieces[1] = pieces[3];
	pieces[3] = pieces[7];
	pieces[7] = pieces[5];
	pieces[5] = hold2;

    }

    function MoveZMidCW() {
	var hold1 = pieces[9];
	var hold2 = pieces[10];

	pieces[9] = pieces[15];
	pieces[15] = pieces[17];
	pieces[17] = pieces[11];
	pieces[11] = hold1;

	pieces[10] = pieces[12];
	pieces[12] = pieces[16];
	pieces[16] = pieces[14];
	pieces[14] = hold2;

    }

    function MoveZBotCW() {
	var hold1 = pieces[18];
	var hold2 = pieces[19];

	pieces[18] = pieces[24];
	pieces[24] = pieces[26];
	pieces[26] = pieces[20];
	pieces[20] = hold1;

	pieces[19] = pieces[21];
	pieces[21] = pieces[25];
	pieces[25] = pieces[23];
	pieces[23] = hold2;

    }
    
    function addmatrix (theta, tshape) {

	var total = [ 0, 0, 0 ];
	total[0] = parseFloat(theta[0]) + parseFloat(tshape[0]);
	total[1] = parseFloat(theta[1]) + parseFloat(tshape[1]);
	total[2] = parseFloat(theta[2]) + parseFloat(tshape[2]);

	return total;
	
    }
    
    function RotXTopCCW(a,pieces) {
	
	var p1 = pieces[2];
	var p2 = pieces[8];
	var p3 = pieces[26];
	var p4 = pieces[20];
	var p5 = pieces[11];
	var p6 = pieces[5];
	var p7 = pieces[17];
	var p8 = pieces[23];
	var p9 = pieces[14];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;

	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateX(a);
	    
	}

    }

    function RotXMidCCW(a,pieces) {

	var p1 = pieces[1];
	var p2 = pieces[7];
	var p3 = pieces[25];
	var p4 = pieces[19];
	var p5 = pieces[10];
	var p6 = pieces[4];
	var p7 = pieces[16];
	var p8 = pieces[22];
	var p9 = pieces[13];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateX(a);
	    
	}

    }

    function RotXBotCCW(a,pieces) {

	var p1 = pieces[0];
	var p2 = pieces[6];
	var p3 = pieces[24];
	var p4 = pieces[18];
	var p5 = pieces[9];
	var p6 = pieces[3];
	var p7 = pieces[15];
	var p8 = pieces[21];
	var p9 = pieces[12];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateX(a);
	    
	}

    }

    function RotYTopCCW(a,pieces) {

	var p1 = pieces[0];
	var p2 = pieces[2];
	var p3 = pieces[20];
	var p4 = pieces[18];
	var p5 = pieces[1];
	var p6 = pieces[11];
	var p7 = pieces[19];
	var p8 = pieces[9];
	var p9 = pieces[10];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateY(a);
	    
	}
	
    }

    function RotYMidCCW(a,pieces) {

	var p1 = pieces[3];
	var p2 = pieces[5];
	var p3 = pieces[23];
	var p4 = pieces[21];
	var p5 = pieces[4];
	var p6 = pieces[14];
	var p7 = pieces[22];
	var p8 = pieces[12];
	var p9 = pieces[13];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateY(a);
	    
	}
	
    }

    function RotYBotCCW(a,pieces) {

	var p1 = pieces[6];
	var p2 = pieces[8];
	var p3 = pieces[26];
	var p4 = pieces[24];
	var p5 = pieces[7];
	var p6 = pieces[17];
	var p7 = pieces[25];
	var p8 = pieces[15];
	var p9 = pieces[16];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateY(a);
	    
	}
	
    }

    function RotZTopCCW(a) {

	var p1 = pieces[0];
	var p2 = pieces[6];
	var p3 = pieces[8];
	var p4 = pieces[2];
	var p5 = pieces[1];
	var p6 = pieces[3];
	var p7 = pieces[7];
	var p8 = pieces[5];
	var p9 = pieces[4];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateZ(a);
	    
	}
	
    }

    function RotZMidCCW(a,pieces) {

	var p1 = pieces[9];
	var p2 = pieces[15];
	var p3 = pieces[17];
	var p4 = pieces[11];
	var p5 = pieces[10];
	var p6 = pieces[12];
	var p7 = pieces[16];
	var p8 = pieces[14];
	var p9 = pieces[13];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateZ(a);
	    
	}
	
    }

    function RotZBotCCW(a,pieces) {

	var p1 = pieces[18];
	var p2 = pieces[24];
	var p3 = pieces[26];
	var p4 = pieces[20];
	var p5 = pieces[19];
	var p6 = pieces[21];
	var p7 = pieces[25];
	var p8 = pieces[23];
	var p9 = pieces[22];

	var changelist = new Array(
	    p1, p2, p3, p4, p5, p6, p7, p8, p9
	);

	var i;
	
	for (i = 0; i < changelist.length; i++) {

	    thetamlist[changelist[i]] = rotateZ(a);
	    
	}
	
    }

    function ChooseR(a,rmode) {

	//var a = 5;

	if (rmode == 0){
	    RotXTopCCW(a,pieces);
	}
	else if (rmode == 1){
	    RotXMidCCW(a,pieces);
	}
	else if (rmode == 2){
	    RotXBotCCW(a,pieces);
	}
	else if (rmode == 3){
	    RotYTopCCW(a,pieces);
	}
	else if (rmode == 4){
	    RotYMidCCW(a,pieces);
	}
	else if (rmode == 5){
	    RotYBotCCW(a,pieces);
	}
	else if (rmode == 6){
	    RotZTopCCW(a,pieces);
	}
	else if (rmode == 7){
	    RotZMidCCW(a,pieces);
	}
	else if (rmode == 8){
	    RotZBotCCW(a,pieces);
	}
	else if (rmode == 9){
	    RotXTopCCW(-a,pieces);
	}
	else if (rmode == 10){
	    RotXMidCCW(-a,pieces);
	}
	else if (rmode == 11){
	    RotXBotCCW(-a,pieces);
	}
	else if (rmode == 12){
	    RotYTopCCW(-a,pieces);
	}
	else if (rmode == 13){
	    RotYMidCCW(-a,pieces);
	}
	else if (rmode == 14){
	    RotYBotCCW(-a,pieces);
	}
	else if (rmode == 15){
	    RotZTopCCW(-a,pieces);
	}
	else if (rmode == 16){
	    RotZMidCCW(-a,pieces);
	}
	else if (rmode == 17){
	    RotZBotCCW(-a,pieces);
	}
	
    }

    function resetrot() {

	//console.log("before thetalist reset");
	var i;
	for (i = 0; i < thetamlist.length; i++){
	    thetamlist[i] = rotateX(0);
	}

	//console.log(thetamlist);
	//console.log(thetalist);
	//console.log("after thetalist reset");
	
    }
				
    function render() {
 
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	xSlide = document.getElementById( "xSlider" ).value;
	ySlide = document.getElementById( "ySlider" ).value;
	zSlide = document.getElementById( "zSlider" ).value;

	theta = [xSlide, ySlide, zSlide];

	
	
	if (rotc < 18 && disabled) {

	    ChooseR(5,rmode);
	    
	    rotc++;
	}
	else if (rotc < 6 && scrambled) {

	    ChooseR(15,sArray[0]);

	    rotc++;
	    
	}
	else if (scrambled) {

	    ChooseMove(sArray[0]);
	    rotc = 0;
	    resetrot(); //maybe can get away with using it only at end
	    sArray.shift();

	    if (sArray.length == 0){

		scrambled = false;
		enablebuts();
		resetrot();
		
	    }
	    
	}
	else if (disabled) {
	    rotc = 0;
	    disabled = false;
	    enablebuts();
	    resetrot();
	}
	
	//var thc = 0;

	/*
	while (thc < 27) {
	    
	    //thetalist[thc][axis] += 2.0;
	    
	    thetalist[thc][0] = xSlide;
	    thetalist[thc][1] = ySlide;
	    thetalist[thc][2] = zSlide;

	    thc++;
	}
	*/

	var bufc = 0;

	while (bufc < 27) {

	    //may need to swap order, we'll see
	    //thetalist[bufc] = mult(thetalist[bufc], thetamlist[bufc]);
	    var tx = translist[bufc][0];
	    var ty = translist[bufc][1];
	    var tz = translist[bufc][2];
	    var transmat = translate( tx, ty, tz );
	    
	    //var model = thetalist[bufc]
	    var mproto = mult(thetamlist[bufc],thetalist[bufc]);
	    var model = mult(mproto,transmat);


	    thetalist[bufc] = mult(thetamlist[bufc], thetalist[bufc]);
	    //console.log(model)

	    //var total = addmatrix(theta, thetalist[bufc]);
	    //console.log(bufc)
	    //console.log(total)

	    //gl.uniform3fv(thetaLoc, total);

	    //fix this to account for CURRENT rotation
	    gl.uniform3fv(thetaLoc, theta);
	    gl.uniformMatrix4fv(modelLoc, false, flatten(model));
	    /*
	    gl.uniform3fv(thetaLoc, thetalist[bufc]);
	    
	    gl.uniform3fv(thetaLocV, theta);
	    gl.uniform3fv(thetaLocM, thetamlist[bufc]);
	    gl.uniform3fv(transLoc, translist[bufc]);
	    */

	    gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[bufc]);
	    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[bufc]);
	    gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[bufc]);

	    gl.drawElements(gl.TRIANGLES, NumVertices, gl.UNSIGNED_BYTE, 0);

	    bufc++;
	    
	}
	
	/*
	gl.uniform3fv(thetaLoc, theta);
	gl.uniform3fv(transLoc, trans);

	
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer1);
	

		
	gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[0]);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[0]);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[0]);
	

	// Do the drawing
	gl.drawElements(gl.TRIANGLES, NumVertices, gl.UNSIGNED_BYTE, 0);
	
	
	gl.uniform3fv(thetaLoc, theta2);
	gl.uniform3fv(transLoc, trans2);
	
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer2);
	

	gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[1]);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[1]);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[1]);
	  
	// Do the drawing
	gl.drawElements(gl.TRIANGLES, NumVertices, gl.UNSIGNED_BYTE, 0);
	*/
	
	
	requestAnimFrame( render );
	
    }
    
    render();
    
}


    

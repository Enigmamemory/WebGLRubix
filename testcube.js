"use strict";

var canvas;
var gl;

var NumVertices = 36;

var points = []
var points2 = [];

var colors = [];
var colors2 = []; //may not be necessary

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var vbufList = [];
var cbufList = [];
var ibufList = [];

var axis = 0;

var thetalist = new Array(

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

var theta = [ 0, 0, 0 ];
var theta2 = [ 0, 0, 0 ];

var tc = 0.21;

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
var transLoc;

/* =================== DATA =================*/

var vd = 0.1

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

    function render() {
 
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var thc = 0;

	while (thc < 27) {

	    thetalist[thc][axis] += 2.0;
	    thc++;
	    
	}

	var bufc = 0;

	while (bufc < 27) {

	    gl.uniform3fv(thetaLoc, thetalist[bufc]);
	    gl.uniform3fv(transLoc, translist[bufc]);

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


    

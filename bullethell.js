"use strict";

var canvas;
var gl;

var vbufList = [];
var cbufList = [];
var ibufList = [];

var theta = [0,0,0];

var thetaLoc;
var modelLoc;
var modelLoc2;

/*========================== DATA ============================*/

//player variables

var vd = 0.03

var pTranslate = [0,0,0];
var pHitbox = [0,0.5*vd,0]; //x, y, sphere radius

var pRCurrent = mat4(1,0,0,0,
		     0,1,0,0,
		     0,0,1,0,
		     0,0,0,1);

var pRNew = mat4(1,0,0,0,
		 0,1,0,0,
		 0,0,1,0,
		 0,0,0,1);

var pNumVertices = 54;

//keys represent shift, space, left, up, right, down
var pKeys = [false, false, false, false, false, false];
var pMove = 0.03;

var vPlayer = [

    //cockpit back
    vec3( -vd,  0,  2*vd ),
    vec3(  vd,  0,  2*vd ),
    vec3(  vd,  0,  0 ),
    vec3( -vd,  0,  0 ),

    //cockpit front
    vec3( -vd,  0,  2*vd ),
    vec3( -vd,  2*vd,  0 ),
    vec3(  vd,  2*vd,  0 ),
    vec3(  vd,  0,  2*vd ),

    //cockpit left
    vec3( -vd,  0,  2*vd ),
    vec3( -vd,  2*vd,  0 ),
    vec3( -vd,  0,  0 ),

    //cockpit right
    vec3(  vd,  0,  2*vd ),
    vec3(  vd,  2*vd,  0 ),
    vec3(  vd,  0,  0 ),

    //under cockpit
    vec3( -vd,  0,  0 ),
    vec3( -vd,  2*vd, -2*vd ),
    vec3(  vd,  2*vd, -2*vd ),
    vec3(  vd,  0,  0 ),

    //left wing top
    vec3( -vd,  0,  0 ),
    vec3( -3*vd,  2*vd,  0),
    vec3( -vd,  2*vd,  0 ),

    //left wing front
    vec3( -vd,  2*vd,  0),
    vec3( -vd,  2*vd, -2*vd),
    vec3( -3*vd,  2*vd,  0),

    //left wing back
    vec3( -vd,  0,  0),
    vec3( -vd,  2*vd, -2*vd),
    vec3( -3*vd,  2*vd,  0),

    //right wing top
    vec3(  vd,  0,  0 ),
    vec3(  3*vd,  2*vd,  0),
    vec3(  vd,  2*vd,  0 ),

    //right wing front
    vec3(  vd,  2*vd,  0),
    vec3(  vd,  2*vd, -2*vd),
    vec3(  3*vd,  2*vd,  0),

    //right wing back
    vec3(  vd,  0,  0),
    vec3(  vd,  2*vd, -2*vd),
    vec3(  3*vd,  2*vd,  0),

    //front bottom
    vec3(  0,  6*vd,  0),
    vec3( -vd,  2*vd, -2*vd),
    vec3(  vd,  2*vd, -2*vd),

    //front left
    vec3(  0,  6*vd,  0),
    vec3( -vd,  2*vd,  0),
    vec3( -vd,  2*vd, -2*vd),
    
    //front right
    vec3(  0,  6*vd,  0),
    vec3(  vd,  2*vd,  0),
    vec3(  vd,  2*vd, -2*vd),

    //front top
    vec3(  0,  6*vd,  0),
    vec3(  vd,  2*vd,  0),
    vec3( -vd,  2*vd,  0)
    
];

var cPlayer = [

    //cockpit back
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan

    //cockpit front
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan

    //cockpit left
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan

    //cockpit right
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan

    //under cockpit
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //left wing top
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //left wing front
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //left wing back
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //right wing top
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //right wing front
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //right wing back
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //front bottom
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //front left
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    
    //front right
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),
    vec4( 0.7, 0.7, 0.7, 1.0 ),

    //front top
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 )  // yellow
    
];

var iPlayer = [

    //cockpit back
    0, 1, 2,
    2, 3, 0,

    //cockpit front
    4, 5, 6,
    6, 7, 4,
    
    //cockpit left
    8, 9, 10,
    
    //cockpit right
    11, 12, 13,

    //under cockpit
    14, 15, 16,
    16, 17, 14,
    
    //left wing top
    18, 19, 20,

    //left wing front
    21, 22, 23,
    
    //left wing back
    24, 25, 26,
    
    //right wing top
    27, 28, 29,
    
    //right wing front
    30, 31, 32,

    //right wing back
    33, 34, 35,

    //front bottom
    36, 37, 38,

    //front left
    39, 40, 41,

    //front right
    42, 43, 44,

    //front top
    45, 46, 47
   
];

//player bullet variables


var vd2 = 0.03;

var pbNumVertices = 12;

var firedef = 3;
var firerate = firedef;
var firespeed = 0.05
var firedam = 1;


var pbActivate = new Array(50);
var pbSize = pbActivate.length;

var pbTranslate = new Array(pbSize);
var pbHitbox = new Array(pbSize);

var pbRCurrent = new Array(pbSize);
var pbRNew = new Array(pbSize);

var pbStart = 1;

var vPBullet = [

    //top right
    vec3(0, 2*vd2, 0),
    vec3(vd2, 0, 0),
    vec3(0, vd2, vd2),

    //top left
    vec3(0, 2*vd2, 0),
    vec3(-vd2, 0, 0),
    vec3(0, vd2, vd2),

    //bottom right
    vec3(0, 2*vd2, 0),
    vec3(vd2, 0, 0),
    vec3(0, vd2, -vd2),
    
    //bottom left
    vec3(0, 2*vd2, 0),
    vec3(-vd2, 0, 0),
    vec3(0, vd2, -vd2)
    
];

var cPBullet = [

    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green
    
    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green

    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green

    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0), //light green
    vec4(0.2, 1.0, 0.2, 1.0) //light green
    
];

var iPBullet = [

    0, 1, 2,

    3, 4, 5,

    6, 7, 8,

    9, 10, 11
    
    
];

/*=======================Enemy Ship Info=====================*/

var vd3 = 0.05;

var eActivate = new Array(20);
var eSize = eActivate.length;

var ePath = new Array(eSize);
var eHealth = new Array(eSize);
var eType = new Array(eSize);

var eTranslate = new Array(eSize);
var eHitbox = new Array(eSize);

var eRCurrent = new Array(eSize);
var eRNew = new Array(eSize);

var eStart = 1 + pbSize;

var eNumVertices = 30;

var vEnemy = [

    //hull top
    vec3(0,0,0),
    vec3(-2*vd3, 3*vd3, 0),
    vec3(2*vd3, 3*vd3, 0),

    //hull left
    vec3(0,0,0),
    vec3(0,3*vd3, -vd3),
    vec3(-2*vd3, 3*vd3, 0),

    //hull right
    vec3(0,0,0),
    vec3(0,3*vd3, -vd3),
    vec3(2*vd3, 3*vd3, 0),

    //hull back
    vec3(-2*vd3, 3*vd3, 0),
    vec3(2*vd3, 3*vd3, 0),
    vec3(0, 3*vd3, -vd3),

    //cockpit front
    vec3(0.5*vd3, 3*vd3, vd3),
    vec3(-0.5*vd3, 3*vd3, vd3),
    vec3(-0.5*vd3, 2*vd3, 0),
    vec3(0.5*vd3, 2*vd3, 0),

    //cockpit back
    vec3(0.5*vd3, 3*vd3, vd3),
    vec3(-0.5*vd3, 3*vd3, vd3),
    vec3(-0.5*vd3, 3*vd3, 0),
    vec3(0.5*vd3, 3*vd3, 0),

    //cockpit left
    vec3(-0.5*vd3, 3*vd3, vd3),
    vec3(-0.5*vd3, 2*vd3, 0),
    vec3(-0.5*vd3, 3*vd3, 0),

    //cockpit right
    vec3(0.5*vd3, 3*vd3, vd3),
    vec3(0.5*vd3, 2*vd3, 0),
    vec3(0.5*vd3, 3*vd3, 0)

];

var cEnemy1 = [

    //hull top
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),

    //hull left
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),

    //hull right
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),

    //hull back
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),
    vec4(0.8, 0.4, 0.8, 1.0),

    //cockpit front
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),

    //cockpit back
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),

    //cockpit left
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),

    //cockpit right
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0)

];

var iEnemy = [

    //hull top
    0, 1, 2,

    //hull left
    3, 4, 5,

    //hull right
    6, 7, 8,
    
    //hull back
    9, 10, 11, 

    //cockpit front
    12, 13, 14,
    14, 15, 12,

    //cockpit back
    16, 17, 18,
    18, 19, 16,

    //cockpit left
    20, 21, 22,

    //cockpit right
    23, 24, 25,

];



window.onload = function init()
{

    /*========= SET UP CANVAS ============*/
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.3, 0.3, 0.3, 1.0 );
    
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
    modelLoc2 = gl.getUniformLocation(program, "model");

    /*================= PUT DATA INTO BUFFERS =====================*/
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vPlayer), gl.STATIC_DRAW );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cPlayer), gl.STATIC_DRAW );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iPlayer), gl.STATIC_DRAW);

    vbufList.push(vBuffer);
    cbufList.push(cBuffer);
    ibufList.push(iBuffer);

    var pbCount = 0;

    while (pbCount < pbSize) {

	var pbVBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, pbVBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vPBullet), gl.STATIC_DRAW );

	var pbCBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, pbCBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cPBullet), gl.STATIC_DRAW );

	var pbIBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pbIBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iPBullet), gl.STATIC_DRAW);

	vbufList.push(pbVBuffer);
	cbufList.push(pbCBuffer);
	ibufList.push(pbIBuffer);

	pbCount += 1;
	
    }

    var eCount = 0;

    while (eCount < eSize) {

	var eVBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, eVBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vEnemy), gl.STATIC_DRAW );
	
	var eCBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, eCBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cEnemy1), gl.STATIC_DRAW );
	
	var eIBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eIBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iEnemy), gl.STATIC_DRAW);

	vbufList.push(eVBuffer);
	cbufList.push(eCBuffer);
	ibufList.push(eIBuffer);
	
	eCount += 1;
    }

    /*=====================Javascript Functions============*/

    document.onkeydown = function() {

	var key = key || window.event;

	if (key.keyCode == '16') {
	    pKeys[0] = true;
	}
	if (key.keyCode == '32') {
	    pKeys[1] = true;
	}
	if (key.keyCode == '37') {
	    pKeys[2] = true;
	}
	if (key.keyCode == '38') {
	    pKeys[3] = true;
	}
	if (key.keyCode == '39') {
	    pKeys[4] = true;
	}
	if (key.keyCode == '40') {
	    pKeys[5] = true;
	}
	
    };

    document.onkeyup = function() {

	var key = key || window.event;

	if (key.keyCode == '16') {
	    pKeys[0] = false;
	}
	if (key.keyCode == '32') {
	    pKeys[1] = false;
	}
	if (key.keyCode == '37') {
	    pKeys[2] = false;
	}
	if (key.keyCode == '38') {
	    pKeys[3] = false;
	}
	if (key.keyCode == '39') {
	    pKeys[4] = false;
	}
	if (key.keyCode == '40') {
	    pKeys[5] = false;
	}
	
    };

    function setpTranslate() {

	var move = pMove;
	
	if (pKeys[0]) {
	    move = pMove*0.5
	}

	
	if (pKeys[1]) {

	    
	    if (firerate <= 0) {
		firerate = firedef;
	    }
	    if (firerate == firedef) { //fire bullet, therefore create bullet

		var pbCheck = 0;
		
		while (pbCheck < pbSize) {

		    if (pbActivate[pbCheck] == undefined || pbActivate[pbCheck] == false)
		    {
			pbActivate[pbCheck] = true

			var pbStart = [pTranslate[0], pTranslate[1] + 6*vd, pTranslate[2]];
			pbTranslate[pbCheck] = pbStart;

			var pbHit = [pbTranslate[pbCheck][0], pbTranslate[pbCheck][1], vd2];
			pbHitbox[pbCheck] = pbHit;
			
			pbRCurrent[pbCheck] = mat4(1,0,0,0,
						   0,1,0,0,
						   0,0,1,0,
						   0,0,0,1);
			pbRNew[pbCheck] = mat4(1,0,0,0,
					       0,1,0,0,
					       0,0,1,0,
					       0,0,0,1);
			
			break;
		    }
		    
		    pbCheck += 1;
		}
		
	    }
	    
	    firerate -= 1;
	}
	
	
	if (pKeys[2]) {
	    if (pTranslate[0] > -1+vd) {
		pTranslate[0] -= move;
	    }
	}
	if (pKeys[3]) {
	    if (pTranslate[1] < 1-2*vd) {
		pTranslate[1] += move;
	    }
	}
	if (pKeys[4]) {
	    if (pTranslate[0] < 1-vd) {
		pTranslate[0] += move;
	    }
	}
	if (pKeys[5]) {
	    if (pTranslate[1] > -1) {
		pTranslate[1] -= move;
	    }
	}
	    
	
    };

    function delPBullets() {

	var pbBuf = 0;

	while (pbBuf < pbSize) {

	    if (pbActivate[pbBuf]) {

		if (pbTranslate[pbBuf][1] > 1.05) {

		    pbActivate[pbBuf] = false;
		    
		}
		
	    }

	    pbBuf += 1;
	    
	}
	
    }

    function createEnemy(start, zang, path, type) { //add rank later

	var eBuf = 0;

	if (type = 1) { //deal with types sometime later
	    var eBuf = 0;
	}
	if (type = 2) {
	    var eBuf = 0;
	}
	
	while (eBuf < eSize) {

	    if (eActivate[eBuf] == undefined || eActivate[eBuf] == false)
	    {
		eActivate[eBuf] = true;

		eTranslate[eBuf] = start;
		var eHit = [start[0], start[1] + 1.5*vd3, 1.2*vd3];
		eHitbox[eBuf] = eHit;

		eHealth[eBuf] = 5;
		
		eRCurrent[eBuf] = rotateZ(zang);
		
		ePath[eBuf] = path;
		eType[eBuf] = type;

		break;
	    }

	    eBuf += 1;

	}
	
    }

    function EnemyPathMove(eBuf) {
	
	var epType = ePath[eBuf][0];

	var epx = 0;
	var epy = 0;

	if (epType == 0) {
	    
	    epx = ePath[eBuf][1];
	    epy = ePath[eBuf][2];

	}
	    
	else if (epType == 1) {

	    epx = ePath[eBuf][4];
	    var movex = ePath[eBuf][3];
	    epy = ePath[eBuf][1] * movex * (movex - ePath[eBuf][2]);

	    ePath[eBuf][3] += ePath[eBuf][4]
    
	}
	
	var ex = eTranslate[eBuf][0];
	var ey = eTranslate[eBuf][1];
	var ez = eTranslate[eBuf][2];
	    
	eTranslate[eBuf] = [ex + epx, ey + epy, ez];

    }

    function ChangePathTo(tarray, eBuf) {

	ePath[eBuf] = tarray;
	
    }

    function delEnemy() {

	var eBuf = 0;

	while (eBuf < eSize) {

	    if (eActivate[eBuf]) {

		var ex = eTranslate[eBuf][0];
		var ey = eTranslate[eBuf][1];

		if (ex > 1.10 || ex < -1.10 || ey > 1.10 || ey < -1.10) {

		    eActivate[eBuf] = false;
		    
		}
		
	    }
	    
	    eBuf += 1;
	    
	}
	
    }

    function pBulletVSEnemy() {

	var pbBuf = 0;
	var eBuf = 0;

	while (pbBuf < pbSize) {

	    if (pbActivate[pbBuf]) {

		while (eBuf < eSize) {
		    
		    if (eActivate[eBuf]) {

			var pbx = pbHitbox[pbBuf][0];
			var ex = eHitbox[eBuf][0];
			var pby = pbHitbox[pbBuf][1];
			var ey = eHitbox[eBuf][1];

			var xd = pbx - ex;
			var yd = pby - ey;

			var dist = Math.sqrt( xd*xd + yd*yd );

			var hitd = pbHitbox[pbBuf][2] + eHitbox[eBuf][2];

			//console.log(dist);
			//console.log(hitd);
			
			if (Math.max(dist, hitd) == hitd) {

			    eHealth[eBuf] -= firedam;
			    if (eHealth[eBuf] < 0) {
				eActivate[eBuf] = false;	
			    }

			    pbActivate[pbBuf] = false;

			    break;
			    
			}
			
		    }
		    
		    eBuf += 1;
		    
		}
		
		eBuf = 0;
		
	    }

	    pbBuf += 1;
	    
	}
	
    }
    
    var makeone = false;
    
    function render() {

	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	setpTranslate();

	var playerx = pTranslate[0];
	var playery = pTranslate[1];
	var playerz = pTranslate[2];
	var playertm = translate( playerx, playery, playerz);

	pRNew = rotateY(2);
	
	var pRotate = mult(pRNew, pRCurrent);
	var pModel = mult(playertm, pRotate);

	//pRCurrent = mult(pRNew, pRCurrent);
	pRCurrent = pRotate;

	gl.uniform3fv(thetaLoc, theta);
	gl.uniformMatrix4fv(modelLoc, false, flatten(pModel));

	gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[0]);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[0]);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[0]);
	
	gl.drawElements(gl.TRIANGLES, pNumVertices, gl.UNSIGNED_BYTE, 0);

	if (makeone == false) {

	    createEnemy([0,0.5,0], 0, [0, -0.01, 0], 0);
	    createEnemy([0.5,0.5,0], 0, [1, 0.25, -0.5, -0.01, -0.01], 0);
	    makeone = true;
	    
	}
	
	var pbBuf = 0;

	while (pbBuf < pbSize) {

	    if (pbActivate[pbBuf]) {

		var pbx = pbTranslate[pbBuf][0];
		var pby = pbTranslate[pbBuf][1];
		var pbz = pbTranslate[pbBuf][2];
		var pbtm = translate( pbx, pby, pbz);

		pbTranslate[pbBuf] = [pbx, pby + firespeed, pbz];
		pbHitbox[pbBuf][0] = pbx;
		pbHitbox[pbBuf][1] = pby;
	    
		pbRNew[pbBuf] = rotateY(10);
		
		var pbRotate = mult(pbRNew[pbBuf], pbRCurrent[pbBuf]);
		var pbModel = mult(pbtm, pbRotate);

		pbRCurrent[pbBuf] = pbRotate;
		
		gl.uniform3fv(thetaLoc, theta);
		gl.uniformMatrix4fv(modelLoc, false, flatten(pbModel));

		gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[pbStart + pbBuf]);
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[pbStart + pbBuf]);
		gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[pbStart + pbBuf]);
		
		gl.drawElements(gl.TRIANGLES, pbNumVertices, gl.UNSIGNED_BYTE, 0);
		
	    }

	    pbBuf += 1
	    
	}

	var eBuf = 0;

	while (eBuf < pbSize) {

	    if (eActivate[eBuf]) {

		//replace this translation section with translation functions based on the path type
		var ex = eTranslate[eBuf][0];
		var ey = eTranslate[eBuf][1];
		var ez = eTranslate[eBuf][2];
		eHitbox[eBuf][0] = ex;
		eHitbox[eBuf][1] = ey;
		
		var etm = translate( ex, ey, ez);

		eTranslate[eBuf] = [ex, ey, ez];

		EnemyPathMove(eBuf);

		//for testing purposes
		eRNew[eBuf] = rotateY(2);
		
		var eRotate = mult(eRNew[eBuf], eRCurrent[eBuf]);
		var eModel = mult(etm, eRotate);

		eRCurrent[eBuf] = eRotate;
		
		gl.uniform3fv(thetaLoc, theta);
		gl.uniformMatrix4fv(modelLoc, false, flatten(eModel));

		gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[eStart + eBuf]);
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[eStart + eBuf]);
		gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[eStart + eBuf]);
		
		gl.drawElements(gl.TRIANGLES, eNumVertices, gl.UNSIGNED_BYTE, 0);
		
	    }

	    eBuf += 1
	    
	}

	pBulletVSEnemy();

	delPBullets();
	delEnemy();

	requestAnimFrame( render );
    }

    render();
    
}

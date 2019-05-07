"use strict";

var canvas;
var gl;

var vbufList = [];
var cbufList = [];
var ibufList = [];
var tbufList = [];

var theta = [0,0,0];

var thetaLoc;
var modelLoc;
var modelLoc2;
var textLoc;

/*========================== DATA ============================*/

//background texture variables

var vd0 = 0.99;

var txTranslate = [0, 0, -1];

var txRCurrent = mat4(1,0,0,0,
		      0,1,0,0,
		      0,0,1,0,
		      0,0,0,1);

var txRNew = mat4(1,0,0,0,
		  0,1,0,0,
		  0,0,1,0,
		  0,0,0,1);

var txNumVertices = 6;

var vTexture = [

    vec3(-vd0, vd0, -vd0),
    vec3(vd0, vd0, -vd0),
    vec3(vd0, -vd0, -vd0),
    vec3(-vd0, -vd0, -vd0)
    
];

var cTexture = [

    vec4(1,1,1,1),
    vec4(1,1,1,1),
    vec4(1,1,1,1),
    vec4(1,1,1,1)
    
];

var iTexture = [

    0,1,2,
    2,3,0
    
];

var tTexture = [

    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1)
    
];


//player variables

var vd = 0.03

var pTranslate = [0,-0.8,0];
var pHitbox = [0,0.5*vd-0.8,vd*0.5]; //x, y, sphere radius

var pHealth = 3;

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
var pMove = 0.15;

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

var tPlayer = [

    //cockpit back
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),
    
    //cockpit front
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //cockpit left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //cockpit right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //under cockpit
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),
    
    //left wing top
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //left wing front
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //left wing back
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //right wing top
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    
    //right wing front
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //right wing back
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //front bottom
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //front left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    
    //front right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    
    //front top
    vec2(0,0),
    vec2(1,0),
    vec2(1,1)
    
];

//player bullet variables


var vd2 = 0.03;

var pbNumVertices = 12;

var firedef = 3;
var firerate = firedef;
var firespeed = 0.3
var firedam = 1;


var pbActivate = new Array(20);
var pbSize = pbActivate.length;

var pbTranslate = new Array(pbSize);
var pbHitbox = new Array(pbSize);

var pbRCurrent = new Array(pbSize);
var pbRNew = new Array(pbSize);

var pbStart = 2;

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

var tPBullet = [

    //top right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //top left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //bottom right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    
    //bottom left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1)
    
];

/*=======================Enemy Ship Info=====================*/

var vd3 = 0.05;

var eActivate = new Array(11);
var eSize = eActivate.length;

var ePath = new Array(eSize);
var eHealth = new Array(eSize);
var eType = new Array(eSize);

var eTranslate = new Array(eSize);
var eHitbox = new Array(eSize);
var eSpawn = new Array(eSize);

var eRCurrent = new Array(eSize);
var eRNew = new Array(eSize);

var eStart = 2 + pbSize;

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

var cEnemy2 = [

    //hull top
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),

    //hull left
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),

    //hull right
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),

    //hull back
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),
    vec4(0.6, 0.1, 0.8, 1.0),

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

var tEnemy = [

    //hull top
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //hull left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //hull right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //hull back
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //cockpit front
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //cockpit back
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //cockpit left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),

    //cockpit right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1)
    
];

var vd4 = 0.03;

var ebNumVertices = 36;

var ebActivate = new Array(100);
var ebSize = eActivate.length;

var ebPath = new Array(eSize);
var ebType = new Array(eSize);

var ebTranslate = new Array(eSize);
var ebHitbox = new Array(eSize);
var ebSpawn = new Array(eSize);

var ebRCurrent = new Array(eSize);
var ebRNew = new Array(eSize);

var ebStart = 2 + pbSize + eSize;

var vEBullet = [

    //front
    vec3( -vd4, -vd4,  vd4 ),
    vec3( -vd4,  vd4,  vd4 ),
    vec3(  vd4,  vd4,  vd4 ),
    vec3(  vd4, -vd4,  vd4 ),

    //right
    vec3(  vd4,  vd4,  vd4 ),
    vec3(  vd4, -vd4,  vd4 ),
    vec3(  vd4, -vd4, -vd4 ),
    vec3(  vd4,  vd4, -vd4 ),

    //bottom
    vec3(  vd4, -vd4,  vd4 ),
    vec3( -vd4, -vd4,  vd4 ),
    vec3( -vd4, -vd4, -vd4 ),
    vec3(  vd4, -vd4, -vd4 ),

    //top
    vec3(  vd4,  vd4, -vd4 ),
    vec3( -vd4,  vd4, -vd4 ),
    vec3( -vd4,  vd4,  vd4 ),
    vec3(  vd4,  vd4,  vd4 ),

    //back
    vec3( -vd4, -vd4, -vd4 ),
    vec3( -vd4,  vd4, -vd4 ),
    vec3(  vd4,  vd4, -vd4 ),
    vec3(  vd4, -vd4, -vd4 ),

    //left
    vec3( -vd4,  vd4, -vd4 ),
    vec3( -vd4, -vd4, -vd4 ),
    vec3( -vd4, -vd4,  vd4 ),
    vec3( -vd4,  vd4,  vd4 )
      
];

var cEBullet = [
    
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange

    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange

    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange

    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange

    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange

    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 0.5, 0.0, 1.0 )  // orange
    
];


var iEBullet = [

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

var tEBullet = [

   //front
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //right
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //bottom
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //top
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //back
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1),

    //left
    vec2(0,0),
    vec2(1,0),
    vec2(1,1),
    vec2(0,1)
    
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

    /*========= INITIALIZE TEXTURES ==========================*/

    var whitetexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, whitetexture);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
		  new Uint8Array([255, 255, 255, 255]));

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
		  new Uint8Array([255, 255, 255, 255]));

    var image = new Image();
    image.crossOrigin = "";
    image.src = "https://i.imgur.com/QBiAnIf.jpg";
    image.addEventListener('load', function()
			   {
			      
			       gl.bindTexture(gl.TEXTURE_2D, texture);
			       gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
			       gl.generateMipmap(gl.TEXTURE_2D);
			       
			   }

			  );
    
    /*========= PASS POSITION OF VERTEX SHADERS =============*/

    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vTexcoord = gl.getAttribLocation( program, "a_texcoord");
    gl.vertexAttribPointer( vTexcoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexcoord );

    // matrix uniform

    thetaLoc = gl.getUniformLocation(program, "theta");
    modelLoc = gl.getUniformLocation(program, "model");
    modelLoc2 = gl.getUniformLocation(program, "model");
    textLoc = gl.getUniformLocation(program, "u_texture");

    /*================= PUT DATA INTO BUFFERS =====================*/

    var tVBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tVBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vTexture), gl.STATIC_DRAW );

    var tCBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tCBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cTexture), gl.STATIC_DRAW );

    var tIBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iTexture), gl.STATIC_DRAW);

    var tTBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tTBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(tTexture), gl.STATIC_DRAW );

    vbufList.push(tVBuffer);
    cbufList.push(tCBuffer);
    ibufList.push(tIBuffer);
    tbufList.push(tTBuffer);
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vPlayer), gl.STATIC_DRAW );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cPlayer), gl.STATIC_DRAW );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iPlayer), gl.STATIC_DRAW);

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(tPlayer), gl.STATIC_DRAW );
    
    vbufList.push(vBuffer);
    cbufList.push(cBuffer);
    ibufList.push(iBuffer);
    tbufList.push(tBuffer);

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

	var pbTBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, pbTBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tPBullet), gl.STATIC_DRAW );

	vbufList.push(pbVBuffer);
	cbufList.push(pbCBuffer);
	ibufList.push(pbIBuffer);
	tbufList.push(pbTBuffer);
	
	pbCount += 1;
	
    }

    var eCount = 0;

    while (eCount < eSize) {

	var eVBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, eVBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vEnemy), gl.STATIC_DRAW );

	if (eCount < 10) {
	    var eCBuffer = gl.createBuffer();
	    gl.bindBuffer( gl.ARRAY_BUFFER, eCBuffer );
	    gl.bufferData( gl.ARRAY_BUFFER, flatten(cEnemy1), gl.STATIC_DRAW );
	}
	else {
	    var eCBuffer = gl.createBuffer();
	    gl.bindBuffer( gl.ARRAY_BUFFER, eCBuffer );
	    gl.bufferData( gl.ARRAY_BUFFER, flatten(cEnemy2), gl.STATIC_DRAW );
	}
	var eIBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eIBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iEnemy), gl.STATIC_DRAW);
	
	var eTBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, eTBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tEnemy), gl.STATIC_DRAW );

	vbufList.push(eVBuffer);
	cbufList.push(eCBuffer);
	ibufList.push(eIBuffer);
	tbufList.push(eTBuffer);
	
	eCount += 1;
    }

    var ebCount = 0;

    while (ebCount < ebSize) {

	var ebVBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, ebVBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vEBullet), gl.STATIC_DRAW );

	var ebCBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, ebCBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(cEBullet), gl.STATIC_DRAW );

	var ebIBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebIBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(iEBullet), gl.STATIC_DRAW);

	var ebTBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, ebTBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tEBullet), gl.STATIC_DRAW );

	vbufList.push(ebVBuffer);
	cbufList.push(ebCBuffer);
	ibufList.push(ebIBuffer);
	tbufList.push(ebTBuffer);
	
	ebCount += 1;
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

    function setpTranslate(timedif) {

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
		pTranslate[0] -= move*timedif;
		pHitbox[0] -= move*timedif;
	    }
	}
	if (pKeys[3]) {
	    if (pTranslate[1] < 1-2*vd) {
		pTranslate[1] += move*timedif;
		pHitbox[0] += move*timedif;
	    }
	}
	if (pKeys[4]) {
	    if (pTranslate[0] < 1-vd) {
		pTranslate[0] += move*timedif;
		pHitbox[0] += move*timedif;
	    }
	}
	if (pKeys[5]) {
	    if (pTranslate[1] > -1) {
		pTranslate[1] -= move*timedif;
		pHitbox[0] -= move*timedif;
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

    function createEnemy(start, zang, path, type) { //add rank later, deal with angles later

	var eBuf = 0;

	if (type == 1) { //deal with types sometime later
	    var eBuf = 10;
	}
	if (type == 2) {
	    var eBuf = 0;
	}
	
	while (eBuf < eSize) {

	    if (eActivate[eBuf] == undefined || eActivate[eBuf] == false)
	    {
		eActivate[eBuf] = true;

		eTranslate[eBuf] = start;

		eSpawn[eBuf] = start;

		var eHit;

		if (type == 1) {

		    eHit = [start[0], start[1] + 1.5*3*vd3, 1.2*3*vd3];
		    eHitbox[eBuf] = eHit;

		    eHealth[eBuf] = 20;

		}
		else {

		    eHit = [start[0], start[1] + 1.5*vd3, 1.2*vd3];
		    eHitbox[eBuf] = eHit;

		    eHealth[eBuf] = 5;
		    
		}
		    

		
		eRCurrent[eBuf] = rotateZ(zang);
		
		ePath[eBuf] = path;
		eType[eBuf] = type;

		break;
	    }

	    eBuf += 1;

	}
	
    }

    function EnemyPathMove(eBuf, timedif) {
	
	var epType = ePath[eBuf][0];

	var epx = 0;
	var epy = 0;

	if (epType == 0) {
	    
	    epx = ePath[eBuf][1] * timedif;
	    epy = ePath[eBuf][2] * timedif;

	}
	    
	else if (epType == 1) {

	    epx = ePath[eBuf][4]*timedif;
	    //console.log(epx);
	    var movex = ePath[eBuf][3];
	    //console.log(movex);
	    epy = ePath[eBuf][1] * movex * (movex - ePath[eBuf][2]);
	    //console.log(epy);

	    ePath[eBuf][3] += epx;
    
	}

	var ex = eTranslate[eBuf][0];
	var ey = eTranslate[eBuf][1];
	var ez = eTranslate[eBuf][2];

	if (epType == 1) {

	    ey = eSpawn[eBuf][1];
	    
	}

	eTranslate[eBuf] = [ex + epx, ey + epy, ez];
	eHitbox[eBuf][0] = ex + epx;
	eHitbox[eBuf][1] = ey + epy + 2*vd3;

	if (epType == 1) {

	    eHitbox[eBuf][1] = ey + epy + 2*3*vd3;
	    
	}

	/*
	if (epType == 1) {
	    console.log(eTranslate[eBuf]);
	}
	*/

    }

    function ChangeEnemyPathTo(tarray, eBuf) {

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

    function createEBullet(start, zang, path, type) { //add rank later

	var ebBuf = 0;
	
	if (type == 1) { //deal with types sometime later
	    var ebBuf = 0; //set later if wish to deal
	}
	if (type == 2) {
	    var ebBuf = 0;
	}
	
	while (ebBuf < ebSize) {

	    if (ebActivate[ebBuf] == undefined || ebActivate[ebBuf] == false)
	    {
		ebActivate[ebBuf] = true;

		ebTranslate[ebBuf] = start;

		ebSpawn[ebBuf] = start;

		var ebHit;

		if (type == 1) {

		    ebHit = [start[0], start[1], 3*vd4];
		    ebHitbox[ebBuf] = ebHit;

		}
		else {

		    ebHit = [start[0], start[1], vd4];
		    ebHitbox[ebBuf] = ebHit;
		    
		}

		ebRCurrent[ebBuf] = rotateZ(zang);
		
		ebPath[ebBuf] = path;
		ebType[ebBuf] = type;

		break;
	    }

	    ebBuf += 1;

	}
	
    }

    function EBulletPathMove(ebBuf, timedif) {
	
	var epType = ebPath[ebBuf][0];

	var epx = 0;
	var epy = 0;

	if (epType == 0) {
	    
	    epx = ebPath[ebBuf][1] * timedif;
	    epy = ebPath[ebBuf][2] * timedif;

	}
	    
	else if (epType == 1) {

	    epx = ebPath[ebBuf][4]*timedif;
	    //console.log(epx);
	    var movex = ebPath[ebBuf][3];
	    //console.log(movex);
	    epy = ebPath[ebBuf][1] * movex * (movex - ebPath[ebBuf][2]);
	    //console.log(epy);

	    ebPath[ebBuf][3] += epx;
    
	}

	var ex = ebTranslate[ebBuf][0];
	var ey = ebTranslate[ebBuf][1];
	var ez = ebTranslate[ebBuf][2];

	if (epType == 1) {

	    ey = ebSpawn[ebBuf][1];
	    
	}

	ebTranslate[ebBuf] = [ex + epx, ey + epy, ez];

	/*
	if (epType == 1) {
	    console.log(eTranslate[ebBuf]);
	}
	*/

    }

    function ChangeEBulletPathTo(tarray, ebBuf) {

	ebPath[ebBuf] = tarray;
	
    }

    function delEBullets() {

	var ebBuf = 0;

	while (ebBuf < ebSize) {

	    if (ebActivate[ebBuf]) {

		var ex = ebTranslate[ebBuf][0];
		var ey = ebTranslate[ebBuf][1];

		if (ex > 1.10 || ex < -1.10 || ey > 1.10 || ey < -1.10) {

		    ebActivate[ebBuf] = false;
		    
		}
		
	    }
	    
	    ebBuf += 1;
	    
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

			    /*
			    console.log(pbx);
			    console.log(pbTranslate[pbBuf][0]);
			    console.log(ex);
			    console.log(eTranslate[eBuf][0]);
			    console.log(pby);
			    console.log(pbTranslate[pbBuf][1]);
			    console.log(ey);
			    console.log(eTranslate[eBuf][1]);
			    console.log(dist);
			    console.log(hitd);
			    */
			    
			    eHealth[eBuf] -= firedam;
			    if (eHealth[eBuf] <= 0) {
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

    function eBulletVSPlayer() {

	//console.log("Running");
	
	var ebBuf = 0;

	while (ebBuf < ebSize) {

	    //console.log(ebActivate);

	    if (ebActivate[ebBuf]) {

		//console.log("detect ebullets");
		
		var ebx = ebHitbox[ebBuf][0];
		var px = pHitbox[0];
		var eby = ebHitbox[ebBuf][1];
		var py = pHitbox[1];

		var xd = ebx - px;
		var yd = eby - py;

		var dist = Math.sqrt( xd*xd + yd*yd );
		
		var hitd = pHitbox[2] + ebHitbox[ebBuf][2];

		/*
		console.log(ebx);
		console.log(px);
		console.log(eby);
		console.log(py);
		console.log(dist);
		*/

		
		if (Math.max(dist, hitd) == hitd) {

		    /*
		    console.log(ebx);
		    console.log(ebTranslate[ebBuf][0]);
		    console.log(eby);
		    console.log(py);
		    console.log(ebTranslate[ebBuf][1]);
		    console.log(xd);
		    console.log(yd);
		    console.log(dist);
		    console.log(hitd);
		    */
		    
		    
		    pHealth -= 1;
		    if (pHealth <= 0) {
			//pActivate[eBuf] = false;
			console.log("Game Over")
		    }
		    console.log(pHealth);
		    
		    ebActivate[ebBuf] = false;
		    
		    break;
		    
		}
		
	    }

	    ebBuf += 1;
	    
	}
	
    }

    function EnemyTypeFires(etype, ebpath, ebtype) {

	var eBuf = 0;
	
	if (etype == 1) {
	    eBuf = 10;
	}

	while (eBuf < eSize) {

	    if (etype == 0 && eBuf == 10) { //prevent "boss" from shooting like regular enemies

		break;
		
	    }

	    if (eActivate[eBuf]) {

		createEBullet(eTranslate[eBuf], 0, ebpath, ebtype); //need to replace start
		
	    }

	    eBuf += 1;

	}
	
    }
    
    var makeone = false;

    var shootone = false;
    
    var firstloop = false;

    var lasttime;
    var thistime;
    var totaltime1 = 0;

    console.log("list of used attributes");
    console.log("-----------------------");
    
    var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var ii = 0; ii < numAttribs; ++ii) {
	var attribInfo = gl.getActiveAttrib(program, ii);
	if (!attribInfo) {
	    break;
	}
	console.log(gl.getAttribLocation(program, attribInfo.name), attribInfo.name);
    }
    
    function render() {

	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var tModel = rotateX(0);

	gl.uniform3fv(thetaLoc, theta);
	gl.uniformMatrix4fv(modelLoc, false, flatten(tModel));
	gl.uniform1i(textLoc, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[0]);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[0]);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[0]);

	gl.bindBuffer(gl.ARRAY_BUFFER, tbufList[0]);
	gl.vertexAttribPointer(vTexcoord, 2, gl.FLOAT,false, 0, 0);

	gl.bindTexture(gl.TEXTURE_2D, texture);
	
	gl.drawElements(gl.TRIANGLES, txNumVertices, gl.UNSIGNED_BYTE, 0);

	
	var timedif;
	
	if (firstloop == false) {
	    timedif = 0;
	    lasttime = new Date().getTime();
	    firstloop = true
	}
	else {
	    timedif = (thistime - lasttime) / 100;
	    //console.log(timedif)
	    lasttime = thistime;
	    totaltime1 += timedif;
	}
	
	setpTranslate(timedif);

	pBulletVSEnemy();
	eBulletVSPlayer();

	
	var playerx = pTranslate[0];
	var playery = pTranslate[1];
	var playerz = pTranslate[2];
	var playertm = translate( playerx, playery, playerz);

	pRNew = rotateY(0);
	
	var pRotate = mult(pRNew, pRCurrent);
	var pModel = mult(playertm, pRotate);

	//pRCurrent = mult(pRNew, pRCurrent);
	pRCurrent = pRotate;

	gl.uniform3fv(thetaLoc, theta);
	gl.uniformMatrix4fv(modelLoc, false, flatten(pModel));
	gl.uniform1i(textLoc, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[1]);
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[1]);
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[1]);

	gl.bindBuffer(gl.ARRAY_BUFFER, tbufList[1]);
	gl.vertexAttribPointer(vTexcoord, 2, gl.FLOAT,false, 0, 0);

	gl.bindTexture(gl.TEXTURE_2D, whitetexture);
	
	gl.drawElements(gl.TRIANGLES, pNumVertices, gl.UNSIGNED_BYTE, 0);
	
	if (makeone == false) {

	    createEnemy([0,0.5,0], 0, [0, -0.05, 0], 1);
	    createEnemy([0.5,0.5,0], 180, [1, 1, -0.75, 0, -0.05 ], 0);
	    makeone = true;
	    
	}

	/*
	
	if (totaltime1 >= 2) {

	    EnemyTypeFires(0, [0,0,-0.2] , 0);
	    //console.log("made it here");
	    totaltime1 = 0;

	}
	*/
	
	
	
	if (shootone == false && totaltime1 >= 0.1){

	    EnemyTypeFires(0, [0,0,-0.2] , 0);
	    shootone = true;
	    
	}
	
	

	//console.log(totaltime1);
	
	var pbBuf = 0;

	while (pbBuf < pbSize) {

	    if (pbActivate[pbBuf]) {

		var pbx = pbTranslate[pbBuf][0];
		var pby = pbTranslate[pbBuf][1];
		var pbz = pbTranslate[pbBuf][2];
		var pbtm = translate( pbx, pby, pbz);

		pbTranslate[pbBuf] = [pbx, pby + (firespeed*timedif), pbz];
		pbHitbox[pbBuf][0] = pbx;
		pbHitbox[pbBuf][1] = pby;
	    
		pbRNew[pbBuf] = rotateY(10);
		
		var pbRotate = mult(pbRNew[pbBuf], pbRCurrent[pbBuf]);
		var pbModel = mult(pbtm, pbRotate);

		pbRCurrent[pbBuf] = pbRotate;
		
		gl.uniform3fv(thetaLoc, theta);
		gl.uniformMatrix4fv(modelLoc, false, flatten(pbModel));
		gl.uniform1i(textLoc, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[pbStart + pbBuf]);
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[pbStart + pbBuf]);
		gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[pbStart + pbBuf]);

		gl.bindBuffer(gl.ARRAY_BUFFER, tbufList[pbStart + pbBuf]);
		gl.vertexAttribPointer(vTexcoord, 2, gl.FLOAT,false, 0, 0);
		
		gl.bindTexture(gl.TEXTURE_2D, whitetexture);
		
		gl.drawElements(gl.TRIANGLES, pbNumVertices, gl.UNSIGNED_BYTE, 0);
		
	    }

	    pbBuf += 1
	    
	}

	var eBuf = 0;

	while (eBuf < eSize) {

	    if (eActivate[eBuf]) {

		//replace this translation section with translation functions based on the path type
		var ex = eTranslate[eBuf][0];
		var ey = eTranslate[eBuf][1];
		var ez = eTranslate[eBuf][2];
		eHitbox[eBuf][0] = ex;
		eHitbox[eBuf][1] = ey + 2*vd3;
		
		var etm = translate( ex, ey, ez);

		eTranslate[eBuf] = [ex, ey, ez];

		//for testing purposes
		eRNew[eBuf] = rotateY(2);
		
		var eRotate = mult(eRNew[eBuf], eRCurrent[eBuf]);
		var eModel = mult(etm, eRotate);

		
		if (eBuf >= 10) {
		    var bigger = scalem( 3, 3, 3 );
		    eModel = mult(eModel, bigger);
		    eHitbox[eBuf][1] = ey + 2*3*vd3;
		    
		}

		eRCurrent[eBuf] = eRotate;
		
		gl.uniform3fv(thetaLoc, theta);
		gl.uniformMatrix4fv(modelLoc, false, flatten(eModel));
		gl.uniform1i(textLoc, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[eStart + eBuf]);
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[eStart + eBuf]);
		gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[eStart + eBuf]);

		gl.bindBuffer(gl.ARRAY_BUFFER, tbufList[eStart + eBuf]);
		gl.vertexAttribPointer(vTexcoord, 2, gl.FLOAT,false, 0, 0);
		
		gl.bindTexture(gl.TEXTURE_2D, whitetexture);
		
		gl.drawElements(gl.TRIANGLES, eNumVertices, gl.UNSIGNED_BYTE, 0);
		
		EnemyPathMove(eBuf, timedif);
		
	    }

	    eBuf += 1
	    
	}

	var ebBuf = 0;

	while (ebBuf < ebSize) {

	    if (ebActivate[ebBuf]) {

		//replace this translation section with translation functions based on the path type
		var ex = ebTranslate[ebBuf][0];
		var ey = ebTranslate[ebBuf][1];
		var ez = ebTranslate[ebBuf][2];
		ebHitbox[ebBuf][0] = ex;
		ebHitbox[ebBuf][1] = ey;
		
		var etm = translate( ex, ey, ez);

		ebTranslate[ebBuf] = [ex, ey, ez];

		//for testing purposes
		ebRNew[ebBuf] = rotateY(2);
		
		var ebRotate = mult(ebRNew[ebBuf], ebRCurrent[ebBuf]);
		var ebModel = mult(etm, ebRotate);

		
		if (ebBuf >= 100) { //100 is length of ebSize so would need adjustments
		    var bigger = scalem( 3, 3, 3 );
		    ebModel = mult(ebModel, bigger);
		    
		}
		
		ebRCurrent[ebBuf] = ebRotate;
		
		gl.uniform3fv(thetaLoc, theta);
		gl.uniformMatrix4fv(modelLoc, false, flatten(ebModel));
		gl.uniform1i(textLoc, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vbufList[ebStart + ebBuf]);
		gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, cbufList[ebStart + ebBuf]);
		gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufList[ebStart + ebBuf]);

		gl.bindBuffer(gl.ARRAY_BUFFER, tbufList[ebStart + ebBuf]);
		gl.vertexAttribPointer(vTexcoord, 2, gl.FLOAT,false, 0, 0);
		
		gl.bindTexture(gl.TEXTURE_2D, whitetexture);
		
		gl.drawElements(gl.TRIANGLES, ebNumVertices, gl.UNSIGNED_BYTE, 0);
		
		EBulletPathMove(ebBuf, timedif);
		
	    }

	    ebBuf += 1
	    
	}



	delPBullets();
	delEnemy();
	delEBullets();

	thistime = new Date().getTime();
	
	requestAnimFrame( render );
    }

    render();
    
}

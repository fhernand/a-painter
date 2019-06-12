/* global AFRAME THREE */
var sharedBufferGeometryManager = require('../sharedbuffergeometrymanager.js');
var onLoaded = require('../onloaded.js');

(function () {

  onLoaded(function () {
   var flat = new THREE.MeshBasicMaterial({
       side: THREE.DoubleSide,
       map: window.atlas.map,
       vertexColors: THREE.VertexColors,
       transparent: true,
       alphaTest: 0.5
   });

   sharedBufferGeometryManager.addSharedBuffer('tris-flat', flat, THREE.TrianglesDrawMode);
 });

 var stamp = {

   init: function (color, brushSize) {
     this.sharedBuffer = sharedBufferGeometryManager.getSharedBuffer('tris-' + this.materialOptions.type);
     this.prevIdx = Object.assign({}, this.sharedBuffer.idx);
     this.idx = Object.assign({}, this.sharedBuffer.idx);


     this.currAngle = 0;
     this.subTextures = 1;
     this.angleJitter = 0;
     this.autoRotate = false;

     this.currentSize = 0;
   },

   remove: function () {
     this.sharedBuffer.remove(this.prevIdx, this.idx);
   },

   undo: function () {
     this.sharedBuffer.undo(this.prevIdx);
   },

   addPoint: (function () {
     var axis = new THREE.Vector3();
     var dir = new THREE.Vector3();
     var diry = new THREE.Vector3();
     var a = new THREE.Vector3();
     var b = new THREE.Vector3();
     var c = new THREE.Vector3();
     var d = new THREE.Vector3();
     var auxDir = new THREE.Vector3();
     var pi2 = Math.PI / 2;

     return function (position, rotation, pointerPosition, pressure, timestamp) {
       //set Size and select materialOptions
       if (this.currentSize != pressure){
         this.materialOptions = stamps[pressure].materialOptions;
         this.currentSize = pressure;
       }

       // brush side
       dir.set(1, 0, 0);
       dir.applyQuaternion(rotation);
       dir.normalize();

       // brush up
       diry.set(0, 1, 0);
       diry.applyQuaternion(rotation);
       diry.normalize();

       // brush normal
       axis.set(0, 0, 1);
       axis.applyQuaternion(rotation);
       axis.normalize();

       var brushSize = 0.1;
       //pointerPosition.add(diry.clone().multiplyScalar(-0.5));
       //pointerPosition.add(dir.clone().multiplyScalar(-0.5));

       a = pointerPosition.clone();
       b = pointerPosition.clone();
       a.add(dir.clone().multiplyScalar(-brushSize/2));
       b.add(dir.clone().multiplyScalar(brushSize/2));
       c = a.clone();
       c.add(diry.clone().multiplyScalar(brushSize));
       d = b.clone();
       d.add(diry.clone().multiplyScalar(brushSize));

       var nidx = this.idx.position;
       var cidx = this.idx.position;

       // triangle 1
       this.sharedBuffer.addVertex(a.x, a.y, a.z);
       this.sharedBuffer.addVertex(b.x, b.y, b.z);
       this.sharedBuffer.addVertex(c.x, c.y, c.z);

       // triangle 2
       this.sharedBuffer.addVertex(c.x, c.y, c.z);
       this.sharedBuffer.addVertex(d.x, d.y, d.z);
       this.sharedBuffer.addVertex(a.x, a.y, a.z);

       // normals & color
       for (var i = 0; i < 6; i++) {
         this.sharedBuffer.addNormal(axis.x, axis.y, axis.z);
         this.sharedBuffer.addColor(this.data.color.r, this.data.color.g, this.data.color.b);
       }

       // UVs
       var uv = this.data.numPoints * 6 * 2;

       // subTextures?
       var Umin = 0;
       var Umax = 1;

       var converter = this.materialOptions.converter;

       // triangle 1 uv
       this.sharedBuffer.addUV(converter.convertU(Umin), converter.convertV(1));
       this.sharedBuffer.addUV(converter.convertU(Umin), converter.convertV(0));
       this.sharedBuffer.addUV(converter.convertU(Umax), converter.convertV(0));

       // triangle2 uv
       this.sharedBuffer.addUV(converter.convertU(Umax), converter.convertV(0));
       this.sharedBuffer.addUV(converter.convertU(Umax), converter.convertV(1));
       this.sharedBuffer.addUV(converter.convertU(Umin), converter.convertV(1));

       this.idx = Object.assign({}, this.sharedBuffer.idx);

       this.sharedBuffer.update();

       return true;
     }
   })()

 };

 var stamps = [
   {
     name: 'unicorn',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_0.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_1',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_1.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_2',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_2.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_3',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_3.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_4',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_4.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_5',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_5.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_6',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_6.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_7',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_7.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_8',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_8.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_9',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_9.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_10',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_10.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_11',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_11.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_12',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_12.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_13',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_13.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_14',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_14.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   },
   {
     name: 'unicorn_15',
     materialOptions: {
       type: 'flat',
       textureSrc: 'brushes/unicorn_15.png'
     },
     thumbnail: 'brushes/thumb_unicornhat.gif',
     spacing: 0.01
   }
 ];

 // var textureLoader = new THREE.TextureLoader();
 for (var i = 0; i < stamps.length; i++) {
   var definition = stamps[i];
   if (definition.materialOptions.textureSrc) {
     definition.materialOptions.map = window.atlas.map; //textureLoader.load(definition.materialOptions.textureSrc);
     definition.materialOptions.converter = window.atlas.getUVConverters(definition.materialOptions.textureSrc);
     delete definition.materialOptions.textureSrc;
   }
   AFRAME.registerBrush(definition.name, Object.assign({}, stamp, {materialOptions: definition.materialOptions}), {thumbnail: definition.thumbnail, spacing: definition.spacing, maxPoints: 3000});
 }

 /*
 - type: <'flat'|'shaded'>
   Flat: constant, just color. Shaded: phong shading with subtle speculars
 - autoRotate: <true|false>
   The brush rotates incrementally at 0.1rad per point
 - angleJitter: <r:float>
   The brush rotates randomly from -r to r
 - subTextures: <n:int>
   textureSrc is divided in n horizontal pieces, and the brush picks one randomly on each point
 */
})();

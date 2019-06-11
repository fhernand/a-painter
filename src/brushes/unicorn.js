/* globals AFRAME THREE */
var sharedBufferGeometryManager = require('../sharedbuffergeometrymanager.js');
var onLoaded = require('../onloaded.js');

(function () {
    const BUFFERSIZEX = 2;
    const BUFFERSIZEY = 2;
    var geometryManager = null;



    onLoaded(function () {
      var optionsBasic = {
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
      };

      for (i = 0; i < (BUFFERSIZEX * BUFFERSIZEY) + 1; i++){
        this.sharedBuffer[i] = sharedBufferGeometryManager.addSharedBuffer('strip-' + i, new THREE.MeshBasicMaterial(optionsBasic), THREE.TriangleStripDrawMode);
      }
    });

  var line = {
    this.sizeZero     = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeOne      = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeTwo      = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','2','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeThree    = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','3','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeFour     = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','2','0','0','0','0','0','0','3','3','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeFive     = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','1','0','0','0','0','0','1','3','3','1','0','0','0','0','1','3','3','1','0','0','0','0','0','1','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeSix      = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1','2','2','1','0','0','0','0','2','3','3','2','0','0','0','0','2','3','3','2','0','0','0','0','1','2','2','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeSeven    = ['0','0','0','0','0','0','0','0','0','0','0','1','1','0','0','0','0','0','1','3','3','1','0','0','0','1','3','3','3','3','1','0','0','1','3','3','3','3','1','0','0','0','1','3','3','1','0','0','0','0','0','1','1','0','0','0','0','0','0','0','0','0','0','0'];
    this.sizeEight    = ['0','0','0','0','0','0','0','0','0','0','1','1','1','1','0','0','0','1','2','3','3','2','1','0','0','1','3','3','3','3','1','0','0','1','3','3','3','3','1','0','0','1','2','3','3','2','1','0','0','0','1','1','1','1','0','0','0','0','0','0','0','0','0','0'];
    this.sizeNine     = ['0','0','0','0','0','0','0','0','0','0','1','2','2','1','0','0','0','1','2','3','3','2','1','0','0','2','3','3','3','3','2','0','0','2','3','3','3','3','2','0','0','1','2','3','3','2','1','0','0','0','1','2','2','1','0','0','0','0','0','0','0','0','0','0'];
    this.sizeTen      = ['0','0','0','0','0','0','0','0','0','1','2','3','3','2','1','0','0','2','3','3','3','3','2','0','0','3','3','3','3','3','3','0','0','3','3','3','3','3','3','0','0','2','3','3','3','3','2','0','0','1','2','3','3','2','1','0','0','0','0','0','0','0','0','0'];
    this.sizeEleven   = ['0','0','1','1','1','1','0','0','0','2','2','3','3','2','2','0','1','2','3','3','3','3','2','1','1','3','3','3','3','3','3','1','1','3','3','3','3','3','3','1','1','2','3','3','3','3','2','1','0','2','2','3','3','2','2','0','0','0','1','1','1','1','0','0'];
    this.sizeTwelve   = ['0','0','1','2','2','1','0','0','0','2','3','3','3','3','2','0','1','3','3','3','3','3','3','1','2','3','3','3','3','3','3','2','2','3','3','3','3','3','3','2','1','3','3','3','3','3','3','1','0','2','3','3','3','3','2','0','0','0','1','2','2','1','0','0'];
    this.sizeThirteen = ['0','1','2','3','3','2','1','0','1','3','3','3','3','3','3','1','2','3','3','3','3','3','3','2','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','2','3','3','3','3','3','3','2','1','3','3','3','3','3','3','1','0','1','2','3','3','2','1','0'];
    this.sizeFourteen = ['0','1','3','3','3','3','1','0','1','3','3','3','3','3','3','1','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','1','3','3','3','3','3','3','1','0','1','3','3','3','3','1','0'];
    this.sizeFifteen  = ['1','2','3','3','3','3','2','1','2','3','3','3','3','3','3','2','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','2','3','3','3','3','3','3','2','1','2','3','3','3','3','2','1'];

    this.brushSizes 	= [this.sizeZero,this.sizeOne, this.sizeTwo, this.sizeThree,this.sizeFour, this.sizeFive, this.sizeSix, this.sizeSeven, this.sizeEight, this.sizeNine, this.sizeTen, this.sizeEleven, this.sizeTwelve, this.sizeThirteen, this.sizeFourteen, this.sizeFifteen];
    this.brushSize    = this.sizeZero;


    this.sharedBuffer = new Array(BUFFERSIZEX * BUFFERSIZEY);
    this.prevIdx      = new Array(BUFFERSIZEX * BUFFERSIZEY);
    this.idx          = new Array(BUFFERSIZEX * BUFFERSIZEY);
    this.first        = new Array(BUFFERSIZEX * BUFFERSIZEY);
    
    init: function (color, brushSize) {

      for (i = 0; i < (BUFFERSIZEX * BUFFERSIZEY) + 1; i++){
        this.sharedBuffer[i] = sharedBufferGeometryManager.getSharedBuffer('strip-' + i);
        this.sharedBuffer[i].restartPrimitive();

        this.prevIdx[i] = Object.assign({}, this.sharedBuffer[i].idx);
        this.idx[i] = Object.assign({}, this.sharedBuffer[i].idx);

        this.first[i] = true;
      }
    },
    remove: function () {
      for (i = 0; i < (BUFFERSIZEX * BUFFERSIZEY) + 1; i++){
        this.sharedBuffer[i].remove(this.prevIdx[i], this.idx[i]);
      }
    },
    undo: function () {
      for (i = 0; i < (BUFFERSIZEX * BUFFERSIZEY) + 1; i++){
        this.sharedBuffer[i].undo(this.prevIdx[i]);
      }
    },
    addPoint: (function () {
      var direction = new THREE.Vector3();
      var directionx = new THREE.Vector3();
      var directiony = new THREE.Vector3();

      return function (position, orientation, pointerPosition, pressure, timestamp) {
        var converter = this.materialOptions.converter;

        this.brushSize = this.brushSizes[pressure];
        directionx.set(0.1, 0, 0);
        directionx.applyQuaternion(orientation);
        //directionx.normalize();

        directiony.set(0, 0.1, 0);
        directiony.applyQuaternion(orientation);
        //directiony.normalize();

        direction.set(1, 0, 0);
        direction.applyQuaternion(orientation);
        direction.normalize();

        for (i = 0; i < BUFFERSIZEX + 1; i++) {
          pointerPosition.add(directiony.clone().multiplyScalar(0.1));
          for (j = 0; j < BUFFERSIZEY + 1; j++) {
            pointerPosition.add(directionx.clone().multiplyScalar(0.1));
            if (this.brushSize[(i * (BUFFERSIZEX + 1)) + j] != 0){

            //var offsetPosition = new THREE.Vector3(j*0.1,i*0.1,0).applyQuaternion(rotation)

              var posA = pointerPosition.clone();
              var posB = pointerPosition.clone();
              var brushSize = 0.1; // * pressure;//this.data.size * pressure;
              posA.add(direction.clone().multiplyScalar(brushSize / 2));
              posB.add(direction.clone().multiplyScalar(-brushSize / 2));

              if (this.first[(i * (BUFFERSIZEX + 1)) + j] && this.prevIdx[(i * (BUFFERSIZEX + 1)) + j].position > 0) {
                // Degenerated triangle
                this.first[(i * (BUFFERSIZEX + 1)) + j] = false;
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].addVertex(posA.x, posA.y, posA.z);
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].idx.normal++;
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].idx.color++;
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].idx.uv++;

                this.idx[(i * (BUFFERSIZEX + 1)) + j] = Object.assign({}, this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].idx);
              }

                /*
                  2---3
                  | \ |
                  0---1
                */
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].addVertex(posA.x, posA.y, posA.z);
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].addVertex(posB.x, posB.y, posB.z);
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].idx.normal += 2;

                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].addColor(this.data.color.r, this.data.color.g, this.data.color.b);
                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].addColor(this.data.color.r, this.data.color.g, this.data.color.b);

                this.idx[(i * (BUFFERSIZEX + 1)) + j] = Object.assign({}, this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].idx);

                this.sharedBuffer[(i * (BUFFERSIZEX + 1)) + j].update();
                //this.computeStripVertexNormals();
            }
          }
        }
        return true;
      };

    })(),

    computeStripVertexNormals: (function () {
      var pA = new THREE.Vector3();
      var pB = new THREE.Vector3();
      var pC = new THREE.Vector3();
      var cb = new THREE.Vector3();
      var ab = new THREE.Vector3();

      return function () {
        var start = this.prevIdx.position === 0 ? 0 : (this.prevIdx.position + 1) * 3;
        var end = (this.idx.position) * 3;
        var vertices = this.sharedBuffer.current.attributes.position.array;
        var normals = this.sharedBuffer.current.attributes.normal.array;

        for (var i = start; i <= end; i++) {
          normals[i] = 0;
        }

        var pair = true;
        for (i = start; i < end - 6; i += 3) {
          if (pair) {
            pA.fromArray(vertices, i);
            pB.fromArray(vertices, i + 3);
            pC.fromArray(vertices, i + 6);
          } else {
            pB.fromArray(vertices, i);
            pC.fromArray(vertices, i + 6);
            pA.fromArray(vertices, i + 3);
          }
          pair = !pair;

          cb.subVectors(pC, pB);
          ab.subVectors(pA, pB);
          cb.cross(ab);
          cb.normalize();

          normals[i] += cb.x;
          normals[i + 1] += cb.y;
          normals[i + 2] += cb.z;

          normals[i + 3] += cb.x;
          normals[i + 4] += cb.y;
          normals[i + 5] += cb.z;

          normals[i + 6] += cb.x;
          normals[i + 7] += cb.y;
          normals[i + 8] += cb.z;
        }

        /*
        first and last vertice (0 and 8) belongs just to one triangle
        second and penultimate (1 and 7) belongs to two triangles
        the rest of the vertices belongs to three triangles

          1_____3_____5_____7
          /\    /\    /\    /\
         /  \  /  \  /  \  /  \
        /____\/____\/____\/____\
        0    2     4     6     8
        */

        // Vertices that are shared across three triangles
        for (i = start + 2 * 3; i < end - 2 * 3; i++) {
          normals[i] = normals[i] / 3;
        }

        // Second and penultimate triangle, that shares just two triangles
        normals[start + 3] = normals[start + 3] / 2;
        normals[start + 3 + 1] = normals[start + 3 + 1] / 2;
        normals[start + 3 + 2] = normals[start + 3 * 1 + 2] / 2;

        normals[end - 2 * 3] = normals[end - 2 * 3] / 2;
        normals[end - 2 * 3 + 1] = normals[end - 2 * 3 + 1] / 2;
        normals[end - 2 * 3 + 2] = normals[end - 2 * 3 + 2] / 2;
      };
    })()
  };

  var lines = [
    {
      name: 'unicorn',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhd.gif'
    },
    {
      name: 'unicornsquare',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhd_square.gif'
    },
    {
      name: 'unicornround',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhd_round.gif'
    },
    {
      name: 'unicornsquare2',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhd_square2.gif'
    },
    {
      name: 'unicornround2',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhd_round2.gif'
    },

    {
      name: 'unicorndot',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhd_dot.gif'
    }
  ];

  for (var i = 0; i < lines.length; i++) {
    var definition = lines[i];
    if (definition.materialOptions.textureSrc) {
      definition.materialOptions.converter = window.atlas.getUVConverters(definition.materialOptions.textureSrc);
    } else {
      definition.materialOptions.converter = window.atlas.getUVConverters(null);
    }

    AFRAME.registerBrush(definition.name, Object.assign({}, line, {materialOptions: definition.materialOptions}), {thumbnail: definition.thumbnail, maxPoints: 3000});
  }
})();

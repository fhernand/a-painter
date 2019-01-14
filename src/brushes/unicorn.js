/* globals AFRAME THREE */
var sharedBufferGeometryManager = require('../sharedbuffergeometrymanager.js');
var onLoaded = require('../onloaded.js');

(function () {

    var geometryManager = null;

    onLoaded(function () {
      var optionsBasic = {
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
      };

      sharedBufferGeometryManager.addSharedBuffer('strip-flat', new THREE.MeshBasicMaterial(optionsBasic), THREE.TriangleStripDrawMode);
    });

  var line = {

    init: function (color, brushSize) {
      this.sharedBuffer = sharedBufferGeometryManager.getSharedBuffer('strip-' + this.materialOptions.type);
      this.sharedBuffer.restartPrimitive();

      this.prevIdx = Object.assign({}, this.sharedBuffer.idx);
      this.idx = Object.assign({}, this.sharedBuffer.idx);

      this.first = true;
    },
    remove: function () {
      this.sharedBuffer.remove(this.prevIdx, this.idx);
    },
    undo: function () {
      this.sharedBuffer.undo(this.prevIdx);
    },
    addPoint: (function () {
      var direction = new THREE.Vector3();

      return function (position, orientation, pointerPosition, pressure, timestamp) {
        var converter = this.materialOptions.converter;

        direction.set(1, 0, 0);
        direction.applyQuaternion(orientation);
        direction.normalize();

        var posA = pointerPosition.clone();
        var posB = pointerPosition.clone();
        var brushSize = this.data.size * pressure;
        posA.add(direction.clone().multiplyScalar(brushSize / 2));
        posB.add(direction.clone().multiplyScalar(-brushSize / 2));

        if (this.first && this.prevIdx.position > 0) {
          // Degenerated triangle
          this.first = false;
          this.sharedBuffer.addVertex(posA.x, posA.y, posA.z);
          this.sharedBuffer.idx.normal++;
          this.sharedBuffer.idx.color++;
          this.sharedBuffer.idx.uv++;

          this.idx = Object.assign({}, this.sharedBuffer.idx);
        }

        /*
          2---3
          | \ |
          0---1
        */
        this.sharedBuffer.addVertex(posA.x, posA.y, posA.z);
        this.sharedBuffer.addVertex(posB.x, posB.y, posB.z);
        this.sharedBuffer.idx.normal += 2;

        this.sharedBuffer.addColor(this.data.color.r, this.data.color.g, this.data.color.b);
        this.sharedBuffer.addColor(this.data.color.r, this.data.color.g, this.data.color.b);

        this.idx = Object.assign({}, this.sharedBuffer.idx);

        this.sharedBuffer.update();
        //this.computeStripVertexNormals();
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
      name: 'unicornhat',
      materialOptions: {
        type: 'flat'
      },
      thumbnail: 'brushes/thumb_unicornhat.gif'
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

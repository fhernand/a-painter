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

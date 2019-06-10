/* globals AFRAME THREE */
AFRAME.registerComponent('brush', {
  schema: {
    color: {type: 'color', default: '#ef2d5e'},
    size: {default: 48, min: 0, max: 255},
    brush: {default: 'unicorn'},
    enabled: { default: true }
  },
  init: function () {
    var data = this.data;
    this.color = new THREE.Color(data.color);

    this.el.emit('brushcolor-changed', {color: this.color});
    this.el.emit('brushsize-changed', {brushSize: data.size});
	this.el.emit('brightness-changed', {brightness: data.size});

    this.active = false;
    this.obj = this.el.object3D;

    this.currentStroke = null;
    this.strokeEntities = [];

    this.sizeModifier = 0.0;
    this.sizepartition = 0;
    this.oldsizepartition = 0;
    this.textures = {};
    this.currentMap = 0;

    this.addedDeltas = 0;

    this.model = this.el.getObject3D('mesh');
    this.drawing = false;

    var self = this;

    this.previousAxis = 0;

    this.gammaCorrection = [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,
    1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,
    2,  3,  3,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  5,  5,  5,
    5,  6,  6,  6,  6,  7,  7,  7,  7,  8,  8,  8,  9,  9,  9, 10,
   10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16,
   17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 24, 24, 25,
   25, 26, 27, 27, 28, 29, 29, 30, 31, 32, 32, 33, 34, 35, 35, 36,
   37, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50,
   51, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 68,
   69, 70, 72, 73, 74, 75, 77, 78, 79, 81, 82, 83, 85, 86, 87, 89,
   90, 92, 93, 95, 96, 98, 99,101,102,104,105,107,109,110,112,114,
  115,117,119,120,122,124,126,127,129,131,133,135,137,138,140,142,
  144,146,148,150,152,154,156,158,160,162,164,167,169,171,173,175,
  177,180,182,184,186,189,191,193,196,198,200,203,205,208,210,213,
  215,218,220,223,225,228,231,233,236,239,241,244,247,249,252,255];

    // this.el.addEventListener('axismove', function (evt) {
    //   if (evt.detail.axis[0] === 0 && evt.detail.axis[1] === 0 || this.previousAxis === evt.detail.axis[1]) {
    //     return;
    //   }
    //
    //   this.previousAxis = evt.detail.axis[1];
    //   var size = (evt.detail.axis[1] + 1) / 2 * self.schema.size.max;
    //
    //   self.el.setAttribute('brush', 'size', size);
    // });

    this.el.addEventListener('buttondown', function (evt) {
      if (!self.data.enabled) { return; }
      // Grip
      if (evt.detail.id === 2) {
	        self.el.sceneEl.systems.painter.toggleRefImages();
        //self.system.undo();
      }
    });

	this.el.addEventListener('paint', function (evt) {
      if (!self.data.enabled) { return; }
        // Trigger
        var value = evt.detail.value;
        self.sizeModifier = value;
        if (value > 0.1) {
          if (!self.active) {
            self.startNewStroke();
            self.active = true;
        }
    		self.sizepartition = Math.min(Math.floor((self.sizeModifier-0.1)/0.06) + 1, 15);
    		if(self.sizepartition != self.oldsizepartition){
    		  self.newLEDSize(self.sizepartition);
    		  self.oldsizepartition = self.sizepartition;
          self.brushSize = self.brushSizes[self.sizepartition];
    		}
      } else {
        if (self.active) {
          self.previousEntity = self.currentEntity;
          self.currentStroke = null;
		      self.endStroke();
        }
        self.active = false;
      }
    });

	// this.el.addEventListener('buttonchanged', function (evt) {
  //     if (!self.data.enabled) { return; }
  //     // Trigger
  //     if (evt.detail.id === 1) {
  //       var value = evt.detail.state.value;
  //       self.sizeModifier = value;
  //       if (value > 0.1) {
  //         if (!self.active) {
  //           self.startNewStroke();
  //           self.active = true;
  //         }
	//   self.sizepartition = Math.min(Math.floor((self.sizeModifier-0.1)/0.06) + 1, 15);
	//   if(self.sizepartition != self.oldsizepartition){
	// 	  self.newLEDSize(self.sizepartition);
	// 	  self.oldsizepartition = self.sizepartition;
	//   }
  //       } else {
  //         if (self.active) {
  //           self.previousEntity = self.currentEntity;
  //           self.currentStroke = null;
	// 		self.endStroke();
  //         }
  //         self.active = false;
  //       }
  //     }
  //   });
  },
  update: function (oldData) {
    var data = this.data;
    if (oldData.color !== data.color) {
      this.color.set(data.color);
      this.el.emit('brushcolor-changed', {color: this.color});
    }
    if (oldData.size !== data.size) {
      var gammaCorrection = this.gammaCorrection;
      var clampedBrushSize = THREE.Math.clamp(data.size, 0, data.size.max);
      this.el.emit('brushsize-changed', {size: data.size});
	    this.el.emit('brightness-changed', {brightness: gammaCorrection[clampedBrushSize]});
    }
  },
  tick: (function () {
    var position = new THREE.Vector3();
    var rotation = new THREE.Quaternion();
    var scale = new THREE.Vector3();

    return function tick (time, delta) {
	  if (this.currentStroke && this.active) {
        this.obj.matrixWorld.decompose(position, rotation, scale);
        var pointerPosition = this.system.getPointerPosition(position, rotation);
        //self.sizepartition

            this.currentStroke.addPoint(position, rotation, pointerPosition, this.sizeModifier, time);
            }
          }
        }
    }

      //this.addedDeltas += delta;
      //if (this.addedDeltas > 100 && this.currentStroke && this.active) {
      //  this.obj.matrixWorld.decompose(position, rotation, scale);
      //  var pointerPosition = this.system.getPointerPosition(position, rotation);
      //  this.currentStroke.addPoint(position, rotation, pointerPosition, this.sizeModifier, time);
	  //  this.addedDeltas = 0;
      //}
    };
  })(),
  startNewStroke: function () {
    this.currentStroke = this.system.addNewStroke(this.data.brush, this.color, this.data.size);
    this.el.emit('stroke-started', {entity: this.el, stroke: this.currentStroke});
  },
  endStroke: function () {
    this.el.emit('stroke-ended');
  },
  newLEDSize: function (LEDSize) {
    this.el.emit('ledsize-changed', {ledsize: LEDSize});
  }
});

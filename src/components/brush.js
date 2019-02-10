/* globals AFRAME THREE */
AFRAME.registerComponent('brush', {
  schema: {
    color: {type: 'color', default: '#ef2d5e'},
    size: {default: 0.01, min: 0.001, max: 0.3},
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
      this.el.emit('brushsize-changed', {size: data.size});
	  this.el.emit('brightness-changed', {brightness: data.size});
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
        this.currentStroke.addPoint(position, rotation, pointerPosition, this.sizeModifier, time);
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

// based on https://jgbarah.github.io/aframe-playground/components/
AFRAME.registerComponent('canvas-updater', {
    dependencies: ['geometry', 'material'],

    tick: function () {
        var el = this.el;
        var material;

        material = el.getObject3D('mesh').material;
        if (!material.map) { return; }
        material.map.needsUpdate = true;
    }
});

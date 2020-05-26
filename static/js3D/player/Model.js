class Model {

  constructor(){
    this.container = new THREE.Object3D()
    this.mixer = null
  }

  loadModel(url, name, scale, callback) {
    var instance = this;

    var modelMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(url+"texture.png"),
      morphTargets: true
    });

    var loader = new THREE.JSONLoader();
    loader.load(url + "model.js", function (geometry) {

      var meshModel = new THREE.Mesh(geometry, modelMaterial)
      meshModel.name = name;
      meshModel.scale.set(scale,scale,scale);

      instance.container.add(meshModel);
      callback(instance.container);
    });
  }

  updateModel (delta) {
    if (this.mixer) this.mixer.update(delta)
  }

  setAnimation (anim) {
    this.mixer.clipAction(anim).play();
  }

}

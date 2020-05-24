class Model {

  constructor(){
    this.container = new THREE.Object3D()
    this.mixer = null
  }

  loadModel(url, callback) {
    var instance = this;

    var modelMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("../models3D/player/playerTexture.png"),
      morphTargets: true
    });

    var loader = new THREE.JSONLoader();
    loader.load(url, function (geometry) {

      var meshModel = new THREE.Mesh(geometry, modelMaterial)
      meshModel.name = "player";
      meshModel.scale.set(Settings.playerScale,Settings.playerScale,Settings.playerScale);

      instance.container.add(meshModel);
      callback(instance.container);
    });
  }

  updateModel () {
    if (this.mixer) this.mixer.update(delta)
  }

  setAnimation (anim) {
    this.mixer.clipAction(anim).play();
  }

}

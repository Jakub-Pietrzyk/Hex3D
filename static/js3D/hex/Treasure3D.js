class Treasure3D {
    constructor(target){
      var container = new THREE.Object3D();

      var cube = new THREE.Mesh(Settings.treasureGeometry, Settings.treasureMaterial);
      container.add(cube);
      container.name = "treasure"

      return container
    }
}

class Light3D {
    constructor(target){
      var container = new THREE.Object3D();

      var spotlight = new THREE.PointLight(Settings.lightColor, Settings.lightStartingIntensity);
      spotlight.target = target;
      spotlight.position.set(0,0,0);
      container.add(spotlight);

      var mesh = new THREE.Mesh(Settings.lightGeometry, Settings.lightMaterial);
      mesh.position.set(0,0,0);
      container.add(mesh);

      if(!ui.lightInitialized){
        ui.addLightControls();
      }

      lights.push({height: container, intensity: spotlight});
      container.name = "light"
      return container
    }
}

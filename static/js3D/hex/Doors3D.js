class Doors3D {
    constructor(cords){
      var container = new THREE.Object3D();
      // var wall = new THREE.Mesh(Settings.hexWallGeometry, Settings.hexWallMaterial);
      var wall = new THREE.Object3D();

      var side_one = new THREE.Mesh(new THREE.BoxGeometry( 20, 30, 10 ), Settings.hexWallMaterial);
      var side_two = side_one.clone();
      var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
      var geo_one = new THREE.EdgesGeometry( side_one.geometry );
      var geo_two = new THREE.EdgesGeometry( side_two.geometry);
      var wireframe_one = new THREE.LineSegments( geo_one, mat );
      var wireframe_two = new THREE.LineSegments( geo_two, mat );
      side_one.position.x = -20;
      side_two.position.x = 20;
      side_one.add(wireframe_one);
      side_two.add(wireframe_two);
      wall.add(side_one);
      wall.add(side_two);

      for (var i = 0; i < cords.length; i++) {
        var side = wall.clone();
        var x = Settings.hexRadius * Math.sin(Math.PI * 2 * cords[i]*60 / 360);
        var z = Settings.hexRadius * Math.cos(Math.PI * 2 * cords[i]*60 / 360);
        side.position.x = x;
        side.position.z = z;
        side.lookAt(container.position)
        side.name = "door_" + (cords[i]*60)
        container.add(side);
      }

      container.name = "doors"
      return container
    }
}

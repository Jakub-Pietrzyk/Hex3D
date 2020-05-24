class Hex3D {
    constructor(doors1, doors2, type){
       var container = new THREE.Object3D();
       var wall = new THREE.Mesh(Settings.hexWallGeometry, Settings.hexWallMaterial);

       var geo = new THREE.EdgesGeometry( wall.geometry ); // or WireframeGeometry
       var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
       var wireframe = new THREE.LineSegments( geo, mat );
       wall.add( wireframe );

       for (var i = 0; i < 6; i++) {
         if( i != doors1 && i != doors2){
           var side = wall.clone();
           var x = Settings.hexRadius * Math.sin(Math.PI * 2 * i*60 / 360);
           var z = Settings.hexRadius * Math.cos(Math.PI * 2 * i*60 / 360);
           side.position.x = x;
           side.position.z = z;
           side.lookAt(container.position)
           side.name = "wall_" + (i*60)
           container.add(side);
         }
       }

       var floor = new THREE.Mesh(Settings.hexFloorGeometry, Settings.hexWallMaterial);
       floor.position.y = Settings.hexFloorYPosition;
       container.add(floor);

       var doors = new Doors3D([doors1, doors2])
       container.add(doors);

       if(type == "LIGHT"){
         var light = new Light3D(floor);
         container.add(light);
       } else if(type =="TREASURE"){
         var treasure = new Treasure3D();
         container.add(treasure);
       }

       container.position.y = Settings.hexHeight;
       container.rotateZ(Math.PI);
       return container
    }
}

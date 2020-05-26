class Level3D {

   constructor(){
      this.levelData = null;
      this.getData();
   }

   getData(){
     $.ajax({
       url: "/getLevel",
       data: {},
       type: "POST",
       success: function (response) {
         if(response != "NO_LEVEL"){
           var data = JSON.parse(response)
           level3D.levelData = data;
           level3D.makeLevel();
         }
       },
       error: function (xhr, status, error) {
         console.log(xhr);
       },
     });
   }

   makeLevel(){
     var hexes = this.levelData["level"];
     for(var i=0;i<hexes.length;i++){
       var x = Settings.hexStartingPoint + hexes[i]["x"] * Settings.hexXMultiplier;
       var z = Settings.hexStartingPoint + hexes[i]["z"] * Settings.hexZMultiplier;
       if(hexes[i]["z"]%2==1) x = Settings.hexStartingPoint + hexes[i]["x"] * Settings.hexXMultiplier + Settings.hexXAddition;
       var cell = new Hex3D(hexes[i]["dirIn"]/60,hexes[i]["dirOut"]/60, hexes[i]["type"], -z,-x);
       cell.position.set(-z,0,-x);
       scene.add(cell);

       if(hexes[i]["type"] == "ENEMY"){
        var ally = new Ally(true);
        scene.add(ally);
        ally.position.set(-z,Settings.playerYPosition,-x)
        allies.push(ally);
      }

       if(i==0){
         player_obj = new Player();
         player = player_obj.getPlayer();

         var first_doors = cell.getObjectByName("doors").getObjectByName("door_" + hexes[i]["dirIn"]);
         scene.updateMatrixWorld(true);
         var first_doors_position = new THREE.Vector3();
         first_doors_position.setFromMatrixPosition( first_doors.matrixWorld );
         player.position.set(first_doors_position.x,Settings.playerYPosition,first_doors_position.z)

         scene.add(player);
         playerMovement.init();
       }
     }
     ui.ringListener();
   }
}

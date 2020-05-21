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
       var cell = new Hex3D(hexes[i]["dirIn"]/60,hexes[i]["dirOut"]/60, hexes[i]["type"]);
       var x = Settings.hexStartingPoint + hexes[i]["x"] * Settings.hexXMultiplier;
       var z = Settings.hexStartingPoint + hexes[i]["z"] * Settings.hexZMultiplier;
       if(hexes[i]["z"]%2==1) x = Settings.hexStartingPoint + hexes[i]["x"] * Settings.hexXMultiplier + Settings.hexXAddition;
       cell.position.x = -z;
       cell.position.z = -x
       scene.add(cell)
     }
   }
}

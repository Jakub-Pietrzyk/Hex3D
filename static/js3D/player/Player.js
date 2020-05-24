class Player {

   constructor(){
       this.container = new THREE.Object3D();
       this.model = new Model()
       this.model.loadModel("../models3D/player/playerModel3D.js", function (modeldata) {
          player_obj.getPlayer().add(modeldata);
          player_obj.model.mixer = new THREE.AnimationMixer(modeldata.children[0]);
       })
   }

   getPlayer(){
     return this.container
   }
}

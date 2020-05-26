class Ally extends THREE.Object3D {

    constructor(with_model=false) {
        super()
        this.with_model = with_model
        this.name = "ally_" + allies.length
        this.clock = new THREE.Clock();
        this.can_stop = false;
        this.started = true
        if(with_model){
          this.model = new Model()
          var instance = this
          this.model.loadModel("../models3D/ally/",instance.name, Settings.allyScale, function (modeldata) {
             instance.add(modeldata);
             instance.model.mixer = new THREE.AnimationMixer(modeldata.children[0]);
          })
        } else {
          this.allyMesh = new THREE.Mesh(Settings.allyGeometry, Settings.allyMaterial);
          this.allyMesh.name = this.name
          this.add(this.allyMesh)
        }

        this.minDistance = Settings.allyDistanceToPlayer
        this.ring = null;
    }

    startGoingAfterPlayer(){
      var allyClickedVect = player.position.clone();
      this.directionVect = allyClickedVect.clone().sub(this.position).normalize();
      var allyRotate = Math.atan2(
          this.position.clone().x - allyClickedVect.x,
          this.position.clone().z - allyClickedVect.z
       )
       if(this.with_model){
         this.model.container.rotation.y = allyRotate - Math.PI/2;
       } else {
         this.allyMesh.rotation.y = allyRotate - Math.PI;
       }

       if(this.with_model && this.model.mixer && this.canMove() && !this.can_stop){
         this.model.mixer.stopAllAction();
         this.model.setAnimation("run");
         this.can_stop = true;
       }
    }

    canMove(){
      return this.position.distanceTo( player.position ) > this.minDistance
    }

    updateModel() {
        var delta = this.clock.getDelta();
        if (this.model.mixer) this.model.mixer.update(delta)
    }
}

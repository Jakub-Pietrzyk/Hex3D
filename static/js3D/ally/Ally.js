class Ally extends THREE.Object3D {

    constructor() {
        super()

        this.allyMesh = new THREE.Mesh(Settings.allyGeometry, Settings.allyMaterial);
        this.add(this.allyMesh)
        this.minDistance = Settings.allyDistanceToPlayer
    }

    startGoingAfterPlayer(){
      var allyClickedVect = player.position.clone();
      this.directionVect = allyClickedVect.clone().sub(this.position).normalize();
      var allyRotate = Math.atan2(
          this.position.clone().x - allyClickedVect.x,
          this.position.clone().z - allyClickedVect.z
       )
       this.allyMesh.rotation.y = allyRotate - Math.PI;
    }

    canMove(){
      console.log(Settings.allyDistanceToPlayer * clicked_allies.length);
      return this.position.distanceTo( player.position ) > this.minDistance
    }
}

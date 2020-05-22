class PlayerMovement {
  constructor(){
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();
    this.clicked_point = null;
  }

  init(){
    $(document).mousedown(function (event) {
        playerMovement.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        playerMovement.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        playerMovement.raycaster.setFromCamera(playerMovement.mouseVector, camera);

        var intersects = playerMovement.raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
         clickedVect = intersects[0].point;
         directionVect = clickedVect.clone().sub(player.position).normalize();
         var playerRotate = Math.atan2(
             player.position.clone().x - clickedVect.x,
             player.position.clone().z - clickedVect.z
          )
          player_obj.getModel().rotation.y = playerRotate - Math.PI

         if(playerMovement.clicked_point == null){
           playerMovement.createClickedPoint();
         }
         playerMovement.moveClickedPoint();
      }
    })
  }

  createClickedPoint(){
    this.clicked_point = new THREE.Mesh(Settings.pointGeometry, Settings.pointMaterial);
    scene.add(this.clicked_point);
  }

  moveClickedPoint(){
    this.clicked_point.position.set(clickedVect.x, 5, clickedVect.z);
  }

  canMove(){
    if(this.clicked_point){
      return Math.round(player.position.x) != Math.round(playerMovement.clicked_point.position.x)  && Math.round(player.position.z) != Math.round(playerMovement.clicked_point.position.z)
    } else {
      return false;
    }
  }
}

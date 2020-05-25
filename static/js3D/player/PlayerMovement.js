class PlayerMovement {
  constructor(){
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();
    this.clicked_point = null;
    this.can_stop = true;
  }

  init(){
    $(document).mousedown(function (event) {
      $(document).mousemove(function(event){
        playerMovement.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        playerMovement.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        playerMovement.raycaster.setFromCamera(playerMovement.mouseVector, camera);

        var intersects = playerMovement.raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
         if (allies && allies.includes(intersects[0].object.parent)) {
           intersects[0].object.parent.startGoingAfterPlayer();
           if(!clicked_allies.includes(intersects[0].object.parent)) {
             clicked_allies.push(intersects[0].object.parent);
             intersects[0].object.parent.minDistance = Settings.allyDistanceToPlayer * clicked_allies.length
           }
         } else {
           clickedVect = intersects[0].point;
           clickedVect.y = Settings.playerYPosition;
           directionVect = clickedVect.clone().sub(player.position).normalize();
           var playerRotate = Math.atan2(
               player.position.clone().x - clickedVect.x,
               player.position.clone().z - clickedVect.z
            )
            player_obj.model.container.rotation.y = playerRotate - Math.PI/2

           if(playerMovement.clicked_point == null){
             playerMovement.createClickedPoint();
           }
           playerMovement.moveClickedPoint();

           if(player_obj.model.mixer && playerMovement.canMove() && !playerMovement.can_stop){
             player_obj.model.mixer.stopAllAction();
             player_obj.model.setAnimation("run");
             player_obj.model.setAnimation("stand");
             playerMovement.can_stop = true;
           }
         }
      }
      })
    })

    $(document).mouseup(function(event){
      $(document).off('mousemove');
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
      return player.position.distanceTo(playerMovement.clicked_point.position) > Settings.playerWalkingPrecision
    } else {
      return false;
    }
  }
}

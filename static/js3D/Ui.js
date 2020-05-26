class Ui {
    constructor(){
      this.lightInitialized = false;
      this.raycaster = new THREE.Raycaster();
      this.mouseVector = new THREE.Vector2();
      this.ring = null;
      this.ally_with_ring = null
    }

    addLightControls(){
      this.lightInitialized = true;

      var div = $("<div class='ranges'>");
      var intensivity_range = $("<input type='range' class='range' id='lightIntensivityRange' min='1' max='100' value='10'>");
      var height_range = $("<input type='range' class='range' id='lightHeightRange' min='2' max='100' value='20'>");
      div.append(intensivity_range);
      div.append(height_range);
      $("body").append(div);
    }

    ringListener(){
      $(document).mousemove(function(event){
        ui.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        ui.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        ui.raycaster.setFromCamera(ui.mouseVector, camera);

        var intersects = ui.raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
         if (allies && (allies.includes(intersects[0].object.parent) || allies.includes(intersects[0].object.parent.parent))) {
           var obj;
           if(allies.includes(intersects[0].object.parent)){
             obj = intersects[0].object.parent
           } else if(allies.includes(intersects[0].object.parent.parent)){
             obj = intersects[0].object.parent.parent
           }
           if( !clicked_allies.includes(obj) && obj.ring == null){
             obj.ring = new Ring(Settings.ringGeometry, Settings.ringMaterial)
             obj.ring.position.set(obj.position.x,-5, obj.position.z);
             scene.add(obj.ring)
             ui.ring = obj.ring;
             ui.ally_with_ring = obj;
           }
         } else if(ui.ring && ui.ally_with_ring) {
           scene.remove(ui.ring)
           ui.ally_with_ring.ring = null
           ui.ring = null;
           ui.ally_with_ring = null;
          }
        }
      })
    }
}

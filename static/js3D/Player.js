class Player {

   constructor(){

       this.container = new THREE.Object3D()
       this.model = new THREE.Mesh(Settings.playerGeometry, Settings.playerMaterial);
       this.axes = new THREE.AxesHelper(200);
       this.model.add(this.axes);
       this.container.add(this.model)
   }

   getModel(){
     return this.model
   }

   getPlayer(){
     return this.container
   }
}

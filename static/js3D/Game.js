console.log("Wczytano plik Game.js");

var scene;
var renderer;
var camera;
var level3D;
var ui;
var lights = [];
var player_obj;
var player;
var clickedVect = new THREE.Vector3(0,0,0);
var directionVect = new THREE.Vector3(0,0,0);
var playerMovement = new PlayerMovement();
var clock = new THREE.Clock();
var delta;

$(document).ready(function () {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(Settings.backgroundColor);
  renderer.setSize(window.innerWidth, window.innerHeight);
  $("#root").append( renderer.domElement );
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,10000);

  if(window.location.pathname == "/hex"){
    camera.position.set(0,300,-1)
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
      renderer.render(scene, camera)
    });
  }

  var axes = new THREE.AxesHelper(1000)
  scene.add(axes);

  var plane = new THREE.Mesh( Settings.planeGeometry, Settings.planeMaterial );
  plane.rotateX( Math.PI / 2 );
  scene.add( plane );

  ui = new Ui();
  if(window.location.pathname == "/game"){
    level3D = new Level3D();
  } else if(window.location.pathname == "/hex"){
    var cell = new Hex3D(1,4, "LIGHT")
    cell.rotateY(Math.PI/3)
    scene.add(cell)
  } else if(window.location.pathname == "/movement"){
    player_obj = new Player();
    player = player_obj.getPlayer();
    scene.add(player);
    playerMovement.init();
  }


  render();
})

function render() {
  if(player_obj){
    delta = clock.getDelta();
    player_obj.model.updateModel();
  }

  requestAnimationFrame(render);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);

  if(ui.lightInitialized){
    for(var i=0;i<lights.length;i++){
      lights[i]["height"].position.y = -$("#lightHeightRange").val();
      lights[i]["intensity"].intensity = $("#lightIntensivityRange").val()/10;
    }
  }

  if(playerMovement.canMove()){
    player.translateOnAxis(directionVect, 2)
  }

  if(player_obj && player_obj.model.mixer &&!playerMovement.canMove() && playerMovement.can_stop) {
    player_obj.model.mixer.stopAllAction();
    player_obj.model.setAnimation("attack");
    playerMovement.can_stop = false
  }

  if(player){
    camera.position.x = player.position.x
    camera.position.z = player.position.z + 150
    camera.position.y = player.position.y + 150
    camera.lookAt(player.position)
  }
}

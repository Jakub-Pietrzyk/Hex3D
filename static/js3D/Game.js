console.log("Wczytano plik Game.js");

var scene;
var renderer;
var camera;
var level3D;
var ui;
var lights = [];

$(document).ready(function () {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(Settings.backgroundColor);
  renderer.setSize(window.innerWidth, window.innerHeight);
  $("#root").append( renderer.domElement );
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,10000);
  camera.position.set(0,300,-1)

  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControl.addEventListener('change', function () {
    renderer.render(scene, camera)
  });

  var axes = new THREE.AxesHelper(1000)
  scene.add(axes);

  var geometry = new THREE.PlaneGeometry( Settings.planeSize, Settings.planeSize, Settings.planeSegments, Settings.planeSegments );
  var material = new THREE.MeshBasicMaterial( {color: 0x111111, side: THREE.DoubleSide, wireframe: true} );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotateX( Math.PI / 2 );
  scene.add( plane );

  ui = new Ui();
  if(window.location.pathname == "/game"){
    level3D = new Level3D();
  } else if(window.location.pathname == "/hex"){
    var cell = new Hex3D(1,4, "LIGHT")
    cell.rotateY(Math.PI/3)
    scene.add(cell)
  }


  render();
})

function render() {

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

}

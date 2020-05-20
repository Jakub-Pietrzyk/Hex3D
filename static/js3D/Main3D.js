console.log("Wczytano plik Main3D.js");

var scene;
var renderer;
var camera;

$(document).ready(function () {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0xEEEEEE);
  renderer.setSize(window.innerWidth, window.innerHeight);
  $("#root").append( renderer.domElement );
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,10000);
  camera.position.set(0,300,-1)
  camera.lookAt(scene.position)

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

  var cell = new Hex3D(1,4)
  cell.rotateY(Math.PI/3)
  scene.add(cell)

  render();
})

function render() {

  requestAnimationFrame(render);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}

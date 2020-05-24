var Settings = {
  backgroundColor: 0xEEEEEE,

  planeGeometry: new THREE.PlaneGeometry( 1000, 1000, 30, 30 ),
  planeMaterial: new THREE.MeshBasicMaterial( {color: 0x111111, side: THREE.DoubleSide, wireframe: true} ),

  hexWallGeometry: new THREE.BoxGeometry( 60, 30, 10 ),
  hexWallMaterial: new THREE.MeshPhongMaterial( {color: 0x0000ff} ),
  hexFloorGeometry: new THREE.CylinderGeometry(60,60,5,12),
  hexFloorYPosition: 10,
  hexRadius: 50,
  hexHeight: 15,
  hexStartingPoint: -200,
  hexXMultiplier: 110,
  hexZMultiplier: 95,
  hexXAddition: 55,

  doorsMaterial: new THREE.MeshPhongMaterial({color: 0x0000ff, opacity: 0}),

  lightColor: 0xffffff,
  lightStartingIntensity: 0.5,
  lightGeometry: new THREE.SphereGeometry(5, 10, 2),
  lightMaterial: new THREE.MeshBasicMaterial({color: 0x00ff00,side: THREE.DoubleSide,wireframe: true,transparent: true, opacity: 0.5}),

  treasureGeometry: new THREE.BoxGeometry( 10, 10, 10 ),
  treasureMaterial: new THREE.MeshPhongMaterial( {color: 0xd4af37} ),

  playerGeometry: new THREE.BoxGeometry(15,15,15),
  playerMaterial: new THREE.MeshPhongMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe: true}),
  playerYPosition: 5,
  playerScale: 0.6,

  pointGeometry: new THREE.SphereGeometry(5, 10, 2),
  pointMaterial: new THREE.MeshBasicMaterial({color: 0xff0000,side: THREE.DoubleSide,wireframe: true,transparent: true, opacity: 0.5})
}

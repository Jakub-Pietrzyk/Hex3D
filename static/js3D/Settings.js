var Settings = {
  backgroundColor: 0xEEEEEE,

  planeSize: 1000,
  planeSegments: 30,

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
  treasureMaterial: new THREE.MeshPhongMaterial( {color: 0xd4af37} )
}

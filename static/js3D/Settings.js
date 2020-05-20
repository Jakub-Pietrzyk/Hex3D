var Settings = {
  planeSize: 1000,
  planeSegments: 30,

  hexWallGeometry: new THREE.BoxGeometry( 60, 30, 10 ),
  hexWallMaterial: new THREE.MeshBasicMaterial( {color: 0x0000ff} ),
  hexRadius: 50,
  hexHeight: 15,

  doorsMaterial: new THREE.MeshBasicMaterial({color: 0x0000ff, opacity: 0.05})
}

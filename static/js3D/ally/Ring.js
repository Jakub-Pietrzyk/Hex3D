class Ring extends THREE.Mesh {
    constructor(geo,mat) {
        super(geo, mat)
        this.rotateX( Math.PI / 2 );
    }
}

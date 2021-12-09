const THREE = require('three');
const {ArcballControls} = require("three/examples/jsm/controls/ArcballControls");
let camera, controls, scene, renderer;
let width, height;


init();

animate();

function init() {
    height = window.innerHeight;
    width = window.innerWidth;

    // create a new Threejs scene
    scene = new THREE.Scene();

    // setup the camera
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    setCameraPosition(camera, 15, 0, 0);

    // setup the Three Js renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#e5e5e5');
    renderer.setSize(width, height);


    // append the renderer to the body
    document.body.appendChild(renderer.domElement);

    // setup controls
    controls = new ArcballControls( camera, renderer.domElement, scene );

    // set Cubetexture

    const loader = new THREE.CubeTextureLoader();

    loader.setPath('dist/img/cubetextures/stars/');

    const namePrefix = 'stars_';

    let CubeTexture = loader.load([
        namePrefix + 'px.jpg',
        namePrefix + 'nx.jpg',
        namePrefix + 'py.jpg',
        namePrefix + 'ny.jpg',
        namePrefix + 'pz.jpg',
        namePrefix + 'nz.jpg',
    ]);

    // create new geometry (3d object) and add to scene
    let geometry = new THREE.SphereGeometry(3, 30, 30);
    let material = new THREE.MeshLambertMaterial( { color: '#f1f1f1' } );
    let mesh = new THREE.Mesh(geometry, material);

    scene.background = CubeTexture;
    scene.add(mesh);
    scene.add(camera);

    // create a new pointlight
    setupLight();

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

function setCameraPosition(camera, x, y, z) {
    camera.position.set(x, y, z);
}

function setupLight() {
    let spotLight = new THREE.SpotLight(0xffffff, 0.8);

    spotLight.position.set(-5, 5, 0);
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    // add light to scene
    camera.add(spotLight);

    // show helper (debugging)

    const SpotLightHelper = new THREE.SpotLightHelper(spotLight, 'rgb(255, 255, 0)');

    scene.add(SpotLightHelper);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    render();
}

function render() {

    renderer.render(scene, camera);

}

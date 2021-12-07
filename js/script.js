const THREE = require('three');
const {OrbitControls} = require("three/examples/jsm/controls/OrbitControls");
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
    camera.position.set(5, 5, 5);


    // setup the Three Js renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#e5e5e5');
    renderer.setSize(width, height);


    // append the renderer to the body
    document.body.appendChild(renderer.domElement);

    // setup controls
    controls = new OrbitControls(camera, renderer.domElement);

    // set auto rotate true
    controls.autoRotate = true;

    // create new geometry (3d object) and add to scene
    let geometry = new THREE.SphereGeometry(2, 15, 15);
    let material = new THREE.MeshLambertMaterial( { color: '#f1f1f1' } );
    let mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // create a new pointlight
    let light = new THREE.PointLight(0XFFFFFF, 1, 500);
    // set light position
    light.position.set(10, 0, 25);

    // add light to scene
    scene.add(light)

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    render();
}

function render() {

    renderer.render(scene, camera);

}

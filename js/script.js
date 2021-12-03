// import * as THREE from "../node_modules/three/src/Three.js";
const THREE = require('three');
const {DragControls} = require("three/examples/jsm/controls/DragControls");
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function (e) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});


let geometry = new THREE.SphereGeometry(2, 15, 15);
let material = new THREE.MeshLambertMaterial({color: '#f1f1f1'});
let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

let light = new THREE.PointLight(0XFFFFFF, 1, 500);

light.position.set(10, 0, 25);

scene.add(light);

renderer.render(scene, camera);
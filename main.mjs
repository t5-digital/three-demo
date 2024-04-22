import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const col = new THREE.Color( 0x283f53 );
scene.background = col;

const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
scene.add( light );
const dirLight = new THREE.DirectionalLight( 0xefefff, 1.5 );
dirLight.position.set( 10, 10, 10 );
scene.add( dirLight );

camera.position.z = 5;
// scene.add( cube );

const loader = new GLTFLoader();

window.scene = scene;

loader.load( './static/example.glb', function ( gltf ) {

  scene.add( gltf.scene );
  window.gltf = gltf;

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( './static/alpaca2.glb', function ( gltf ) {

  gltf.scene.scale.set(0.3, 0.3, 0.3);
  gltf.scene.position.set(3, 0, -10);
  scene.add( gltf.scene );
  window.gltf = gltf;

}, undefined, function ( error ) {

	console.error( error );

} );



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );
controls.update();

function animate() {
	requestAnimationFrame( animate );

  controls.update();
	renderer.render( scene, camera );
}
animate();
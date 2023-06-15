import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';


//Creating the Scene
const scene = new THREE.Scene();

//Creating the object in the scene
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
});

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Setting the Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 1000);
camera.position.z = 20;
scene.add(camera);

// adding lights
const lights = new THREE.PointLight(0xfffff, 1, 100)
lights.position.set(10, 10, 10);
scene.add(lights)

//Render to screen
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGL1Renderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3)
renderer.render(scene, camera)





//screen resizing

window.addEventListener('resize', () => {
  //update the sizes
  sizes.width = innerWidth,
  sizes.height = innerHeight

  //camera aspect ratio
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
});

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true
controls.autoRotateSpeed = 5

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
};
loop()

//timeline magic
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: "-100%"}, {y: "0%"} )
tl.fromTo('.title', {opacity: 0 }, {opacity: 1})

//mouse animation
let mouseDown = false;
let rgb = []

window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
  if(mouseDown) {
      rgb = [Math.round((e.pageX / sizes.width) * 255), Math.round((e.pageY / sizes.height) * 255), 150 ]
      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
      gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b}) 
  }
})
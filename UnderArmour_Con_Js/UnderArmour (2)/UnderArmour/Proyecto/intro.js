import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const container = document.getElementById('three-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(2, 0);
const material = new THREE.MeshStandardMaterial({
    color: 0xe31837,
    wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 100);
light.position.set(5, 5, 5);
scene.add(light);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

const btnEntrar = document.getElementById('btn-entrar');
const overlay = document.getElementById('intro-overlay');

btnEntrar.addEventListener('click', () => {
    overlay.classList.add('hidden-overlay');
    setTimeout(() => {
        renderer.dispose();
        container.remove();
    }, 1200);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
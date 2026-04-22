import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let gui;
const state = { variant: 'midnight' };
const instances = [];

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, preserveDrawingBuffer: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( 0x000000, 0 );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

init();

function init() {

    const containers = document.querySelectorAll('.tarjeta-producto .img-producto');

    containers.forEach(container => {
        const imgs = container.querySelectorAll('img');
        imgs.forEach(img => img.remove());
        container.style.position = 'relative';
    });

    new RGBELoader()
        .load( 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/equirectangular/quarry_01_1k.hdr', function ( texture ) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            const loader = new GLTFLoader();
            loader.load( 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/models/gltf/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf', function ( gltf ) {

                gui = new GUI();
                const parser = gltf.parser;
                const variantsExtension = gltf.userData.gltfExtensions[ 'KHR_materials_variants' ];
                const variants = variantsExtension.variants.map( ( variant ) => variant.name );
                const variantsCtrl = gui.add( state, 'variant', variants ).name( 'Variant' );

                containers.forEach(container => {
                    const scene = new THREE.Scene();
                    scene.environment = texture;

                    const model = gltf.scene.clone();
                    model.scale.set( 10.0, 10.0, 10.0 );
                    scene.add( model );

                    const camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 0.25, 20 );
                    camera.position.set( 2.5, 1.5, 3.0 );

                    const canvas2d = document.createElement('canvas');
                    canvas2d.width = container.clientWidth * window.devicePixelRatio;
                    canvas2d.height = container.clientHeight * window.devicePixelRatio;
                    canvas2d.style.width = '100%';
                    canvas2d.style.height = '100%';
                    canvas2d.style.position = 'absolute';
                    canvas2d.style.top = '0';
                    canvas2d.style.left = '0';
                    canvas2d.style.zIndex = '0';
                    container.appendChild(canvas2d);

                    const ctx2d = canvas2d.getContext('2d');

                    const controls = new OrbitControls( camera, canvas2d );
                    controls.minDistance = 2;
                    controls.maxDistance = 10;
                    controls.target.set( 0, 0.5, - 0.2 );
                    controls.enableZoom = false;
                    controls.update();

                    selectVariant( scene, parser, variantsExtension, state.variant );

                    instances.push({ scene, camera, model, container, controls, canvas2d, ctx2d });
                });

                variantsCtrl.onChange( ( value ) => {
                    instances.forEach(instance => {
                        selectVariant( instance.scene, parser, variantsExtension, value );
                    });
                } );

                animate();

            } );

        } );

    window.addEventListener( 'resize', onWindowResize );
}

function selectVariant( scene, parser, extension, variantName ) {

    const variantIndex = extension.variants.findIndex( ( v ) => v.name.includes( variantName ) );

    scene.traverse( async ( object ) => {

        if ( ! object.isMesh || ! object.userData.gltfExtensions ) return;

        const meshVariantDef = object.userData.gltfExtensions[ 'KHR_materials_variants' ];

        if ( ! meshVariantDef ) return;

        if ( ! object.userData.originalMaterial ) {
            object.userData.originalMaterial = object.material;
        }

        const mapping = meshVariantDef.mappings
            .find( ( mapping ) => mapping.variants.includes( variantIndex ) );

        if ( mapping ) {
            object.material = await parser.getDependency( 'material', mapping.material );
            parser.assignFinalMaterial( object );
        } else {
            object.material = object.userData.originalMaterial;
        }

    } );

}

function onWindowResize() {

    instances.forEach(instance => {
        const width = instance.container.clientWidth;
        const height = instance.container.clientHeight;

        instance.camera.aspect = width / height;
        instance.camera.updateProjectionMatrix();

        instance.canvas2d.width = width * window.devicePixelRatio;
        instance.canvas2d.height = height * window.devicePixelRatio;
    });

}

function animate() {

    requestAnimationFrame( animate );

    instances.forEach(instance => {
        if ( instance.model ) {
            instance.model.rotation.y += 0.005;
        }
        instance.controls.update();

        const rect = instance.container.getBoundingClientRect();
        if ( rect.bottom < 0 || rect.top > window.innerHeight ||
             rect.right < 0 || rect.left > window.innerWidth ) {
            return;
        }

        const width = instance.container.clientWidth;
        const height = instance.container.clientHeight;

        const targetWidth = width * window.devicePixelRatio;
        const targetHeight = height * window.devicePixelRatio;
        if (renderer.domElement.width !== targetWidth || renderer.domElement.height !== targetHeight) {
            renderer.setSize( width, height, false );
        }

        renderer.render( instance.scene, instance.camera );

        instance.ctx2d.clearRect(0, 0, targetWidth, targetHeight);
        instance.ctx2d.drawImage(renderer.domElement, 0, 0, targetWidth, targetHeight);
    });

}
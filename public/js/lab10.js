var container;
var camera, scene, renderer, clock;
var house, windmill_base, windmill_blade1, windmill_blade2, windmill_blade3;
var windmill_rot_speed = 0.5;


document.addEventListener("DOMContentLoaded", function(event) { 
    init();
    animate();
    window.addEventListener('keydown',function(e) {
        switch (e.keyCode) {
            case 81:
                windmill_rot_speed -= 0.1;
                break;
            case 87:
                windmill_rot_speed += 0.1;
                break;
            case 32:
                windmill_rot_speed = 0;
        }
    });

});



function init() {
    container = document.querySelector( '#output' );

    //Camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 50, 100, 250 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );

    clock = new THREE.Clock();
    // loading manager
    var loadingManager = new THREE.LoadingManager( function () {
        scene.add( house );
        scene.add( windmill_base );
        scene.add( windmill_blade1 );
        scene.add( windmill_blade2 );
        scene.add( windmill_blade3 );
    } );


    // House
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( './models/house.dae', function ( collada ) {
        house = collada.scene;
        house.castShadow = true;
        house.position.x = 40;
        house.position.z = 20;
        house.position.y = 0;
        house.rotation.z = 0.1*Math.PI;
    } );

    // Windmill_base
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( './models/windmill_base.dae', function ( collada ) {
        windmill_base = collada.scene;
        windmill_base.castShadow = true;
        windmill_base.position.x = 0;
        windmill_base.position.z = 0;
        windmill_base.position.y = 0;
    } );

    // Windmill_blade1
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( './models/windmill_blade.dae', function ( collada ) {
        windmill_blade1 = collada.scene;
        windmill_blade1.castShadow = true;
        windmill_blade1.position.x = 0;
        windmill_blade1.position.z = 3.424;
        windmill_blade1.position.y = 80.965;
    } );

    // Windmill_blade2
    var loader = new THREE.ColladaLoader(loadingManager);
    loader.load('./models/windmill_blade.dae', function (collada) {
        windmill_blade2 = collada.scene;
        windmill_blade2.castShadow = true;
        windmill_blade2.position.x = 0;
        windmill_blade2.position.z = 3.424;
        windmill_blade2.position.y = 80.965;
        windmill_blade2.rotation.y = 0.66*Math.PI;
    });

    // Windmill_blade3
    var loader = new THREE.ColladaLoader(loadingManager);
    loader.load('./models/windmill_blade.dae', function (collada) {
        windmill_blade3 = collada.scene;
        windmill_blade3.castShadow = true;
        windmill_blade3.position.x = 0;
        windmill_blade3.position.z = 3.424;
        windmill_blade3.position.y = 80.965;
        windmill_blade3.rotation.y = 1.32*Math.PI;
    });

    //Light
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.3 );
    //ambientLight.castShadow = true;
    scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 10, 500, 100 ).normalize();
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512; 
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;   
    directionalLight.shadow.camera.far = 500;    
    scene.add( directionalLight );

    var spotLightHelper = new THREE.SpotLightHelper( directionalLight );
    scene.add( spotLightHelper );

    //GROUND PLANE
    var loader = new THREE.TextureLoader();
    var planeTexture = loader.load('models/texture/grass.jpg');
    planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
	planeTexture.repeat.set( 200, 200 );
	planeTexture.anisotropy = 16;
    var planeMaterial = new THREE.MeshLambertMaterial( { map: planeTexture } );
    var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), planeMaterial );
    plane.receiveShadow = true;
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane);

    //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //CONTROLLER
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 200;

    //Resize handler
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function render() {
    var delta = clock.getDelta();
    
if ( windmill_blade1 !== undefined ) {
    windmill_blade1.rotation.y += delta * windmill_rot_speed;
}
if ( windmill_blade2 !== undefined ) {
    windmill_blade2.rotation.y += delta * windmill_rot_speed;
}
if ( windmill_blade3 !== undefined ) {
    windmill_blade3.rotation.y += delta * windmill_rot_speed;
}
    renderer.render( scene, camera );
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
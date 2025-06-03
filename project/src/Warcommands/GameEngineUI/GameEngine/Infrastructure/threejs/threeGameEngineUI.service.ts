import "reflect-metadata";
import { inject, injectable } from 'inversify';
import * as THREE from 'three';
import { GameEngineUIService } from "../../Domain/gameEngineUI.service.ts";
import { GameMap } from "../../../GameService/Domain/model/gameMap.ts";
import { ThreeHexMapBuilderService } from "./threeHexMapBuilderService.ts";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { MapControls } from "three/examples/jsm/Addons.js";


@injectable()
export class ThreeGameEngineUIService implements GameEngineUIService {

    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private readonly renderer: THREE.WebGLRenderer;

    constructor(@inject(ThreeHexMapBuilderService) private readonly threeHexMapBuilderService: ThreeHexMapBuilderService) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        this.renderer = new THREE.WebGLRenderer();
        this.threeHexMapBuilderService.setScene(this.scene);
    }

    initializeScene(): void {
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        const stats = new Stats();
        document.body.appendChild(stats.dom)

        
        const controls = new MapControls( this.camera, this.renderer.domElement );
        this.camera.position.set( 0, 5, 10 );
        this.camera.lookAt(0,0,0);
        controls.update();

        
        const stats2 = rendererStats();
        document.body.appendChild(stats2.domElement)
        stats2.domElement.style.position	= 'absolute'
        stats2.domElement.style.left	= '0px'
        stats2.domElement.style.bottom	= '0px'

        const scene = this.scene;
        const camera = this.camera;
        const renderer = this.renderer;
        function animate() {

            renderer.render( scene, camera );
            stats.update();
            stats2.update(renderer);

        }

        this.renderer.setAnimationLoop( animate );
        animate();

        window.addEventListener( 'resize', this.onWindowResize() );
    }

    drawMap(map: GameMap): void {
        this.threeHexMapBuilderService.drawMap(map);



        // Greys = `hsl(0, 0%, ${MathUtils.randFloat(30, 35) }%)`;
        // Greens = `hsl(120, 100%, ${MathUtils.randFloat(30, 35) }%)`
        // Dark Greens = `hsl(120, 60%, ${MathUtils.randFloat(30, 35) }%)``
        // Brown = `hsl(24, 100%, ${MathUtils.randFloat(32, 35) }%)`
        // Blue = `hsl(240, 100%, ${MathUtils.randFloat(30, 35) }%)`

        /*
        const loader = new FontLoader();
        const that = this;

        loader.load(
            'fonts/helvetiker_regular.typeface.json',

            // onLoad callback
            function ( font ) {
                // do something with the font

                let x: number = 0;
                let y: number = 0;
                let index: number = 0;

                for (const tile: HexTile of map.getMap()) {

                    // Calculate the position of the hexagon by their cube coordinated
                    x = Math.sqrt(3) * tile.getCoordinates().q + Math.sqrt(3) / 2 * tile.getCoordinates().r;
                    z = 3 / 2 * tile.getCoordinates().r;

                    that.drawIndex(font, "i:" + index.toString(),x - 0.2,z, 0xffffff);
                    that.drawIndex(font, "r:" + tile.getCoordinates().r.toString(),x + 0.3,z, 0x1111ff);
                    that.drawIndex(font, "q:" + tile.getCoordinates().q.toString(),x - 0.5,z + 0.3, 0x11ff11);
                    that.drawIndex(font, "s:" + tile.getCoordinates().s.toString(),x - 0.5,z - 0.3, 0xff1111);
                    index++;

                }



            },

            // onProgress callback
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // onError callback
            function ( err ) {
                console.log( 'An error happened' );
            }
        );
        */

        //this.drawHexOuterLinesByLineGeometry(map);

        //this.testCubeCoordinatesToArrayIndex(map);
    }



    private onWindowResize(): any {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    /**
     * The next functions were created for testing purposes to draw the outer lines of the hexagons
     * Both of them add a lot of burden to the draw system so they have been discarded
     */

    /*
    private drawIndex(font: any, text: any,x: any,z: any, color: any):void {
        const geometry = new TextGeometry( text, {
            font: font,
            size: 0.1,
            depth: 0,
        } );

        geometry.computeBoundingBox();

        const material = new THREE.MeshBasicMaterial( { color } );
        const textMesh1 = new THREE.Mesh( geometry, material );
        textMesh1.position.set( x, 0.1, z );
        textMesh1.rotation.x = -Math.PI / 2;
        this.scene.add(textMesh1);
    }

    // With a radius of 500 hexagons this functions launch a performance of 44 FPS
    private drawHexOuterLinesByRingGeometry(map: GameMap): void {

        const innerHexagonalGeometry = new THREE.RingGeometry( 0.99, 1, 6, 1, 0, Math.PI * 2 );
        const material = new THREE.LineBasicMaterial( { color: 0xffff00 } );

        const mesh = new THREE.InstancedMesh( innerHexagonalGeometry, material, map.getMap().length );
        let x: number = 0;
        let y: number = 0;
        let index: number = 0;
        const transform = new THREE.Object3D();

        for (const tile of map.getMap()) {

            x = Math.sqrt(3) * tile.getCoordinates().q + Math.sqrt(3) / 2 * tile.getCoordinates().r;
            y = 3 / 2 * tile.getCoordinates().r;

            transform.position.set(x, y, 0.01);
            transform.rotation.z = 0.523599;

            transform.updateMatrix();
            mesh.setMatrixAt(index, transform.matrix);
            index++;

        }
        this.scene.add(mesh);


    }

    // With a radius of 500 hexagons this functions launch a performance of 45 FPS
    private drawHexOuterLinesByLineGeometry(map: GameMap): void {

        const outerHexagonPoints:Array<THREE.Vector3> = this.threeHexTileBuilderService.outerHexagonLines();
        const outerHexagonPointsCoordinates:Array<number> = [];

        let x: number = 0;
        let y: number = 0;

        for (const tile of map.getMap()) {

            for (const outerHexagonPoint of outerHexagonPoints) {
                x = Math.sqrt(3) * tile.getCoordinates().q + Math.sqrt(3) / 2 * tile.getCoordinates().r + outerHexagonPoint.x;
                y = 3 / 2 * tile.getCoordinates().r + outerHexagonPoint.y;

                outerHexagonPointsCoordinates.push(x, y, outerHexagonPoint.z);
            }
        }

        const hexagonGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
        hexagonGeometry.setAttribute('position', new THREE.Float32BufferAttribute(outerHexagonPointsCoordinates, 3));
        hexagonGeometry.computeBoundingSphere();
        const material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.4, transparent: true } );
        const hexagon = new THREE.Line(hexagonGeometry, material);
        this.scene.add(hexagon);

    }
    */
}

const rendererStats = function (){

    let container	= document.createElement( 'div' );
    container.style.cssText = 'width:250px;opacity:0.9;cursor:pointer';

    let msDiv	= document.createElement( 'div' );
    msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#200;';
    container.appendChild( msDiv );

    let msText	= document.createElement( 'div' );
    msText.style.cssText = 'padding-bottom:5px;color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:bold;line-height:15px';
    msText.innerHTML= 'WebGLRenderer';
    msDiv.appendChild( msText );

    const msTexts: any[]	= [];
    let nLines	= 11;
    for(let i = 0; i < nLines; i++){
        msTexts[i]	= document.createElement( 'div' );
        msTexts[i].style.cssText = 'padding-bottom:5px;color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:bold;line-height:15px';
        msDiv.appendChild( msTexts[i] );
        msTexts[i].innerHTML= '-';
    }


    let lastTime	= Date.now();
    return {
        domElement: container,

        update: function(webGLRenderer: any){
            // sanity check
            console.assert(webGLRenderer instanceof THREE.WebGLRenderer)

            // refresh only 30time per second
            if( Date.now() - lastTime < 1000/30 )	return;
            lastTime	= Date.now()

            let i	= 0;
            msTexts[i++].textContent = "== Memory =====";
            msTexts[i++].textContent = "Programs: "	    + webGLRenderer.info.memory.programs;
            msTexts[i++].textContent = "Geometries: "   + webGLRenderer.info.memory.geometries;
            msTexts[i++].textContent = "Textures: "	    + webGLRenderer.info.memory.textures;

            msTexts[i++].textContent = "== Render =====";
            msTexts[i++].textContent = "Calls: "	    + webGLRenderer.info.render.calls;
            msTexts[i++].textContent = "Vertices: "	    + webGLRenderer.info.render.vertices;
            msTexts[i++].textContent = "Faces: "	    + webGLRenderer.info.render.faces;
            msTexts[i++].textContent = "Points: "	    + webGLRenderer.info.render.points;
            msTexts[i++].textContent = "Triangles: "	+ webGLRenderer.info.render.triangles;
            msTexts[i++].textContent = "Lines: "	    + webGLRenderer.info.render.lines;
        }
    }
};
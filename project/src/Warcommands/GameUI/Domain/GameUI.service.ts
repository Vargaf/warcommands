import {inject, injectable} from "inversify";
import * as THREE from "three";
import {SceneService} from "./Scene.service.ts";
import {CameraService} from "./Camera.service.ts";
import {RendererService} from "./Renderer.service.ts";
import {MessageBrokerService} from "./Service/MessageBroker.service.ts";

@injectable()
export class GameUIService {

    constructor(
        @inject(SceneService) private readonly _sceneService: SceneService,
        @inject(CameraService) private readonly _cameraService: CameraService,
        @inject(RendererService) private readonly _rendererService: RendererService,
        @inject(MessageBrokerService) private readonly _messageBrokerService: MessageBrokerService,) {

        this._messageBrokerService.subscribe('map.generated', this.onMapReady.bind(this));
    }

    initialize() {
        this._rendererService.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._rendererService.domElement());

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this._sceneService.add( cube );

        this._cameraService.positionZ(5);

        let animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            this._rendererService.render( this._sceneService.scene(), this._cameraService.camera() );
        }
        this._rendererService.setAnimationLoop( animate );

        window.addEventListener( 'resize', () => {
            this._cameraService.aspect(window.innerWidth, window.innerHeight);
            this._cameraService.updateProjectionMatrix();

            this._rendererService.setSize( window.innerWidth, window.innerHeight );
        } );
    }

    private onMapReady(data: any) {
        console.log(data);
    }
}
import {inject, injectable} from "inversify";
import {SceneService} from "./Scene.service.ts";
import {CameraService} from "./Camera.service.ts";
import {RendererService} from "./Renderer.service.ts";
import {MessageBrokerService} from "./MessageBroker.service.ts";
import {MapBuilderService} from "./MapBuilder.service.ts";
import {CameraControlsService} from "./CameraControls.service.ts";

@injectable()
export class GameUIService {

    constructor(
        @inject(SceneService) private readonly _sceneService: SceneService,
        @inject(CameraService) private readonly _cameraService: CameraService,
        @inject(RendererService) private readonly _rendererService: RendererService,
        @inject(MessageBrokerService) private readonly _messageBrokerService: MessageBrokerService,
        @inject(CameraControlsService) private readonly _cameraControlsService: CameraControlsService,
        @inject(MapBuilderService) private readonly _mapBuilderService: MapBuilderService) {

        this._messageBrokerService.subscribe('map.generated', this.onMapReady.bind(this));
    }

    initialize() {

        this.initializeCamera();
        this._cameraControlsService.update();

        this._rendererService.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._rendererService.domElement());

        let animate = () => {
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
        this._mapBuilderService.drawMap(data);
    }

    private initializeCamera(): void {
        this._cameraService.position( 0, 5, 10 );
        this._cameraService.lookAt(0,0,0);
    }
}
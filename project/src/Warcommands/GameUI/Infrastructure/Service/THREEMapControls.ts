import {CameraControlsService} from "../../Domain/Service/CameraControls.service.ts";
import {inject} from "inversify";
import {CameraService} from "../../Domain/Service/Camera.service.ts";
import {RendererService} from "../../Domain/Service/Renderer.service.ts";
import {MapControls} from "three/examples/jsm/Addons.js";


export class THREEMapControls extends CameraControlsService {

    private readonly _mapControls: MapControls;

    constructor(
        @inject(CameraService) private readonly _cameraService: CameraService,
        @inject(RendererService) private readonly _rendererService: RendererService,)
    {
        super();

        this._mapControls = new MapControls(this._cameraService.camera(), this._rendererService.domElement());
    }

    update(): void {
        this._mapControls.update();
    }

}
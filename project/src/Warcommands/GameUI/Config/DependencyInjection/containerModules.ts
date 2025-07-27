import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import {GameUIService} from "../../Domain/Service/GameUI.service.ts";
import {SceneService} from "../../Domain/Service/Scene.service.ts";
import {THREEScene} from "../../Infrastructure/Service/THREE.Scene.ts";
import {CameraService} from "../../Domain/Service/Camera.service.ts";
import {THREECamera} from "../../Infrastructure/Service/THREE.Camera.ts";
import {RendererService} from "../../Domain/Service/Renderer.service.ts";
import {THREERenderer} from "../../Infrastructure/Service/THREE.Renderer.ts";
import {MessageBrokerService} from "../../Domain/Service/MessageBroker.service.ts";
import {SharedMessageBrokerService} from "../../Infrastructure/Service/SharedMessageBroker.service.ts";
import {MapBuilderService} from "../../Domain/Service/MapBuilder.service.ts";
import {ThreeMapBuilderService} from "../../Infrastructure/Service/threeMapBuilder.service.ts";
import {CameraControlsService} from "../../Domain/Service/CameraControls.service.ts";
import {THREEMapControls} from "../../Infrastructure/Service/THREEMapControls.ts";

export const GameUIModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<GameUIService>(GameUIService).toSelf();
        options.bind<SceneService>(SceneService).to(THREEScene).inSingletonScope();
        options.bind<CameraService>(CameraService).to(THREECamera).inSingletonScope();
        options.bind<RendererService>(RendererService).to(THREERenderer).inSingletonScope();
        options.bind<MessageBrokerService>(MessageBrokerService).to(SharedMessageBrokerService);
        options.bind<MapBuilderService>(MapBuilderService).to(ThreeMapBuilderService);
        options.bind<CameraControlsService>(CameraControlsService).to(THREEMapControls);
    }
);
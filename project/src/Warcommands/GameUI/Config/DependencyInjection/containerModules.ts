import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import {GameUIService} from "../../Domain/GameUI.service.ts";
import {SceneService} from "../../Domain/Scene.service.ts";
import {THREEScene} from "../../Infrastructure/THREE.Scene.ts";
import {CameraService} from "../../Domain/Camera.service.ts";
import {THREECamera} from "../../Infrastructure/THREE.Camera.ts";
import {RendererService} from "../../Domain/Renderer.service.ts";
import {THREERenderer} from "../../Infrastructure/THREE.Renderer.ts";

export const GameUIModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<GameUIService>(GameUIService).toSelf();
        options.bind<SceneService>(SceneService).to(THREEScene).inSingletonScope();
        options.bind<CameraService>(CameraService).to(THREECamera).inSingletonScope();
        options.bind<RendererService>(RendererService).to(THREERenderer).inSingletonScope();
    }
);
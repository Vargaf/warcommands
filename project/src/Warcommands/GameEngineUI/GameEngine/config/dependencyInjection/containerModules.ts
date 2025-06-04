import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import { ThreeGameEngineUIService } from "../../Infrastructure/threejs/threeGameEngineUI.service.ts";
import { GameEngineUIService } from "../../Domain/gameEngineUI.service";
import { ThreeHexMapBuilderService } from "../../Infrastructure/threejs/threeHexMapBuilderService.ts";

export const gameEngineModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<GameEngineUIService>(GameEngineUIService).to(ThreeGameEngineUIService);
        options.bind<ThreeHexMapBuilderService>(ThreeHexMapBuilderService).toSelf();
    },
);
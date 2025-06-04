import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import { GameService } from "../../Domain/service/game.service.ts";
import { MapService } from "../../Domain/service/map.service.ts";

export const gameServiceModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<GameService>(GameService).toSelf();
        options.bind<MapService>(MapService).toSelf();
    },
);
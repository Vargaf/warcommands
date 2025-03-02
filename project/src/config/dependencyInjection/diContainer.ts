import {Container} from "inversify";
import { gameEngineModule } from "../../Warcommands/GameEngineUI/GameEngine/config/dependencyInjection/containerModules.ts";
import {
    gameServiceModule
} from "../../Warcommands/GameEngineUI/GameService/config/dependencyInjection/containerModule.ts";

export const diContainer: Container = new Container();

diContainer.load(
    gameEngineModule,
    gameServiceModule
)
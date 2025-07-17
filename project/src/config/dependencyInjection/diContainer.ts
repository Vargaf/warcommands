import {Container} from "inversify";
import { gameEngineModule } from "../../Warcommands_old/GameEngineUI/GameEngine/config/dependencyInjection/containerModules.ts";
import {
    gameServiceModule
} from "../../Warcommands_old/GameEngineUI/GameService/config/dependencyInjection/containerModule.ts";
import {GameUIModule} from "../../Warcommands/GameUI/Config/DependencyInjection/containerModules.ts";
import {GameEngineModule} from "../../Warcommands/GameEngine/Config/DependencyInjection/ContainerModule.ts";

export const diContainer: Container = new Container();

diContainer.load(
    gameEngineModule,
    gameServiceModule,
    GameUIModule,
    GameEngineModule
)
import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import {GameEngineService} from "../../Domain/Service/GameEngine.service.ts";
import {MapBuilderService} from "../../Domain/Service/MapBuilder.service.ts";
import {MessageBrokerService} from "../../Domain/Service/MessageBroker.service.ts";
import {SharedMessageBrokerService} from "../../Domain/Infrastructure/SharedMessageBroker.service.ts";

export const GameEngineModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<GameEngineService>(GameEngineService).toSelf();
        options.bind<MapBuilderService>(MapBuilderService).toSelf();
        options.bind<MessageBrokerService>(MessageBrokerService).to(SharedMessageBrokerService);
    }
);
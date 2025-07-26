import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import {MessageBroker} from "../../MessageBroker/Domain/Service/messageBroker.ts";
import {EmitterMessageBroker} from "../../MessageBroker/Infrastructure/emitterMessageBroker.ts";

export const SharedModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<MessageBroker>(MessageBroker).to(EmitterMessageBroker).inSingletonScope();
    }
);
import { BaseClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-factory.service';
import { BaseClassService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-service';

const factory = (
    baseClassService: BaseClassService
) => {
    return new BaseClassFactoryService(baseClassService);
};

export const provider = {
    provide: BaseClassFactoryService,
    useFactory: factory,
    deps: [
        BaseClassService
    ]
};

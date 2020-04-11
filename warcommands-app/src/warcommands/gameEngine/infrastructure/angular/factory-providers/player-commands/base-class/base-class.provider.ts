import { BaseClassService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/base-class-service';

const factory = () => {
    return new BaseClassService();
};

export const provider = {
    provide: BaseClassService,
    useFactory: factory,
    deps: []
};

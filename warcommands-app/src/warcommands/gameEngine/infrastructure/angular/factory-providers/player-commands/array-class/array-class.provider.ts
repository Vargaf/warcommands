import { ArrayClassService } from 'src/warcommands/gameEngine/domain/player-commands/array-class/services/array-class.service';

const factory = () => {
    return new ArrayClassService();
};

export const provider = {
    provide: ArrayClassService,
    useFactory: factory,
    deps: []
};
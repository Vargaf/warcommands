import { ArrayClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/array-class/services/array-class-factory.service';
import { ArrayClassService } from 'src/warcommands/gameEngine/domain/player-commands/array-class/services/array-class.service';

const factory = (
    arrayClassService: ArrayClassService
) => {
    return new ArrayClassFactoryService(
        arrayClassService
    );
};

export const provider = {
    provide: ArrayClassFactoryService,
    useFactory: factory,
    deps: [
        ArrayClassService
    ]
};
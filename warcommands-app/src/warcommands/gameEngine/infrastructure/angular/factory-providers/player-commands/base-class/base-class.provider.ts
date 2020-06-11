import { BaseClassService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-service';
import { EnqueueUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/enqueue-units-manager.service';

const factory = (
    enqueueUnitsManagerService: EnqueueUnitsManagerService
) => {
    return new BaseClassService(
        enqueueUnitsManagerService
    );
};

export const provider = {
    provide: BaseClassService,
    useFactory: factory,
    deps: [
        EnqueueUnitsManagerService
    ]
};

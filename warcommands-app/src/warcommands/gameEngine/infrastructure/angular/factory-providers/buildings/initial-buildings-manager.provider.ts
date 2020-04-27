import { InitialBuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/initial-buildings-manager.service';
import { PlayerManagerService } from 'src/warcommands/gameEngine/domain/player/services/player-manager.service';
import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';

const factory = (
    playerManagerService: PlayerManagerService,
    buildingsManagerService: BuildingsManagerService
) => {
    return new InitialBuildingsManagerService(
        playerManagerService,
        buildingsManagerService
    );
};

export const provider = {
    provide: InitialBuildingsManagerService,
    useFactory: factory,
    deps: [
        PlayerManagerService,
        BuildingsManagerService
    ]
};
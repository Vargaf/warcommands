import { PlayerManagerService } from 'src/warcommands/gameEngine/domain/player/services/player-manager.service';

const factory = () => {
    return new PlayerManagerService();
};

export const provider = {
    provide: PlayerManagerService,
    useFactory: factory,
    deps: []
};

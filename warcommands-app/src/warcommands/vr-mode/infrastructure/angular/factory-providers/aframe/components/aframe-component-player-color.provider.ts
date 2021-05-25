import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AFrameComponentPlayerColor } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-player-color";

const factory = (
    playerRepository: PlayerRepositoryService,
) => {
    return new AFrameComponentPlayerColor(
        playerRepository
    );
};

export const provider = {
    provide: AFrameComponentPlayerColor,
    useFactory: factory,
    deps: [
        PlayerRepositoryService
    ]
};

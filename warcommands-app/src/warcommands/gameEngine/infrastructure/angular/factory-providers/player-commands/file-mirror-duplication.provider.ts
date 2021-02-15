import { FileMirrorDuplicationService } from 'src/warcommands/gameEngine/domain/player-commands/file-mirror-duplication.service';

const factory = () => {
    return new FileMirrorDuplicationService();
};

export const provider = {
    provide: FileMirrorDuplicationService,
    useFactory: factory,
    deps: []
};
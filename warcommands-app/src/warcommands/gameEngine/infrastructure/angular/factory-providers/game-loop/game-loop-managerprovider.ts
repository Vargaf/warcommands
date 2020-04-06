import { GameLoopManagerService } from 'src/warcommands/gameEngine/domain/game-loop/services/game-loop-manager.service';
import { CommandRepositoryInMemoryService } from '../../../memory-repository/command/command-repository-in-memory.service';
import { InMemoryCommandContainerRepositoryService } from '../../../memory-repository/command-container/in-memory-command-container-repository.service';
import { ClassFactoryService } from 'src/warcommands/gameEngine/domain/player-commands/class-factory.service';

const factory = (
    commandRepositoryService: CommandRepositoryInMemoryService,
    commandContainerRepositoryService: InMemoryCommandContainerRepositoryService,
    classFactoryService: ClassFactoryService
    ) => {
    return new GameLoopManagerService(commandRepositoryService, commandContainerRepositoryService, classFactoryService);
};

export const provider = {
    provide: GameLoopManagerService,
    useFactory: factory,
    deps: [
        CommandRepositoryInMemoryService,
        InMemoryCommandContainerRepositoryService,
        ClassFactoryService
    ]
};

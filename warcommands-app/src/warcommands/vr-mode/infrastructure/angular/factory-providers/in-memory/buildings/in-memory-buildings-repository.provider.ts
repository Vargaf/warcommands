import { InMemoryPlayerRepositoryService } from "src/warcommands/vr-mode/infrastructure/in-memory/player/in-memory-player-repository.service";

const factory = () => {
    return new InMemoryPlayerRepositoryService();
};

export const provider = {
    provide: InMemoryPlayerRepositoryService,
    useFactory: factory,
    deps: []
};

import { InMemoryBuildingsRepositoryService } from "src/warcommands/vr-mode/infrastructure/in-memory/buldings/in-memory-buildings-repository.service";

const factory = () => {
    return new InMemoryBuildingsRepositoryService();
};

export const provider = {
    provide: InMemoryBuildingsRepositoryService,
    useFactory: factory,
    deps: []
};

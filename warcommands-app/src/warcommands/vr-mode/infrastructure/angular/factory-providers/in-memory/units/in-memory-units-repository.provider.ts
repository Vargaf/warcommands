import { InMemoryUnitsRepositoryService } from "src/warcommands/vr-mode/infrastructure/in-memory/units/in-memory-units-repository.service";

const factory = () => {
    return new InMemoryUnitsRepositoryService();
};

export const provider = {
    provide: InMemoryUnitsRepositoryService,
    useFactory: factory,
    deps: []
};

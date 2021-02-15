import { InMemoryMapPathfindingGridRepositoryService } from '../../../memory-repository/map/in-memory-map-pathfinding-grid-repository.service';

const factory = () => {
    return new InMemoryMapPathfindingGridRepositoryService();
};

export const provider = {
    provide: InMemoryMapPathfindingGridRepositoryService,
    useFactory: factory,
    deps: []
};

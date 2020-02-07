import { MapPathfindingGridRepositoryService } from '../../memory-repository/map/map-pathfinding-grid-repository.service';

const factory = () => {
    return new MapPathfindingGridRepositoryService();
};

export const provider = {
    provide: MapPathfindingGridRepositoryService,
    useFactory: factory,
    deps: []
};

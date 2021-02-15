import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';
import { InMemoryMapPathfindingGridRepositoryService } from '../../../memory-repository/map/in-memory-map-pathfinding-grid-repository.service';


const factory = (
    mapPathfindingGridRepositoryService: InMemoryMapPathfindingGridRepositoryService,
) => {
    return new PathFindingManagerService(
        mapPathfindingGridRepositoryService
    );
};

export const provider = {
    provide: PathFindingManagerService,
    useFactory: factory,
    deps: [
        InMemoryMapPathfindingGridRepositoryService
    ]
};

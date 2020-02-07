import { NonBuildingTileRepositoryService } from '../../memory-repository/build/non-building-tile-repository.service';

const factory = () => {
    return new NonBuildingTileRepositoryService();
};

export const provider = {
    provide: NonBuildingTileRepositoryService,
    useFactory: factory,
    deps: []
};

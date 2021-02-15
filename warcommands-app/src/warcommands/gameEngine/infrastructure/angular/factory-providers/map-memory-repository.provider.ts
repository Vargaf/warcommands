import { MapRepositoryService } from '../../memory-repository/map/map-repository.service';

const factory = () => {
    return new MapRepositoryService();
};

export const provider = {
    provide: MapRepositoryService,
    useFactory: factory,
    deps: []
};

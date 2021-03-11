import { MapGeneratorService } from 'src/warcommands/gameEngine/domain/maps/services/map-generator.service';

const factory = () => {
    return new MapGeneratorService();
};

export const provider = {
    provide: MapGeneratorService,
    useFactory: factory,
    deps: []
};

import { MapConfiguration } from '../model/map-configuration.interface';
import { MapType } from '../model/map-type.enum';
import { BasicMapConfiguration } from '../configurations/basic-map-configuration';
import { onlyGrassMap } from '../configurations/only-grass-configuration';

export class MapConfigurationFactory {

    static getMapConfiguration(mapType: MapType): MapConfiguration {
        let mapConfiguration: MapConfiguration;

        switch (mapType) {
            case MapType.BasicMap: {
                mapConfiguration = BasicMapConfiguration;
                break;
            }
            case MapType.OnlyGrass: {
                mapConfiguration = onlyGrassMap;
                break;
            }
        }

        return mapConfiguration;

    }
}

import { WarcommandsNgZone } from 'src/warcommands/gameEngine/domain/share/warcommands-ng-zone.service';

const factory = () => {
    return new WarcommandsNgZone({});
};

export const provider = {
    provide: WarcommandsNgZone,
    useFactory: factory,
    deps: []
};
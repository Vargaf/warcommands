import { ContainerModule, interfaces } from "inversify";
import { GameService } from "../../Domain/service/game.service.ts";
import { MapService } from "../../Domain/service/map.service.ts";

export const gameServiceModule = new ContainerModule(
    (
        bind: interfaces.Bind,
        _unbind: interfaces.Unbind,
        _isBound: interfaces.IsBound,
        _rebind: interfaces.Rebind,
        _unbindAsync: interfaces.UnbindAsync,
        _onActivation: interfaces.Container['onActivation'],
        _onDeactivation: interfaces.Container['onDeactivation'],
    ) => {
        bind<GameService>(GameService).toSelf();
        bind<MapService>(MapService).toSelf();
    },
);
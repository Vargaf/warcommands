import { ContainerModule, interfaces } from "inversify";
import { ThreeGameEngineUIService } from "../../Infrastructure/threejs/threeGameEngineUI.service.ts";
import { GameEngineUIService } from "../../Domain/gameEngineUI.service";
import { ThreeHexMapBuilderService } from "../../Infrastructure/threejs/threeHexMapBuilderService.ts";

export const gameEngineModule = new ContainerModule(
    (
        bind: interfaces.Bind,
        _unbind: interfaces.Unbind,
        _isBound: interfaces.IsBound,
        _rebind: interfaces.Rebind,
        _unbindAsync: interfaces.UnbindAsync,
        _onActivation: interfaces.Container['onActivation'],
        _onDeactivation: interfaces.Container['onDeactivation'],
    ) => {
        bind<GameEngineUIService>(GameEngineUIService).to(ThreeGameEngineUIService);
        bind<ThreeHexMapBuilderService>(ThreeHexMapBuilderService).toSelf();
    },
);
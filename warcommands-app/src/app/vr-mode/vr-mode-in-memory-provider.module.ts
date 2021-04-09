import { NgModule } from '@angular/core';
import * as InMemoryPlayerRepositoryProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/in-memory/player/in-memory-player-repository.provider';
import * as InMemoryBuildingsRepositoryProvider from 'src/warcommands/vr-mode/infrastructure/angular/factory-providers/in-memory/buildings/in-memory-buildings-repository.provider';


@NgModule({
    providers: [
        InMemoryPlayerRepositoryProvider.provider,
        InMemoryBuildingsRepositoryProvider.provider,
    ],
})
export class VrModeInMemoryProviderModule {}

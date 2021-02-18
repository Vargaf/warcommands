import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularHomeModule } from './angular-home/angular-home.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        BrowserAnimationsModule,
        AngularHomeModule,
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            actionsBlocklist: [
                '[Game engine basic mode] Update the request animation frame id',
                '[Building list] update base resources'
            ]
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

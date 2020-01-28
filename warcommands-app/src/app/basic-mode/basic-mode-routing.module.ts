import { Routes, RouterModule } from '@angular/router';
import { BasicModeComponent } from './basic-mode.component';
import { NgModule } from '@angular/core';

const basicModeRoutes: Routes = [
    {
        path: '',
        component: BasicModeComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild( basicModeRoutes )
    ],
    exports: [ RouterModule ]
})
export class BasicModeRoutingModule {}

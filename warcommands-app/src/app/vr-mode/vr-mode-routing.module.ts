import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VrModeComponent } from "./vr-mode/vr-mode.component";

const vrModeRoutes: Routes = [
    {
        path: '',
        component: VrModeComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild( vrModeRoutes )
    ],
    exports: [ RouterModule ]
})
export class VrModeRoutingModule {}
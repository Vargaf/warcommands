import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild( homeRoutes )
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {}

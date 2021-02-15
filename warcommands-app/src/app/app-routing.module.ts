import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './angular-home/home/home.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'basic-mode',
        loadChildren: () => import('./basic-mode/basic-mode.module').then(mod => mod.BasicModeModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
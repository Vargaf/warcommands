import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { SetVariableComponent } from './set-variable/set-variable.component';
import { IfThenComponent } from './if-then/if-then.component';
import { IfThenElseComponent } from './if-then-else/if-then-else.component';



@NgModule({
  declarations: [
    CommandsComponent,
    SetVariableComponent,
    IfThenComponent,
    IfThenElseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommandsComponent
  ]
})
export class CommandsModule { }

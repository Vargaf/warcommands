import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { SetVariableComponent } from './set-variable/set-variable.component';
import { IfThenComponent } from './if-then/if-then.component';
import { IfThenElseComponent } from './if-then-else/if-then-else.component';
import { CreateMinionComponent } from './create-minion/create-minion.component';
import { GameLoopComponent } from './game-loop/game-loop.component';
import { VariableComponent } from './variable/variable.component';



@NgModule({
  declarations: [
    CommandsComponent,
    SetVariableComponent,
    IfThenComponent,
    IfThenElseComponent,
    CreateMinionComponent,
    GameLoopComponent,
    VariableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommandsComponent
  ]
})
export class CommandsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { CommandPathManageable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-manageable';
import { CommandPathValidable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-validable';

applyMixins(CommandComponent, [CommandPathManageable, CommandPathValidable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      });
  });
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: []
})
export class MixinsModule { }

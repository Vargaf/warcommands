import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { CommandPathManageable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-manageable';
import { CommandFormValidable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-form-validable';
import { CommandComponentBase } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component-base';
import { SetVarCommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/set-var-command-component';

applyMixins(CommandComponent, [CommandPathManageable, CommandFormValidable, CommandComponentBase]);
applyMixins(SetVarCommandComponent, [CommandComponent, CommandPathManageable, CommandFormValidable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          Object.defineProperty(derivedCtor.prototype, name, <PropertyDescriptor>Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
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

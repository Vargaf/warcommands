import { Injectable } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { CreateMinionComponent } from 'src/app/commands-panel/create-minion/create-minion.component';
import { VariableComponent } from 'src/app/commands-panel/variable/variable.component';
import { SetVariableComponent } from 'src/app/commands-panel/set-variable/set-variable.component';
import { IfThenComponent } from 'src/app/commands-panel/if-then/if-then.component';
import { IfThenElseComponent } from 'src/app/commands-panel/if-then-else/if-then-else.component';

@Injectable({
    providedIn: 'root'
})
export class CommandsComponentFactory {

    getComponent(commandType: CommandType) {

        let component: any;
        switch (commandType) {
            case CommandType.CreateMinion: {
                component = CreateMinionComponent;
                break;
            }
            case CommandType.Variable: {
                component = VariableComponent;
                break;
            }
            case CommandType.SetVariable: {
                component = SetVariableComponent;
                break;
            }
            case CommandType.IfThen: {
                component = IfThenComponent;
                break;
            }
            case CommandType.IfThenElse: {
                component = IfThenElseComponent;
                break;
            }
            default: {
                throw new Error('The component does not exist. Component: ' + CommandType[commandType]);
            }
        }

        return component;
    }

}

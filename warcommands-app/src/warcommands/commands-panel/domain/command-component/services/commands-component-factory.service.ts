import { CommandType } from '../../command/model/command-type.enum';
import { VariableComponent } from 'src/app/commands-panel/commands/variable/variable.component';
import { SetVariableComponent } from 'src/app/commands-panel/commands/set-variable/set-variable.component';
import { IfThenComponent } from 'src/app/commands-panel/commands/if-then/if-then.component';
import { IfThenElseComponent } from 'src/app/commands-panel/commands/if-then-else/if-then-else.component';
import { GameLoopComponent } from 'src/app/commands-panel/commands/game-loop/game-loop.component';
import { GameCommandComponent } from 'src/app/commands-panel/commands/game-command/game-command.component';
import { SetVariableFromCommandComponent } from 'src/app/commands-panel/commands/set-variable-from-command/set-variable-from-command.component';
import { LogicOperatorCommandComponent } from 'src/app/commands-panel/commands/logic-operator-command/logic-operator-command.component';

export class CommandsComponentFactory {

    static getComponent(commandType: CommandType) {

        let component: any;
        switch (commandType) {
            case CommandType.Game: {
                component = GameCommandComponent;
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
            case CommandType.SetVariableFromCommand: {
                component = SetVariableFromCommandComponent;
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
            case CommandType.GameLoop: {
                component = GameLoopComponent;
                break;
            }
            case CommandType.LogicOperator: {
                component = LogicOperatorCommandComponent;
                break;
            }
            default: {
                throw new Error('The component does not exist. Component: ' + CommandType[commandType]);
            }
        }

        return component;
    }

}

import { CommandType } from '../../command/model/command-type.enum';
import { CreateMinionComponent } from 'src/app/commands-panel/commands/create-minion/create-minion.component';
import { VariableComponent } from 'src/app/commands-panel/commands/variable/variable.component';
import { SetVariableComponent } from 'src/app/commands-panel/commands/set-variable/set-variable.component';
import { IfThenComponent } from 'src/app/commands-panel/commands/if-then/if-then.component';
import { IfThenElseComponent } from 'src/app/commands-panel/commands/if-then-else/if-then-else.component';
import { GameLoopComponent } from 'src/app/commands-panel/commands/game-loop/game-loop.component';
import { GameCommandComponent } from 'src/app/commands-panel/commands/game-command/game-command.component';

export class CommandsComponentFactory {

    static getComponent(commandType: CommandType) {

        let component: any;
        switch (commandType) {
            case CommandType.Game: {
                component = GameCommandComponent;
                break;
            }
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
            case CommandType.GameLoop: {
                component = GameLoopComponent;
                break;
            }
            default: {
                throw new Error('The component does not exist. Component: ' + CommandType[commandType]);
            }
        }

        return component;
    }

}

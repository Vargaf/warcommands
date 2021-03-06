import { Injectable } from "@angular/core";
import { CommandRepositoryService } from '../../services/command-repository.service';
import { ClassNameENUM } from '../class-definition/class-name.enum';
import { GenericCommandDTO } from '../generic-command.dto';
import { CommandType } from '../command-type.enum';
import { GameCommandEntity } from '../game-command/game-command.entity';
import { ClassMemberDTO } from '../class-definition/class-member.dto';
import { SetVariableCommandEntity } from '../set-variable-command.entity';
import { SetVariableFromCommandCommandEntity } from '../set-variable-from-command-command.entity';
import { VariableCommandEntity } from '../variable/model/variable-command.entity';

@Injectable({
    providedIn: 'root'
})
export class GetClassNameFromCommandService {

    constructor(
        private readonly commandRepositoryService: CommandRepositoryService,
    ) {}

    getClassName(commandId: string): ClassNameENUM {
        const command: GenericCommandDTO = this.commandRepositoryService.findById(commandId);
        let className!: ClassNameENUM;

        switch (command.type) {
            case CommandType.Game: {
                className = this.getClassNameByGameCommand((command as GameCommandEntity));
                break;
            }
            case CommandType.SetVariable: {
                className = <ClassNameENUM>(command as SetVariableCommandEntity).data.className;
                break;
            }
            case CommandType.SetVariableFromCommand: {
                className = <ClassNameENUM>(command as SetVariableFromCommandCommandEntity).data.className;
                break;
            }
            case CommandType.Variable: {
                const variableCommand: VariableCommandEntity = (command as VariableCommandEntity);
                if (command.classMember) {
                    className = this.getClasNameByClassMember(command.classMember);
                } else {
                    if (variableCommand.data?.variableCommandId) {
                        className = this.getClassName(variableCommand.data.variableCommandId);
                    }
                }
                break;
            }
            default: {
                throw new Error('Unrecognised command to obtain its className: ' + CommandType[command.type]);
            }
        }

        return className;
    }
    private getClassNameByGameCommand(gameCommand: GameCommandEntity): ClassNameENUM {
        let className!: ClassNameENUM;

        if (!gameCommand.classMember) {
            className = ClassNameENUM.Game;
        } else {
            className = this.getClasNameByClassMember(gameCommand.classMember);
        }

        return className;
    }

    private getClasNameByClassMember(classMember: ClassMemberDTO): ClassNameENUM {
        let className!: ClassNameENUM;

        if (classMember.methodChained) {
            className = this.getClasNameByClassMember(classMember.methodChained);
        } else {
            className = <ClassNameENUM>classMember.returnClassName;
        }

        return className;
    }

}
import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandContainerRepository } from '../../command-container/services/command-container-repository';
import { CommandDTO } from '../../command/model/command.dto';
import { CommandType } from '../../command/model/command-type.enum';
import { ClassFactoryService } from '../../player-commands/class-factory.service';
import { PlayerCommandsScopeManagerService } from './player-command-scope-manager.service';
import { PlayerCommandScopeDTO } from '../model/player-command-scope.dto';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { PlayerCommandScopeVarValueDTO } from '../model/player-command-scope-var-value.dto';
import { SetVariableCommandDTO } from '../../command/model/set-variable-command.dto';
import { SetVariableFromCommandCommandDTO } from '../../command/model/set-variable-from-command-command.dto';
import { GameLoopCommandDTO } from '../../command/model/game-loop.dto';
import { IfThenCommandDTO } from '../../command/model/if-then-command.dto';
import { LogicalOperatorCommandDTO } from '../../command/model/logical-operator-command/logical-operator-command.dto';
import { VariableCommandDTO } from '../../command/model/variable-command.dto';
import { LogicOperatorENUM } from '../../command/model/logical-operator-command/logic-operator.enum';
import { ClassMemberDTO } from '../../command/model/class-member.dto';


export class GameLoopManagerService {

    constructor(
        private readonly commandRepository: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepository,
        private readonly classFactoryService: ClassFactoryService,
        private readonly playerCommandScopeManager: PlayerCommandsScopeManagerService,
    ) {}

    runGameLoop(gameLoopCommandId: string): void {
        const gameLoopCommand: GameLoopCommandDTO = (this.commandRepository.findById(gameLoopCommandId) as GameLoopCommandDTO);
        const fileScope = this.setGameLoopScope(gameLoopCommand);

        if (gameLoopCommand) {
            this.runCommandContainer(gameLoopCommand.innerCommandContainerIdList.commandContainerId, gameLoopCommand.playerId);
        }

        this.removeScope(fileScope);
    }

    private setGameLoopScope(command: GameLoopCommandDTO): PlayerCommandScopeDTO {
        this.playerCommandScopeManager.clearPlayerScope(command.playerId);
        const scope: PlayerCommandScopeDTO = {
            scopeId: command.parentCommandContainerId,
            playerId: command.playerId,
            commands: [command.id]
        }
        this.playerCommandScopeManager.saveScope(scope);
        return scope;
    }

    private runCommandContainer(commandContainerId: string, playerId: string): any {

        let returnValue: any = null;

        const commandContainer = this.commandContainerRepository.findById(commandContainerId);
        const commandContainerScope = this.setCommandContainerScope(commandContainer, playerId);

        for (const commandId of commandContainer.commandList) {
            const command: CommandDTO = this.commandRepository.findById(commandId);
            returnValue = this.runCommand(command);
        }

        this.removeScope(commandContainerScope);

        return returnValue;
    }

    private setCommandContainerScope(commandContainer: CommandContainerDTO, playerId: string): PlayerCommandScopeDTO {
        const scope: PlayerCommandScopeDTO = {
            scopeId: commandContainer.id,
            playerId,
            commands: []
        }
        this.playerCommandScopeManager.saveScope(scope);
        return scope;
    }

    private removeScope(scope: PlayerCommandScopeDTO): void {
        this.playerCommandScopeManager.removePlayerScope(scope);
    }

    private runCommand(command: CommandDTO): any {

        let returnValue: any = null;

        switch (command.type) {
            case CommandType.Game: {
                returnValue = this.classFactoryService.runClass(<ClassMemberDTO>command.classMember, command.playerId);
                break;
            }
            case CommandType.SetVariable: {
                const scopeVar: PlayerCommandScopeVarValueDTO = {
                    commandId: command.id,
                    playerId: command.playerId,
                    commandContainerId: command.parentCommandContainerId,
                    value: (command as SetVariableCommandDTO).data.varValue
                }
                this.playerCommandScopeManager.addPlayerCommandScopeVarValue(scopeVar);
                returnValue = scopeVar.value;
                break;
            }
            case CommandType.SetVariableFromCommand: {
                const commandContainerIdToRun: string = (command as SetVariableFromCommandCommandDTO).innerCommandContainerIdList.command;
                const commandReturnValue: any = this.runCommandContainer(commandContainerIdToRun, command.playerId);
                const scopeVar: PlayerCommandScopeVarValueDTO = {
                    commandId: command.id,
                    playerId: command.playerId,
                    commandContainerId: command.parentCommandContainerId,
                    value: commandReturnValue
                }
                this.playerCommandScopeManager.addPlayerCommandScopeVarValue(scopeVar);
                returnValue = scopeVar.value;
                break;
            }
            case CommandType.IfThen: {
                const conditionContainerId: string = (command as IfThenCommandDTO).innerCommandContainerIdList.conditionCommandContainerId;
                const conditionResult = this.runCommandContainer(conditionContainerId, command.playerId);

                if (conditionResult) {
                    const thenCommandContainerId = (command as IfThenCommandDTO).innerCommandContainerIdList.thenCommandContainerId;
                    this.runCommandContainer(thenCommandContainerId, command.playerId);
                }
                
                break;
            }
            case CommandType.LogicOperator: {
                const logicalOperatorCommand: LogicalOperatorCommandDTO = (command as LogicalOperatorCommandDTO);
                const firstVariableCommandContainerId = logicalOperatorCommand.innerCommandContainerIdList.firstCommandContainerId;
                const secondVariableCommandContainerId = logicalOperatorCommand.innerCommandContainerIdList.secondCommandContainerId;
                const fisrtVariableValue: PlayerCommandScopeVarValueDTO = this.runCommandContainer(firstVariableCommandContainerId, command.playerId);
                const secondVariableValue: PlayerCommandScopeVarValueDTO = this.runCommandContainer(secondVariableCommandContainerId, command.playerId);

                switch (logicalOperatorCommand.data.operator) {
                    case LogicOperatorENUM.EqualTo: {
                        returnValue = fisrtVariableValue.value == secondVariableValue.value;
                        break;
                    }
                    case LogicOperatorENUM.GreatherThan: {
                        returnValue = fisrtVariableValue.value > secondVariableValue.value;
                        break;
                    }
                    case LogicOperatorENUM.GreatherThanOrEqualTo: {
                        returnValue = fisrtVariableValue.value >= secondVariableValue.value;
                        break;
                    }
                    case LogicOperatorENUM.LessThan: {
                        returnValue = fisrtVariableValue.value < secondVariableValue.value;
                        break;
                    }
                    case LogicOperatorENUM.LessThanOrEqualTo: {
                        returnValue = fisrtVariableValue.value <= secondVariableValue.value;
                        break;
                    }
                    case LogicOperatorENUM.NotEqual: {
                        returnValue = fisrtVariableValue.value != secondVariableValue.value;
                        break;
                    }
                }

                break;
            }
            case CommandType.Variable: {
                const variableCommand: VariableCommandDTO = (command as VariableCommandDTO);
                const variableCommandId: string = variableCommand.data.variableCommandId;
                returnValue = this.playerCommandScopeManager.getPlayerCommandScopeVarValue(variableCommandId, command.playerId);
                if (variableCommand.classMember) {
                    returnValue = this.classFactoryService.runClass(variableCommand.classMember, command.playerId, (returnValue as any).value);
                }
                break;
            }
            default: {
                throw new Error('Undefined command to run: ' + command.type);
            }
        }

        return returnValue;
    }
}
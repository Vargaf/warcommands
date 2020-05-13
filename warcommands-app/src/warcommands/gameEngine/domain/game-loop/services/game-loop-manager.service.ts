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


export class GameLoopManagerService {

    constructor(
        private readonly commandRepository: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepository,
        private readonly classFactoryService: ClassFactoryService,
        private readonly playerCommandScopeManager: PlayerCommandsScopeManagerService,
    ) {}

    runGameLoop(gameLoopCommandId: string): void {
        const gameLoopCommand: CommandDTO = this.commandRepository.findById(gameLoopCommandId);
        const fileScope = this.setGameLoopScope(gameLoopCommand);

        if (gameLoopCommand) {
            this.runCommandContainer(gameLoopCommand.innerCommandContainerList[0], gameLoopCommand.playerId);
        }

        this.removeScope(fileScope);
    }

    private setGameLoopScope(command: CommandDTO): PlayerCommandScopeDTO {
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
                returnValue = this.classFactoryService.runClass(command.classMember, command.playerId);
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
                const commandContainerIdToRun: string = (command as SetVariableFromCommandCommandDTO).innerCommandContainerList[0];
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
            default: {
                throw new Error('Undefined command to run: ' + command.type);
            }
        }

        return returnValue;
    }
}
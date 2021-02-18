import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandContainerRepository } from '../command-container/services/command-container-repository';
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO, ClassMemberJsonDTO } from '../file/file-json.dto';
import { CommandContainerDTO } from '../command-container/model/command-container.dto';
import { CommandDTO } from '../command/model/command.dto';
import { ClassMemberDTO } from '../command/model/class-member.dto';
import { PlayerManagerService } from '../player/services/player-manager.service';
import { CommandType } from '../command/model/command-type.enum';

export class FileParserService {

    constructor(
        private readonly commandRepository: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepository,
        private readonly playerManagerService: PlayerManagerService,
    ) {}

    parseFile(file: FileJsonDTO): void {
        this.parseCommandContainer(file.commandContainer, '', file.playerId);
    }

    private parseCommandContainer(rawCommandContainer: CommandContainerJsonDTO, parentCommandContainerId: string, playerid: string): void {
        const commandContainer: CommandContainerDTO = {
            id: rawCommandContainer.id,
            parentCommandContainerId,
            commandList: []
        };

        for (const rawCommand of rawCommandContainer.commands) {
            const command = this.parseCommand(rawCommand, rawCommandContainer.id, playerid);
            commandContainer.commandList.push(command.id);
        }

        this.commandContainerRepository.save(commandContainer);
    }

    private parseCommand(rawCommand: CommandJsonDTO, parentCommandContainerId: string, playerId: string): CommandDTO {
        const command: CommandDTO = {
            id: rawCommand.id,
            type: rawCommand.type,
            playerId,
            parentCommandContainerId,
            innerCommandContainerIdList: {},
            classMember: undefined,
            return: null,
            data: rawCommand.data
        };

        if(command.type === CommandType.GameLoop) {
            this.playerManagerService.addGameloopCommandToPlayer(playerId, command.id);
        }

        for (const commandContainerIndex in rawCommand.commandContainerList) {
            const commandContainer = rawCommand.commandContainerList[commandContainerIndex];
            this.parseCommandContainer(commandContainer, parentCommandContainerId, playerId);
            command.innerCommandContainerIdList[commandContainerIndex] = commandContainer.id;
        }

        if(rawCommand.classMember !== null) {
            command.classMember = this.parseClassMember(rawCommand.classMember);
        }

        this.commandRepository.save(command);

        return command;
    }

    private parseClassMember(rawClassMember: ClassMemberJsonDTO): ClassMemberDTO {
        const classMember: ClassMemberDTO = {
            className: rawClassMember.className,
            memberName: rawClassMember.memberName,
            args: rawClassMember.args || [],
            return: null,
        }

        if (rawClassMember.methodChained !== null) {
            classMember.methodChained = this.parseClassMember(rawClassMember.methodChained);
        }

        return classMember;
    }

}
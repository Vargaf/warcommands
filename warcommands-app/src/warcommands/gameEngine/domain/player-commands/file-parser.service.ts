import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandContainerRepository } from '../command-container/services/command-container-repository';
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO, ClassMemberJsonDTO } from '../file/file-json.dto';
import { CommandContainerDTO } from '../command-container/model/command-container.dto';
import { CommandDTO } from '../command/model/command.dto';
import { ClassMemberDTO } from '../command/model/class-member.dto';

export class FileParserService {

    constructor(
        private readonly commandRepository: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepository,
    ) {}

    parseFile(file: FileJsonDTO): void {
        this.parseCommandContainer(file.commandContainer, null);
    }

    private parseCommandContainer(rawCommandContainer: CommandContainerJsonDTO, parentCommandContainerId: string): void {
        const commandContainer: CommandContainerDTO = {
            id: rawCommandContainer.id,
            parentCommandContainerId,
            commandList: []
        };

        for (const rawCommand of rawCommandContainer.commands) {
            const command = this.parseCommand(rawCommand, rawCommandContainer.id);
            commandContainer.commandList.push(command.id);
        }

        this.commandContainerRepository.save(commandContainer);
    }

    private parseCommand(rawCommand: CommandJsonDTO, parentCommandContainerId: string): CommandDTO {
        const command: CommandDTO = {
            id: rawCommand.id,
            type: rawCommand.type,
            parentCommandContainerId,
            innerCommandContainerList: [],
            classMember: null,
            return: null
        };

        for (const commandContainer of rawCommand.commandContainerList) {
            this.parseCommandContainer(commandContainer, parentCommandContainerId);
            command.innerCommandContainerList.push(commandContainer.id);
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
            methodChained: null
        }

        if (rawClassMember.methodChained !== null) {
            classMember.methodChained = this.parseClassMember(rawClassMember.methodChained);
        }

        return classMember;
    }

}
import { CommandContainerDTO } from '../model/command-container.dto';
import { Observable } from 'rxjs';
import { CommandInterface } from '../../command/model/command.interface';

export abstract class CommandContainerRepositoryService {

    abstract saveCommandContainer(commandContainer: CommandContainerDTO): void;

    abstract getCommandContainer(commandContainerId: string): Observable<CommandContainerDTO>;

    abstract addCommandToCommandContainer(command: CommandInterface, index: number): void;

    abstract moveCommandSameContainer(commandContainerId: string, previousIndex: number, currentIndex: number): void;

    abstract removeCommandFromCommandContainer(commandContainerId: string, commandId: string): void;
}

import { CommandInterface } from '../model/command.interface';
import { Observable } from 'rxjs';

export abstract class CommandRepositoryService {

    abstract saveCommand(command: CommandInterface): void;

    abstract getCommand(commandId: string): Observable<CommandInterface>;
}

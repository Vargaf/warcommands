import { ClassMemberDTO } from '../command/model/class-member.dto';
import { ClassNameENUM } from '../command/model/class-name.enum';
import { GameClassFactoryService } from './game-class/services/game-class-factory.service';

export class ClassFactoryService {

    constructor(
        private readonly gameClassFactory: GameClassFactoryService
    ) {}

    runClass(classMember: ClassMemberDTO): void {

        switch (classMember.className) {
            case ClassNameENUM.Game: {
                this.gameClassFactory.runCommand(classMember);
                break;
            }
            default: {
                throw new Error('Class not defined: ' + classMember.className);
            }
        }

    }

}
import { ClassMemberDTO } from '../../../command/model/class-member.dto';
import { GameClassMemberNameEnum } from '../model/game-class-member-name.enum';
import { GameClassService } from './game-class.service';

export class GameClassFactoryService {

    constructor(
        private readonly gameClass: GameClassService
    ) {}

    runCommand(classMember: ClassMemberDTO): void {

        switch (classMember.memberName) {
            case GameClassMemberNameEnum.GetBaseByName: {
                this.gameClass.getBaseByName(classMember.args);
            }
        }

    }

}
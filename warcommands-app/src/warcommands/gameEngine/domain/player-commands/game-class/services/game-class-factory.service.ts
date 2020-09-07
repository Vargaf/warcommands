import { ClassMemberDTO } from '../../../command/model/class-member.dto';
import { GameClassMemberNameEnum } from '../model/game-class-member-name.enum';
import { GameClassService } from './game-class.service';
import { AbstractClassFactoryDefinition } from '../../abstract-class-factory-definition';

export class GameClassFactoryService implements AbstractClassFactoryDefinition {

    constructor(
        private readonly gameClass: GameClassService
    ) {}

    runCommand(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): any {

        let returnValue: any = null;

        switch (classMember.memberName) {
            case GameClassMemberNameEnum.GetBaseByName: {
                returnValue = this.gameClass.getBaseByName(classMember.args, playerId);
                break;
            }
            default: {
                throw new Error('Wrong game class member: ' + classMember.memberName);
            }
        }

        return returnValue;

    }

}
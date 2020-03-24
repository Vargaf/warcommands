import { ClassOptionDefinition } from '../model/class-definition/class-option-definition.dto';
import { ClassMemberOptionDTO } from '../model/class-definition/class-member-option.dto';

export class GameCommandMemberFinderHelper {

    static findMember(classDefinition: ClassOptionDefinition, memberValue: string): ClassMemberOptionDTO {

        let gameCommandMember: ClassMemberOptionDTO = null;

        for (const member of classDefinition.methods) {
            if (memberValue === member.value) {
                gameCommandMember = member;
                break;
            }
        }

        if (gameCommandMember === null) {
            for (const member of classDefinition.properties) {
                if (memberValue === member.value) {
                    gameCommandMember = member;
                    break;
                }
            }
        }

        return gameCommandMember;

    }

}
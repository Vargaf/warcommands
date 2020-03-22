import { ClassDefinition } from '../model/class-definition/class-definition.dto';
import { ClassMemberDTO } from '../model/class-definition/class-member.dto';

export class GameCommandMemberFinderHelper {
 
    static findMember(classDefinition: ClassDefinition, memberValue: string): ClassMemberDTO {

        let gameCommandMember: ClassMemberDTO = null;
        
        for (const member of classDefinition.methods) {
            if(memberValue === member.value) {
                gameCommandMember = member;
                break;
            }
        }

        if (gameCommandMember === null) {
            for (const member of classDefinition.properties) {
                if(memberValue === member.value) {
                    gameCommandMember = member;
                    break;
                }
            }
        }
        

        return gameCommandMember;

    }

}
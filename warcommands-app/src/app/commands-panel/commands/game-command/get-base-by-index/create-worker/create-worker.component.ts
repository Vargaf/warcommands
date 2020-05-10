import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassCreateWorkerMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-create-worker-method-option';
import { ClassMemberDTO } from 'src/warcommands/gameEngine/domain/command/model/class-member.dto';

@Component({
    selector: 'app-create-worker',
    templateUrl: './create-worker.component.html',
    styleUrls: ['./create-worker.component.scss']
})
export class CreateWorkerComponent implements OnInit {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();
    
    constructor() { }

    ngOnInit(): void {
        const createWorkerClassMember =
            GetClassMemberByclassMemberOption.getClassMember(BaseClassCreateWorkerMethodOption);

        this.classMemberChange.emit(createWorkerClassMember);
    }

}

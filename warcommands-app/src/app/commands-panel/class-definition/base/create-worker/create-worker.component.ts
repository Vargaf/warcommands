import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassCreateWorkerMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-create-worker-method-option';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import * as _ from 'lodash';


@Component({
    selector: 'app-create-worker',
    templateUrl: './create-worker.component.html',
    styleUrls: ['./create-worker.component.scss']
})
export class CreateWorkerComponent implements OnInit, ClassMemberComponent {

    @Input()
    classMember!: ClassMemberDTO;
    createWorkerClassMember!: ClassMemberDTO;
    createWorkerClassMemberMethodChained!: ClassMemberDTO;

    @Input()
    commandId!: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();
    
    constructor() { }

    ngOnInit(): void {
        
        this.initialize();
        
        setTimeout(() => {
            this.classMemberChange.emit(this.createWorkerClassMember);
        }, 0);
    }

    emitSelectedMember(): void {
        this.classMemberChange.emit(_.cloneDeep(this.createWorkerClassMember));
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        const clonedClassMember = _.cloneDeep(this.createWorkerClassMember);
        clonedClassMember.methodChained = classMember; 
        this.createWorkerClassMember =  clonedClassMember;
        this.createWorkerClassMemberMethodChained = clonedClassMember.methodChained;
        this.emitSelectedMember();
    }

    private initialize(): void {
        
        if (this.classMember) {
            this.createWorkerClassMember = this.classMember;
        } else {
            this.createWorkerClassMember =
            GetClassMemberByclassMemberOption.getClassMember(BaseClassCreateWorkerMethodOption);
            this.emitSelectedMember();
        }

        this.createWorkerClassMemberMethodChained = <ClassMemberDTO>this.createWorkerClassMember.methodChained;
    }

}

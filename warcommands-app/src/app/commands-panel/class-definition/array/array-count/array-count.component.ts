import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { ArrayClassCountMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/array-class-definition/array-class-count-method-option';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';

@Component({
    selector: 'app-array-count',
    templateUrl: './array-count.component.html',
    styleUrls: ['./array-count.component.scss']
})
export class ArrayCountComponent implements OnInit, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;

    @Input()
    commandId: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    constructor() { }

    ngOnInit(): void {
        this.initializeClassMember();
    }
    private initializeClassMember(): void {
        const arrayCountClassMember =
            GetClassMemberByclassMemberOption.getClassMember(ArrayClassCountMethodOption);

        setTimeout(() => {
            this.classMemberChange.emit(arrayCountClassMember);
        }, 0);
    }

}

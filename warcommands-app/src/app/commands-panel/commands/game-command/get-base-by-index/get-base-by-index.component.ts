import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GameCommandMemberFinderHelper } from 'src/warcommands/commands-panel/domain/command/services/game-command-member-finder-helper';
import { BaseClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/base-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { GetBaseByNameClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-base-by-name-class-method-member';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { GameMembersENUM } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-members.enum';

@Component({
    selector: 'app-get-base-by-index',
    templateUrl: './get-base-by-index.component.html',
    styleUrls: ['./get-base-by-index.component.scss']
})
export class GetBaseByIndexComponent implements OnInit {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup: FormGroup;

    baseClassDefinition = BaseClassOptionsDefinition;

    memberOptionSelected: string;
    baseName: string;

    private gameClassMember: GetBaseByNameClassMethodMember = {
        className: ClassNameENUM.Game,
        memberName: GameMembersENUM.GetBaseByName
    };
    private baseClassMember: ClassMemberDTO;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        if(this.classMember) {
            this.baseName = this.classMember.args[0];
            this.memberOptionSelected = this.classMember.methodChained?.memberName || null;
            this.gameClassMember.args = this.classMember.args || [];
            this.baseClassMember = this.classMember.methodChained || null;
        } else {
            this.baseName = 'base1';
            this.gameClassMember.args = [this.baseName];
        }

        this.componentFormGroup = this.formBuilder.group({
            baseName: [this.baseName, [Validators.max(10), Validators.min(0)]],
            action: ['']
        });

        this.componentFormGroup.get('baseName').valueChanges.subscribe((event) => {
            this.onBaseNameChange(event);
        });
    }

    onMemberSelected(event: MatSelectChange): void {
        const memberOption = GameCommandMemberFinderHelper.findMember(this.baseClassDefinition, event.value);
        this.baseClassMember = GetClassMemberByclassMemberOption.getClassMember(memberOption);
        this.emitSelectedMember();

    }

    onBaseNameChange(baseName: string): void {
        this.baseName = baseName;
        this.gameClassMember.args = [baseName];
        this.emitSelectedMember();
    }

    emitSelectedMember(): void {
        if (this.baseName && this.memberOptionSelected) {
            const member = { ...this.gameClassMember };
            member.methodChained = { ... this.baseClassMember };
            this.classMemberChange.emit(member);
        }
    }

}

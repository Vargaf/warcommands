import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GameCommandMemberFinderHelper } from 'src/warcommands/commands-panel/domain/command/services/game-command-member-finder-helper';
import { BaseClassDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/base-class-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';

@Component({
    selector: 'app-get-base-by-index',
    templateUrl: './get-base-by-index.component.html',
    styleUrls: ['./get-base-by-index.component.scss']
})
export class GetBaseByIndexComponent implements OnInit {

    @Output()
    gameCommandBaseSelectedMember = new EventEmitter<ClassMemberDTO>();

    @Output()
    gameCommandBaseName = new EventEmitter<string>();

    componentFormGroup: FormGroup;

    baseClassDefinition = BaseClassDefinition;

    memberSelected: string;
    baseName: string;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.componentFormGroup = this.formBuilder.group({
            baseName: ['base1', [Validators.max(10), Validators.min(0)]],
            action: ['']
        });

        this.componentFormGroup.get('baseName').valueChanges.subscribe((event) => {
            console.log(event);
        });
    }

    onMemberSelected(event: MatSelectChange): void {
        const member = GameCommandMemberFinderHelper.findMember(this.baseClassDefinition, event.value);
        this.gameCommandBaseSelectedMember.emit(member);
    }

    onBaseNameChange(baseName: string): void {
        this.gameCommandBaseName.emit(baseName);
    }

}

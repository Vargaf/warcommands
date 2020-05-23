import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GameCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command.entity';
import { GameClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.scss']
})
export class GameCommandComponent implements OnInit {

    @Input() commandData: GameCommandEntity;
    gameCommand: GameCommandEntity;

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    gameCommandClassDefinition = GameClassOptionsDefinition;

    componentFormGroup: FormGroup;
    
    memberSelected: string;
    areMemberOptionsVisible = false;
    onFormValueChangeSubscription: Subscription;
    onMememberOptionChangeSubscription: Subscription;

    constructor(
        private readonly commandClassMemberAddedEvent: CommandClassMemberAddedEvents,
        private readonly formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {

        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        this.setMemberOptionOnChangeListener();

        this.onFormValueChangeSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            if (this.componentFormGroup.valid) {
                this.onOptionMemberChanged();
            }
        });
    }

    onOptionMemberChanged(): void {
        this.memberSelected = this.componentFormGroup.get('memberSelected').value;
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.gameCommand.id, classMember);
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.setMemberOptionOnChangeListener();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    private initializeClassMember(): void {
        this.gameCommand = _.cloneDeep(this.commandData);

        if (this.gameCommand.classMember) {
            this.memberSelected = this.gameCommand.classMember.memberName;
            this.areMemberOptionsVisible = true;
        }
    }

    private setMemberOptionOnChangeListener(): void {
        this.onMememberOptionChangeSubscription = this.componentFormGroup.get('memberSelected').valueChanges.subscribe((event) => {
            this.onMemberSelectionChanged(event);
        });
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected').setValue('');
            this.componentFormGroup.get('memberSelected').disable();
        }
        this.gameCommand.classMember = null;
    }

}

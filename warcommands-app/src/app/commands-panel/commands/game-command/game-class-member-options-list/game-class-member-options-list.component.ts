import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GameClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import * as _ from 'lodash';

@Component({
    selector: 'app-game-class-member-options-list',
    templateUrl: './game-class-member-options-list.component.html',
    styleUrls: ['./game-class-member-options-list.component.scss']
})
export class GameClassMemberOptionsListComponent implements OnInit, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;
    gameClassMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();
    
    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    gameCommandClassDefinition = GameClassOptionsDefinition;
    
    memberSelected: string;
    componentFormGroup: FormGroup;
    areMemberOptionsVisible = false;
    onMememberOptionChangeSubscription: Subscription;

    constructor(
        private readonly formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        this.setMemberOptionOnChangeListener();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.setMemberOptionOnChangeListener();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.gameClassMember = classMember;
        this.emitSelectedMember();
    }

    private initializeClassMember(): void {

        this.gameClassMember = _.cloneDeep(this.classMember);

        if (this.classMember) {
            this.memberSelected = this.gameClassMember.memberName;
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
            this.memberSelected = null;
            this.gameClassMember = null;
            this.emitSelectedMember();
        } else {
            this.memberSelected = this.componentFormGroup.get('memberSelected').value;
        }

    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.gameClassMember));
        }, 0);
    }

}

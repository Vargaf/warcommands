import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BaseClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/base-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { GetBaseByNameClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-base-by-name-class-method-member';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { GameClassGetBaseByNameMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/game-class-get-base-by-name-method-option';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-get-base-by-index',
    templateUrl: './get-base-by-index.component.html',
    styleUrls: ['./get-base-by-index.component.scss']
})
export class GetBaseByIndexComponent implements OnInit, OnDestroy {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    componentFormGroup: FormGroup;

    baseClassOptionsDefinition = BaseClassOptionsDefinition;

    memberSelected: string;
    baseName: string;
    areMemberOptionsVisible = false;
    onMememberOptionChangeSubscription: Subscription;
    onFormValueChangeSubscription: Subscription;

    baseByNameClassMethodMember: GetBaseByNameClassMethodMember;

    constructor(
        private readonly formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            baseName: [this.baseName, [Validators.required]],
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        if (!this.memberSelected) {
            this.componentFormGroup.get('memberSelected').disable();
        }
        
        this.setMemberOptionOnChangeListener();

        this.onFormValueChangeSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            if (this.componentFormGroup.valid) {
                this.onValidFormChangeListener();
            }
        });
    }

    ngOnDestroy() {
        this.onMememberOptionChangeSubscription.unsubscribe();
        this.onFormValueChangeSubscription.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.setMemberOptionOnChangeListener();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    private onValidFormChangeListener(): void {
        this.baseByNameClassMethodMember.args = [this.componentFormGroup.get('baseName').value];
        this.memberSelected = this.componentFormGroup.get('memberSelected').value;
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected').setValue('');
            this.componentFormGroup.get('memberSelected').disable();
        }
        this.baseByNameClassMethodMember.methodChained = null;
    }

    private setMemberOptionOnChangeListener(): void {
        this.onMememberOptionChangeSubscription = this.componentFormGroup.get('memberSelected').valueChanges.subscribe((event) => {
            this.onMemberSelectionChanged(event);
        });
    }

    private initializeClassMember(): void {
        this.baseByNameClassMethodMember = 
            (GetClassMemberByclassMemberOption.getClassMember(GameClassGetBaseByNameMethodOption) as GetBaseByNameClassMethodMember);
        
        if(this.classMember) {
            this.baseName = this.classMember.args[0];
            this.memberSelected = this.classMember.methodChained?.memberName || null;
            this.baseByNameClassMethodMember.methodChained = this.classMember.methodChained;
            this.baseByNameClassMethodMember.args[0] = this.classMember.args[0] || [];

            if (this.memberSelected) {
                this.areMemberOptionsVisible = true;
            }
        } else {
            this.baseName = 'main';
            this.baseByNameClassMethodMember.args[0] = this.baseName;
            this.memberSelected = '';
            this.emitSelectedMember();
        }
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.baseByNameClassMethodMember));
        }, 0);
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.baseByNameClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

}

import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GameClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-class-options-definition';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import * as _ from 'lodash';
import { ClassMemberOptionDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member-option.dto';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-game-class-member-options-list',
    templateUrl: './game-class-member-options-list.component.html',
    styleUrls: ['./game-class-member-options-list.component.scss']
})
export class GameClassMemberOptionsListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember!: ClassMemberDTO;
    gameClassMember!: ClassMemberDTO | null;

    @Input()
    commandId!: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();
    
    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement!: MatSelect;

    gameCommandClassDefinition = GameClassOptionsDefinition;

    private subscriptionManager: Subscription = new Subscription();
    
    memberSelected!: string | null;
    componentFormGroup!: FormGroup;
    formErrorMessage!: string;
    isCommandValid = true;
    areMemberOptionsVisible = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();
        this.initializeForm();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected')?.enable();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.gameClassMember = classMember;
        this.emitSelectedMember();
    }

    private initializeForm(): void {
        this.componentFormGroup = this.formBuilder.group({
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        const valueChangesSubscription = this.componentFormGroup.valueChanges.subscribe(() => {
            const memberSelected = this.componentFormGroup.get('memberSelected')?.value;
            this.onMemberSelectionChanged(memberSelected);
        });

        const statusChangesSubscription = this.componentFormGroup.statusChanges.subscribe(() => {
            const previousFormStatus = this.isCommandValid;

            if (!this.areMemberOptionsVisible) {
                this.isCommandValid = true;
            } else {
                if (this.componentFormGroup.valid) {
                    this.isCommandValid = true;
                } else {
                    this.isCommandValid = false;
                    this.buildCommandErrorMessage();
                }
            }

            this.commandPathErrorManagerService.buildCommandPathError(this.commandId, previousFormStatus, this.isCommandValid);
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
    }

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const memberSelectedInput: AbstractControl | null = this.componentFormGroup.get('memberSelected');

        if(memberSelectedInput?.errors) {
            if (memberSelectedInput.errors.required) {
                errorFormMessage.push('- Select a method or property.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

    private initializeClassMember(): void {

        this.gameClassMember = _.cloneDeep(this.classMember);

        if (this.classMember) {

            if (this.isClassMemberAvailable()) {
                this.memberSelected = this.gameClassMember.memberName;
                this.areMemberOptionsVisible = true;
            } else {
                this.gameClassMember = null;
                this.emitSelectedMember();
            }
            
        }
    }

    private isClassMemberAvailable(): boolean {
        let isClassMemberAvailable = false;

        this.gameCommandClassDefinition.methods.forEach((method: ClassMemberOptionDTO) => {
            if (method.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        this.gameCommandClassDefinition.properties.forEach((property: ClassMemberOptionDTO) => {
            if (property.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        return isClassMemberAvailable;
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected')?.setValue('');
            this.componentFormGroup.get('memberSelected')?.disable();
            this.memberSelected = null;
            this.gameClassMember = null;
            this.emitSelectedMember();
        } else {
            this.memberSelected = this.componentFormGroup.get('memberSelected')?.value;
        }

    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(<ClassMemberDTO>_.clone(this.gameClassMember));
        }, 0);
    }

}

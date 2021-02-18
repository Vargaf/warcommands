import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-class-options-definition';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ClassMemberOptionDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member-option.dto';
import { Subscription } from 'rxjs';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-worker-class-member-option-list',
    templateUrl: './worker-class-member-option-list.component.html',
    styleUrls: ['./worker-class-member-option-list.component.scss']
})
export class WorkerClassMemberOptionListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember!: ClassMemberDTO;
    workerClassMember!: ClassMemberDTO | null;

    @Input()
    commandId!: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement!: MatSelect;

    componentFormGroup!: FormGroup;
    formErrorMessage!: string;
    isCommandValid = true;

    workerClassOptionsDefinition = WorkerClassOptionsDefinition;
    areMemberOptionsVisible = false;
    memberSelected!: string | null;
    
    private subscriptionManager: Subscription = new Subscription();

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
        this.subscriptionManager?.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected')?.enable();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.workerClassMember = classMember;
        this.emitSelectedMember();
    }

    private initializeClassMember(): void {
        
        this.workerClassMember = _.cloneDeep(this.classMember);

        if(this.classMember) {
            if (this.isClassMemberAvailable()) {
                this.memberSelected = this.workerClassMember.memberName;
                this.areMemberOptionsVisible = true;
            } else {
                this.workerClassMember = null;
                this.emitSelectedMember();
            }
        } else {
            this.memberSelected = '';
        }
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

    private isClassMemberAvailable(): boolean {
        let isClassMemberAvailable = false;

        this.workerClassOptionsDefinition.methods.forEach((method: ClassMemberOptionDTO) => {
            if (method.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        return isClassMemberAvailable;
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(<ClassMemberDTO>_.cloneDeep(this.workerClassMember));
        }, 0);
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected')?.setValue('');
            this.componentFormGroup.get('memberSelected')?.disable();
            this.memberSelected = null;
            this.workerClassMember = null;
            this.emitSelectedMember();
        } else {
            this.memberSelected = this.componentFormGroup.get('memberSelected')?.value;
        }

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

}

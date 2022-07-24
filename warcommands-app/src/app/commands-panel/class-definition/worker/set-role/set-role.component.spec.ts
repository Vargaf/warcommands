import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SetRoleComponent} from './set-role.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {
    WorkerClassMemberOptionListComponent
} from "../worker-class-member-option-list/worker-class-member-option-list.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";

describe('SetRoleComponent', () => {
    let component: SetRoleComponent;
    let fixture: ComponentFixture<SetRoleComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            roleSelected: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);

        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError'])
        TestBed.configureTestingModule({
            declarations: [SetRoleComponent, WorkerClassMemberOptionListComponent],
            imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, BrowserAnimationsModule, MatIconModule],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SetRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

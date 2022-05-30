import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SetRoleComponent} from './set-role.component';
import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";

describe('SetRoleComponent', () => {
    let component: SetRoleComponent;
    let fixture: ComponentFixture<SetRoleComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            valueChanges: of(null),
            valid: true,
            statusChanges: of(null),
            get: () => {},
            updateValueAndValidity: () => {},
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);

        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError'])
        TestBed.configureTestingModule({
            declarations: [SetRoleComponent],
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

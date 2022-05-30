import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BaseClassMemberOptionListComponent} from './base-class-member-option-list.component';
import {FormBuilder} from "@angular/forms";
import {of} from "rxjs";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";

describe('BaseClassMemberOptionListComponent', () => {
    let component: BaseClassMemberOptionListComponent;
    let fixture: ComponentFixture<BaseClassMemberOptionListComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            valueChanges: of(null),
            valid: true,
            statusChanges: of(null),
            get: () => {},
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);

        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError'])

        TestBed.configureTestingModule({
            declarations: [BaseClassMemberOptionListComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseClassMemberOptionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

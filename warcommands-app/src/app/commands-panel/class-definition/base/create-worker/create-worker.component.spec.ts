import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CreateWorkerComponent} from './create-worker.component';
import {
    WorkerClassMemberOptionListComponent
} from "../../worker/worker-class-member-option-list/worker-class-member-option-list.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {MatIconModule} from "@angular/material/icon";

describe('CreateWorkerComponent', () => {
    let component: CreateWorkerComponent;
    let fixture: ComponentFixture<CreateWorkerComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            memberSelected: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['a']);

        TestBed.configureTestingModule({
            declarations: [CreateWorkerComponent, WorkerClassMemberOptionListComponent],
            imports: [MatIconModule],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

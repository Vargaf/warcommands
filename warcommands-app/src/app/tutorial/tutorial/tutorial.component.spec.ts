import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TutorialComponent} from './tutorial.component';
import {
    TutorialComponentToggleServiceInterface
} from "../../../warcommands/tutorial-component/domain/tutorial-component/services/tutorial-component-toggle-service.interface";

describe('TutorialComponent', () => {
    let component: TutorialComponent;
    let fixture: ComponentFixture<TutorialComponent>;

    let tutorialComponentToggleServiceInterfaceSpy;

    beforeEach(waitForAsync(() => {
        tutorialComponentToggleServiceInterfaceSpy = jasmine.createSpyObj('TutorialComponentToggleServiceInterface', ['close'])
        TestBed.configureTestingModule({
            declarations: [TutorialComponent],
            providers: [
                {provide: TutorialComponentToggleServiceInterface, useValue: tutorialComponentToggleServiceInterfaceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

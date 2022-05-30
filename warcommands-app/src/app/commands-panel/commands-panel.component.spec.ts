import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { CommandsPanelComponent } from './commands-panel.component';
import {
    UxUiNgrxRepositoryService
} from "../../warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service";
import {of} from "rxjs";

describe('CommandsPanelComponent', () => {
  let component: CommandsPanelComponent;
  let fixture: ComponentFixture<CommandsPanelComponent>;
  let uxUiNgrxRepositoryServiceSpy;

  beforeEach(waitForAsync(() => {
      uxUiNgrxRepositoryServiceSpy = jasmine.createSpyObj('UxUiNgrxRepositoryService', ['watchIsUserDraggingACommandFromCommandList'])
      uxUiNgrxRepositoryServiceSpy.watchIsUserDraggingACommandFromCommandList.and.returnValue(of('nothing'));
    TestBed.configureTestingModule({
      declarations: [ CommandsPanelComponent ],
        providers: [
            {provide: UxUiNgrxRepositoryService, useValue: uxUiNgrxRepositoryServiceSpy}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

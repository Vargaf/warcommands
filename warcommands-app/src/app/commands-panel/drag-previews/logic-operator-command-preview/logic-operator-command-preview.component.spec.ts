import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicOperatorCommandPreviewComponent } from './logic-operator-command-preview.component';

describe('LogicOperatorCommandPreviewComponent', () => {
  let component: LogicOperatorCommandPreviewComponent;
  let fixture: ComponentFixture<LogicOperatorCommandPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicOperatorCommandPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicOperatorCommandPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

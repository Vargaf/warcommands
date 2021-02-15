import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicOperatorCommandComponent } from './logic-operator-command.component';

describe('LogicOperatorCommandComponent', () => {
  let component: LogicOperatorCommandComponent;
  let fixture: ComponentFixture<LogicOperatorCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicOperatorCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicOperatorCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVariableFromCommandComponent } from './set-variable-from-command.component';

describe('SetVariableFromCommandComponent', () => {
  let component: SetVariableFromCommandComponent;
  let fixture: ComponentFixture<SetVariableFromCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetVariableFromCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVariableFromCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

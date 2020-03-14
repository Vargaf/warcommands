import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfThenComponent } from './if-then.component';

describe('IfThenComponent', () => {
  let component: IfThenComponent;
  let fixture: ComponentFixture<IfThenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfThenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfThenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

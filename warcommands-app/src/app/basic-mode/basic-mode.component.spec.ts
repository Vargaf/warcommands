import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicModeComponent } from './basic-mode.component';

describe('BasicModeComponent', () => {
  let component: BasicModeComponent;
  let fixture: ComponentFixture<BasicModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

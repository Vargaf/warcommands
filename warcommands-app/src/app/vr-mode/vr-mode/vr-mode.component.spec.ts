import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrModeComponent } from './vr-mode.component';

describe('VrModeComponent', () => {
  let component: VrModeComponent;
  let fixture: ComponentFixture<VrModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

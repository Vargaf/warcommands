import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AFrameHolderComponent } from './a-frame-holder.component';

describe('AFrameHolderComponent', () => {
  let component: AFrameHolderComponent;
  let fixture: ComponentFixture<AFrameHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AFrameHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AFrameHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

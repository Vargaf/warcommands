import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCommandPreviewComponent } from './game-command-preview.component';

describe('GameCommandPreviewComponent', () => {
  let component: GameCommandPreviewComponent;
  let fixture: ComponentFixture<GameCommandPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCommandPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCommandPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

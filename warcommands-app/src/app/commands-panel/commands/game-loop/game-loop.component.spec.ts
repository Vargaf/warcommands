import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoopComponent } from './game-loop.component';

describe('GameLoopComponent', () => {
  let component: GameLoopComponent;
  let fixture: ComponentFixture<GameLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

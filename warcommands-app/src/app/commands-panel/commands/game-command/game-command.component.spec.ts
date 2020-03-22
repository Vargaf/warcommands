import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCommandComponent } from './game-command.component';

describe('GameCommandComponent', () => {
  let component: GameCommandComponent;
  let fixture: ComponentFixture<GameCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

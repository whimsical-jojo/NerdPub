import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessions } from './game-sessions';

describe('GameSessions', () => {
  let component: GameSessions;
  let fixture: ComponentFixture<GameSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSessions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSessions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

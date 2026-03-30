import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameSessionForm } from './new-game-session-form';

describe('NewGameSessionForm', () => {
  let component: NewGameSessionForm;
  let fixture: ComponentFixture<NewGameSessionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameSessionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameSessionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

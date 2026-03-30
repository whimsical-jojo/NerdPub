import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameForm } from './new-game-form';

describe('NewGameForm', () => {
  let component: NewGameForm;
  let fixture: ComponentFixture<NewGameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

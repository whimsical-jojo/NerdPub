import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPubForm } from './new-pub-form';

describe('NewPubForm', () => {
  let component: NewPubForm;
  let fixture: ComponentFixture<NewPubForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPubForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPubForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

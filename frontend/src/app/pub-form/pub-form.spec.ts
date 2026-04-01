import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubForm } from './pub-form';

describe('PubForm', () => {
  let component: PubForm;
  let fixture: ComponentFixture<PubForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PubForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

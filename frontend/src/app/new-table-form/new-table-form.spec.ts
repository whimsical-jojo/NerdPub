import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableForm } from './new-table-form';

describe('NewTableForm', () => {
  let component: NewTableForm;
  let fixture: ComponentFixture<NewTableForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTableForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTableForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

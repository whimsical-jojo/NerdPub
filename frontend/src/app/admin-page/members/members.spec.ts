import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembersComponent } from './members';

describe('AdminMembersComponent', () => {
  let component: AdminMembersComponent;
  let fixture: ComponentFixture<AdminMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMembersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

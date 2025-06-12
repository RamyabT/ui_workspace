import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsBeneListTmpltComponent } from './contacts-bene-list-tmplt.component';

describe('ContactsBeneListTmpltComponent', () => {
  let component: ContactsBeneListTmpltComponent;
  let fixture: ComponentFixture<ContactsBeneListTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsBeneListTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsBeneListTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

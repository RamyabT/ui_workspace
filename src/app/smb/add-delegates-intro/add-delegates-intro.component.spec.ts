import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDelegatesIntroComponent } from './add-delegates-intro.component';

describe('AddDelegatesIntroComponent', () => {
  let component: AddDelegatesIntroComponent;
  let fixture: ComponentFixture<AddDelegatesIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDelegatesIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDelegatesIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

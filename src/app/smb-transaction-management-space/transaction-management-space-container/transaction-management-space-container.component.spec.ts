import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateSpaceContainerComponent } from './transaction-management-space-container.component';

describe('DelegateSpaceContainerComponent', () => {
  let component: DelegateSpaceContainerComponent;
  let fixture: ComponentFixture<DelegateSpaceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateSpaceContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateSpaceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

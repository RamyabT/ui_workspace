import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransferTypeFormComponent } from './select-transfer-type-form.component';

describe('SelectBeneTypeFormComponent', () => {
  let component: SelectTransferTypeFormComponent;
  let fixture: ComponentFixture<SelectTransferTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTransferTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTransferTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

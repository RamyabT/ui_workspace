import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailViewAllFaTransferTemplateComponent } from './retail-view-all-fav-transfer-template.component';

describe('RetailViewAllFaTransferTemplateComponent', () => {
  let component: RetailViewAllFaTransferTemplateComponent;
  let fixture: ComponentFixture<RetailViewAllFaTransferTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailViewAllFaTransferTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailViewAllFaTransferTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtransferHistoryTemplateComponent } from './etransfer-history-template.component';

describe('EtransferHistoryTemplateComponent', () => {
  let component: EtransferHistoryTemplateComponent;
  let fixture: ComponentFixture<EtransferHistoryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtransferHistoryTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtransferHistoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

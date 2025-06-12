import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaAccountDtlListControlComponent } from './casa-account-dtl-list-control.component';

describe('CasaAccountDtlListControlComponent', () => {
  let component: CasaAccountDtlListControlComponent;
  let fixture: ComponentFixture<CasaAccountDtlListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaAccountDtlListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaAccountDtlListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

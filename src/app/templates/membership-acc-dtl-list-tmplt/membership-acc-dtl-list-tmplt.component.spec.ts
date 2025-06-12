import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaAccDtlListTmpltComponent } from './casa-acc-dtl-list-tmplt.component';

describe('CasaAccDtlListTmpltComponent', () => {
  let component: CasaAccDtlListTmpltComponent;
  let fixture: ComponentFixture<CasaAccDtlListTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaAccDtlListTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaAccDtlListTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

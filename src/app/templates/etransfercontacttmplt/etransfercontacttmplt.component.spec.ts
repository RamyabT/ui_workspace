import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtransfercontacttmpltComponent } from './etransfercontacttmplt.component';

describe('EtransfercontacttmpltComponent', () => {
  let component: EtransfercontacttmpltComponent;
  let fixture: ComponentFixture<EtransfercontacttmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtransfercontacttmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtransfercontacttmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

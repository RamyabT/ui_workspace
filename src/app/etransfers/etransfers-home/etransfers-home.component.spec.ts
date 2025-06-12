import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtransfersHomeComponent } from './etransfers-home.component';

describe('EtransfersHomeComponent', () => {
  let component: EtransfersHomeComponent;
  let fixture: ComponentFixture<EtransfersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtransfersHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtransfersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

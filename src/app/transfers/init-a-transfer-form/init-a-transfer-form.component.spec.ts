import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitATransferFormComponent } from './init-a-transfer-form.component';

describe('InitATransferFormComponent', () => {
  let component: InitATransferFormComponent;
  let fixture: ComponentFixture<InitATransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitATransferFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitATransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialRecordComponent } from './finantial-record.component';

describe('FinantialRecordComponent', () => {
  let component: FinantialRecordComponent;
  let fixture: ComponentFixture<FinantialRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinantialRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinantialRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

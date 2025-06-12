import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCasaTransactionFormComponent } from './view-casa-transaction-form.component';

describe('ViewCasaTransactionFormComponent', () => {
  let component: ViewCasaTransactionFormComponent;
  let fixture: ComponentFixture<ViewCasaTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCasaTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCasaTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

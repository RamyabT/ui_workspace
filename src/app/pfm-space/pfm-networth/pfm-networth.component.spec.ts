import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmNetworthComponent } from './pfm-networth.component';

describe('PfmNetworthComponent', () => {
  let component: PfmNetworthComponent;
  let fixture: ComponentFixture<PfmNetworthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmNetworthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfmNetworthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

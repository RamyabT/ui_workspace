import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicSearchFormComponent } from './bic-search-form.component';

describe('BicSearchFormComponent', () => {
  let component: BicSearchFormComponent;
  let fixture: ComponentFixture<BicSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

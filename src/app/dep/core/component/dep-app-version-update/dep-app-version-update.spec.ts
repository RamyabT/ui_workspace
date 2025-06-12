import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepAppVersionUpdateComponent } from './dep-app-version-update.component';

describe('DepAppVersionUpdateComponent', () => {
  let component: DepAppVersionUpdateComponent;
  let fixture: ComponentFixture<DepAppVersionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepAppVersionUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepAppVersionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

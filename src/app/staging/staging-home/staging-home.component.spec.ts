import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingHomeComponent } from './staging-home.component';

describe('StagingHomeComponent', () => {
  let component: StagingHomeComponent;
  let fixture: ComponentFixture<StagingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagingHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

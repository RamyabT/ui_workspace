import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglemapBranchComponent } from './googlemap-branch.component';

describe('GooglemapBranchComponent', () => {
  let component: GooglemapBranchComponent;
  let fixture: ComponentFixture<GooglemapBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglemapBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooglemapBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

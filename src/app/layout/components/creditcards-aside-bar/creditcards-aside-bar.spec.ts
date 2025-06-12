import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardsAsideBarComponent } from './creditcards-aside-bar.component';

describe('CreditCardsAsideBarComponent', () => {
    let component: CreditCardsAsideBarComponent;
    let fixture: ComponentFixture<CreditCardsAsideBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CreditCardsAsideBarComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CreditCardsAsideBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
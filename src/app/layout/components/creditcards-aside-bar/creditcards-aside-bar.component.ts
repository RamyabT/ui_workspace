import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { BaseFpxFormComponent } from '@fpx/core';
import { CreditcardNavigationFormHelper, CreditcardNavigationFormState } from 'src/app/cards-space/creditcard-navigation-form/creditcard-navigation-form.helper';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';

@Component({
    selector: 'creditcards-aside-bar',
    templateUrl: './creditcards-aside-bar.component.html',
    styleUrls: ['./creditcards-aside-bar.component.scss'],
})
export class CreditCardsAsideBarComponent  {
    @Input() creditCardData!: CreditcardNavigationFormState;
    enableAccountDetails: boolean = true;
    enableRewardsAndBenefits: boolean = false;

    getAbsoluteValue(value: number | undefined): number {
        return value ? Math.abs(value) : 0;
    }

    getNormalizedProductCode(code: string): string | null {
        if(!code) return null;

        const goldCodes = ['100001|VG|RRR', '100001|VG|LRR', '100001|VG|LRN'];
        const classicCodes = ['100001|VS|RRR', '100001|VS|LRR', '100001|VS|LRN'];
        
        if (goldCodes.includes(code)) return 'gold';
        if (classicCodes.includes(code)) return 'classic';
        if (code === '100001|VI|VPR') return 'infinite-privilege';

        return 'infinite';
    }

    onRewardsInfoClick() {
        this.enableAccountDetails = false;
        this.enableRewardsAndBenefits = true;
    }

    onCloseRewardsPoints() {
        $("#rewardsandbenefits-points-container").hide();
    }
}
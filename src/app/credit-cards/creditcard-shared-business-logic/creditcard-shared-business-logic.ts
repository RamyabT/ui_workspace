import { Injectable, EventEmitter } from '@angular/core';
import { Creditcard } from '../creditcard-service/creditcard.model';

enum CardStatus {
    ACTIVE = '1',
    LOCKED = '2',
    READY_TO_ACTIVATE = '3',
}
enum AccountStatus {
    ACTIVE = '1',
    INACTIVE = '2',
    DEROGATORY = '3',
    CLI_OFFER_INELLIGIBLE = '4',
}
/** @deprecated - TODO remove this when we get updated model interface */
interface VancityCreditCard extends Partial<Creditcard> {
    /** @deprecated */
    type?: string;
    accountStatus?: AccountStatus | string,
    status?: CardStatus | string,
}

@Injectable({
    providedIn: 'root'
})
export class CreditcardSharedBusinessLogic {

    getMenuCodeBasedOnCard(card: VancityCreditCard | undefined) {
        const cardStatus = card?.status?.toLowerCase();
        const accountStatus = card?.accountStatus;
        let menuCode = '';
    
        if (cardStatus === 'pending' || cardStatus === CardStatus.READY_TO_ACTIVATE) {
            menuCode = 'CREDMENUPENDING';

        } else if (cardStatus === 'blocked' || cardStatus === CardStatus.LOCKED) {
            menuCode = 'CREDMENUBLOCK';

        } else if (cardStatus === 'blocked Permanently' || accountStatus === AccountStatus.DEROGATORY) {
            menuCode = 'CREDMENUBLOCKP';

        } else if (cardStatus === 'inactive' || accountStatus === AccountStatus.INACTIVE) {
            menuCode = 'CREDMENUINACTIVE';
        } else if (cardStatus === 'active' || cardStatus === CardStatus.ACTIVE) {
            const checkAccountStatus = accountStatus !== undefined ? (accountStatus === AccountStatus.ACTIVE || accountStatus === AccountStatus.CLI_OFFER_INELLIGIBLE) : true;
            if (checkAccountStatus) {
                const PRIMARY_CARD_HOLDER_MENU_CODE = 'CREDMENU';
                const AUTHORIZED_CARD_HOLDER_MENU_CODE = 'CREDMENU2';
                menuCode = this.userIsPrimaryCardholder(card) ? PRIMARY_CARD_HOLDER_MENU_CODE : AUTHORIZED_CARD_HOLDER_MENU_CODE;
            }
        }
        return menuCode;
    }

    filterMenuListBasedOnCardLockUnlockStatus(card: VancityCreditCard | undefined, menuItem: any) {
        const isLocked = this.cardIsLocked(card);
        const serviceCode = menuItem.serviceCode;
        if (serviceCode === 'RETAILCCBLOCK') {
            return !isLocked;
        } else if (serviceCode === 'RETAILCCUNBLOCK') {
            return isLocked;
        } else {
            return true;
        }
    }
    filterMenuListBasedOnPrimaryCardHolder(card: VancityCreditCard | undefined, menuItem: any, authorizedUserMenuItems: any[]) {
        const isAuthorizedUser = !this.userIsPrimaryCardholder(card);
        if (isAuthorizedUser) {
            return authorizedUserMenuItems.some(
                (authorizedMenuItem) => authorizedMenuItem.serviceCode === menuItem.serviceCode
            );
        }
        return true;
    }

    /**
     * For Vancity "cardStatus":
     * 1 = Active
     * 2 = Locked
     * 3 = Ready to Activate
     * Card StATUS is optional property, only present for Primary card holder.
     */
    userIsPrimaryCardholder(card: VancityCreditCard | undefined): boolean {
        if (card) {
            // TODO delete temp after mock adapter updated or using real adapter
            const temp = card.type === 'Primary';
            const realPossibleCardStatus = [CardStatus.ACTIVE, CardStatus.LOCKED, CardStatus.READY_TO_ACTIVATE];
            return realPossibleCardStatus.includes(card.status as CardStatus) || temp ;
        }
        return false;
    }
    cardIsActive(card: any | VancityCreditCard): boolean {
        if (card) {
            // TODO delete temp after mock adapter updated or using real adapter
            const temp = card.status === 'Active';
            const activeCardStatus = card.status === CardStatus.ACTIVE;
            return  activeCardStatus || temp;
        }
        return false;
    }
    cardIsLocked(card: any | VancityCreditCard): boolean {
        if (card) {
            // TODO delete temp after mock adapter updated or using real adapter
            const temp = card.status === 'Blocked';
            const lockedCardStatus = card.status === CardStatus.LOCKED;
            return lockedCardStatus || temp;
        }
        return false;
    }
    cardNeedsToBeActivated(card: any | VancityCreditCard): boolean {
        if (card) {
            // TODO delete temp after mock adapter updated or using real adapter
            const temp = card.status === 'Pending';
            const readyToActiveCardStatus = card.status === CardStatus.READY_TO_ACTIVATE;
            return readyToActiveCardStatus || temp;
        }
        return false;
    }
    /**
     * For Vancity "accountStatus":
     * 1 = Active = accounts without any of the other statuses (user can perform all credit card actions)
     * 2 = Inactive = CL (closed) status (user cannot perform any credit card actions)
     * 3 = Derogatory = BK, CO, CR, FR, LG, SF, XF (user cannot perform any credit card aCctions)
     * 4 = CLI Offer Ineligible BP,CC,CW,EX,LG,OL,PC,PD,RD,RM,TW,VP,WB (users can perform all credit card actions except accept a pre-approved CLI offer)
     */
    cardHasActiveAccountStatus(card: VancityCreditCard): boolean {
        // TODO delete temp after mock adapter updated or using real adapter
        const temp = card.status === 'Active';
        return card.hasOwnProperty('accountStatus') ? card.accountStatus === AccountStatus.ACTIVE : temp;
    }
    cardHasInactiveAccountStatus(card: VancityCreditCard): boolean {
        // TODO delete temp after mock adapter updated or using real adapter
        const temp = card.status === 'InActive';
        return card.hasOwnProperty('accountStatus') ? card.accountStatus === AccountStatus.INACTIVE : temp;
    }
    cardHasDerogatoryAccountStatus(card: VancityCreditCard): boolean {
        // TODO delete temp after mock adapter updated or using real adapter
        const temp = card.status === 'Blocked Permanently';
        return card.hasOwnProperty('accountStatus') ? card.accountStatus === AccountStatus.DEROGATORY : temp;
    }
    cardHasCliOfferInelligbleAccountStatus(card: VancityCreditCard): boolean {
         // TODO delete temp after mock adapter updated or using real adapter
        const temp = card.status === 'test CLI Offer Ineligible';
        return card.hasOwnProperty('accountStatus') ? card.accountStatus === AccountStatus.CLI_OFFER_INELLIGIBLE : temp;
    }
}
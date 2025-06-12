export enum ChequeDepositHelpMode {
    FRONT = 'front',
    BACK = 'back'
}

export interface ChequeDepositHelpData {
    mode: ChequeDepositHelpMode;
    onToggleChanged: (isToggleChecked: boolean) => void;
}

export interface ChequeDepositHelpClosedResult {
    action: 'close' | 'next';
    hideMessageNextTime?: boolean;
}
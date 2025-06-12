import { CreditCardNumberMaskPipe } from './credit-card-number-mask.pipe';

describe('CreditCardNumberMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CreditCardNumberMaskPipe();
    expect(pipe).toBeTruthy();
  });
});

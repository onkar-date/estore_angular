import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'paiseToRupee',
})
export class PaiseToRupeePipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(
    value: number | null,
    currencyCode: string = 'INR',
    display: string = 'symbol'
  ): string | null {
    if (value === null) return null;

    // Convert paise to rupees
    const rupees = value / 100;

    // Use Angular's CurrencyPipe to format the value
    return this.currencyPipe.transform(rupees, currencyCode, display);
  }
}

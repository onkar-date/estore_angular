import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appBase64Src]',
})
export class Base64SrcDirective implements OnChanges {
  @Input() appBase64Src: string = ''; // Input to accept the Base64 string from the component

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (this.appBase64Src) {
      // Prepend 'data:image/png;base64,' to the base64 string
      const base64Image = `data:image/png;base64,${this.appBase64Src}`;

      // Set the src attribute of the img element
      this.el.nativeElement.src = base64Image;
    }
  }
}

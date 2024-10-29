import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../interface/Image.interface';

@Pipe({
  name: 'fetchPrimaryImage',
})
export class FetchPrimaryImagePipe implements PipeTransform {
  transform(images: Array<Image>): string {
    return images.find((image) => image.isPrimary)?.base64Image || '';
  }
}

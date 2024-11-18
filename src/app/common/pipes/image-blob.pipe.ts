import { Pipe, PipeTransform } from '@angular/core';
import { BlobImageUrlService } from '../services/blob-image-url.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'imageBlob',
  standalone: true
})
export class ImageBlobPipe implements PipeTransform {
  constructor(
    private domSanitizer: DomSanitizer,
    private blobImageUrl: BlobImageUrlService
  ) {}

  transform(value: string, backgroundImage?: boolean): SafeUrl {
    const url = this.blobImageUrl.imageUrlMap[value] ?? value;
    return backgroundImage
      ? `url('${url}')`
      : this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}

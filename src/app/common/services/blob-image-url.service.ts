import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlobImageUrlService {
  public imageUrlMap: { [key: string]: string } = {};

  public fillImageUrl(key: string, value: string): void {
    this.imageUrlMap[key] = value;
  }

  public has(url: string): boolean {
    return !!this.imageUrlMap[url];
  }
}

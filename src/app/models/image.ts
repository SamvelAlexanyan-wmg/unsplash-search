export class Image {
  id: string = '';
  description: string = '';
  url: string = '';
  selected: boolean = false;
  downloadUrl: string = '';

  constructor(model: {[key: string]: any}) {
    if (!model) return;
    this.description = model.alt_description;
    this.url = model.urls.small;
    this.id = model.id;
    this.selected = false;
    this.downloadUrl = model.links.download;
  }
}

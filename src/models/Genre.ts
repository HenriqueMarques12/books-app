export interface GenreProps {
  listName: string;
  displayName: string;
  listNameEncoded: string;
  updated: string;
  newestPublishedDate: string;
  oldestPublishedDate: string;
}

export class Genre {
  [x: string]: any;
  readonly listName: string;
  readonly displayName: string;
  readonly listNameEncoded: string;
  readonly updated: string;
  readonly newestPublishedDate: string;
  readonly oldestPublishedDate: string;

  constructor(props: GenreProps) {
    this.listName = props.listName;
    this.displayName = props.displayName;
    this.listNameEncoded = props.listNameEncoded;
    this.updated = props.updated;
    this.newestPublishedDate = props.newestPublishedDate;
    this.oldestPublishedDate = props.oldestPublishedDate;
  }

  get id(): string {
    return this.listNameEncoded;
  }

  static fromApiData(apiData: any): Genre {
    return new Genre({
      listName: apiData.list_name,
      displayName: apiData.display_name,
      listNameEncoded: apiData.list_name_encoded,
      updated: apiData.updated,
      newestPublishedDate: apiData.newest_published_date,
      oldestPublishedDate: apiData.oldest_published_date,
    });
  }
}

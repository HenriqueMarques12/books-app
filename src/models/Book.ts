export interface BookBuyLink {
  name: string;
  url: string;
}

export interface BookProps {
  isbn10?: string;
  isbn13?: string;
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  price?: string;
  rank?: number;
  buyLinks?: BookBuyLink[];
  book_image: string;
}

export class Book {
  readonly isbn10?: string;
  readonly isbn13?: string;
  readonly title: string;
  readonly author: string;
  readonly description?: string;
  readonly publisher?: string;
  readonly price?: string;
  readonly rank?: number;
  readonly buyLinks: BookBuyLink[];
  readonly book_image: string;

  constructor(props: BookProps) {
    this.isbn10 = props.isbn10;
    this.isbn13 = props.isbn13;
    this.title = props.title;
    this.author = props.author;
    this.description = props.description;
    this.publisher = props.publisher;
    this.price = props.price;
    this.rank = props.rank;
    this.book_image = props.book_image;
    this.buyLinks = props.buyLinks || [];
  }

  get id(): string {
    return (
      this.isbn10 ||
      this.isbn13 ||
      `${this.title}-${this.author}`.replace(/\s+/g, "-").toLowerCase()
    );
  }

  static fromApiData(apiData: any): Book {
    const bookDetails = apiData.book_details?.[0] || apiData;

    return new Book({
      isbn10: bookDetails.primary_isbn10 || bookDetails.isbn10,
      isbn13: bookDetails.primary_isbn13 || bookDetails.isbn13,
      title: bookDetails.title,
      author: bookDetails.author,
      description: bookDetails.description,
      publisher: bookDetails.publisher,
      price: bookDetails.price,
      rank: apiData.rank,
      book_image: apiData.book_image,
      buyLinks: apiData.buy_links || [],
    });
  }
}

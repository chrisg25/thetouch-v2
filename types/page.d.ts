interface ArticleType {
  backgroundImage: string;
  headline: string;
  writer: string;
  dateTime?: string;
  id?: string;
  body?: string;
}

interface MemberType {
  name: string;
  position: string;
  image: string;
}

export { ArticleType, MemberType };

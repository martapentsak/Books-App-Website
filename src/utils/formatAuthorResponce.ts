import { Author } from "../types/AuthorBookType";

type AuthorResponse = Omit<Author, "works">;

type Prop = {
  data: AuthorResponse[]
}

export const formatAuthorResponse = (response: Prop): Author[] => {
  return response.data.map(({ notable_works, ...others }) => ({
    works: notable_works || [],
    ...others,
  }));
};
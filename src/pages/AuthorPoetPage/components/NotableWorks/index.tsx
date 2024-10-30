import { Card } from "../../../../components/Card";
import { ListSection } from "../../../../components/ListSection";
import { AuthorPoetPageTitles } from "../../../../constants/textValues";

const bookPlaceholder =
  "https://m.media-amazon.com/images/I/61LQf6GWT4L._AC_UF1000,1000_QL80_.jpg";

type Props = {
  works: string[];
};

export const NotableWorks = ({ works }: Props) => {
  return (
    <ListSection title={AuthorPoetPageTitles.worksTitle}>
      {works.map((work, index) => (
        <Card
          key={index}
          className="notable-work-card"
          title={work}
          image={bookPlaceholder}
        />
      ))}
    </ListSection>
  );
};

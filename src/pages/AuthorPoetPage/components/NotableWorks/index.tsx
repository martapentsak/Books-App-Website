import { Card } from "../../../../components/Card";
import { ListSection } from "../../../../components/ListSection";
import { authorPoetPageTitles } from "../../../../constants/textValues";
import { Work } from "../../../../types/AuthorBookType";

type Props = {
  works: Work[];
};

export const NotableWorks = ({ works }: Props) => (
  <ListSection title={authorPoetPageTitles.worksTitle}>
    {works.map(({ name, image }, index) => (
      <Card
        key={name + index}
        className="notable-work-card"
        title={name}
        image={image}
      />
    ))}
  </ListSection>
);

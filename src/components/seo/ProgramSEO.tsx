
import { Helmet } from "react-helmet-async";

interface ProgramSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

const ProgramSEO = ({ title, description, keywords = [], image }: ProgramSEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default ProgramSEO;


import React from 'react';
import { Helmet } from 'react-helmet-async';

interface UniversitySEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  canonical?: string;
}

const UniversitySEO: React.FC<UniversitySEOProps> = ({
  title,
  description = "استكشف أفضل الجامعات التركية وتعرف على برامجها المتنوعة والمنح الدراسية المتاحة واختر مسارك الأكاديمي.",
  keywords = ["جامعات تركيا", "دراسة في تركيا", "منح دراسية", "جامعات خاصة", "جامعات حكومية", "برامج دراسية"],
  imageUrl,
  canonical,
}) => {
  const defaultImageUrl = "https://yourdomain.com/default-university-image.jpg";
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl || defaultImageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl || defaultImageUrl} />
      
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default UniversitySEO;

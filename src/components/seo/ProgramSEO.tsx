
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ProgramSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  imageUrl?: string;
}

const ProgramSEO: React.FC<ProgramSEOProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  imageUrl
}) => {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {imageUrl && <meta property="twitter:image" content={imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`} />}
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default ProgramSEO;

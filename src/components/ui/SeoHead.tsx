import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://roollaanndd.github.io/2kang';
const DEFAULT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0EolqzvY1WD2WOp6SMJdKAfmWFjfpNCMwTSa1ndh1x4It-v1j41ymL_OfNorfUA6mjRRuFakD-6K6WIRBoBtyttbuE5Ivgg8YTOseynTdlYroGQmGEdhf03RUWPZfuF76uArIkLfxm9a1Z14vb5Yh0VFlDIfJurcRoLF8l_ZqsCxQOFj8Pr2tmJnqKaiNHgfNcwpiUXhfmhjN6PbBxnqw9GtG9z5lbBi4bUiKS0hpL74lPZ4jnwrIMC_ALmA4HxPenTr68oA9VF8';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
}

export function SeoHead({ title, description, keywords, path = '/', image = DEFAULT_IMAGE }: SeoHeadProps) {
  const fullTitle = `${title} | OMDC Dental`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="OMDC Dental" />
      <meta property="og:locale" content="id_ID" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

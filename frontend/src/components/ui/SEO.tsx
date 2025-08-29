import { Helmet } from 'react-helmet';


interface PageHeadProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: PageHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name='description' content='{description}' />}
    </Helmet>
  )
}

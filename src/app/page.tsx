import { Hero } from '@/components/sections/Hero';
import { PackFamilies } from '@/components/sections/PackFamilies';
import { Process } from '@/components/sections/Process';
import { Commitment } from '@/components/sections/Commitment';
import { WhyHES } from '@/components/sections/WhyHES';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SITE } from '@/data/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE.url,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  image: `${SITE.url}${SITE.ogImage}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Sénégal' },
  priceRange: '20 000 — 130 000 FCFA',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PackFamilies />
      <Process />
      <Commitment />
      <WhyHES />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

import { FeatureRow } from '@/components/ui/FeatureRow';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

async function getFeatures() {
  return client.fetch(
    groq`*[_type == "features"][0]{
      title,
      subtitle,
      items[]{
        eyebrow,
        title,
        description,
        "imageSrc": image.asset->url
      }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function FeaturesListSection() {
  const data = await getFeatures();

  if (!data || !data.items) {
    return null;
  }

  return (
    <section className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Benefícios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        {/* Features List */}
        <div className="mt-16 space-y-16">
          {data.items.map((feature: any, index: number) => (
            <FeatureRow
              key={feature.title}
              eyebrow={feature.eyebrow}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              tags={[]}
              imagePosition={index % 2 === 0 ? 'right' : 'left'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
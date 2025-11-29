import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServicePackageBySlug, getRelatedServicePackages, getReviews } from '@/sanity/shop';
import { urlFor } from '@/sanity/lib/image';
import { ServiceHeader } from '@/components/service/ServiceHeader';
import { ServiceGallery } from '@/components/service/ServiceGallery';
import { ServiceInfo } from '@/components/service/ServiceInfo';
import { ServiceActions } from '@/components/service/ServiceActions';
import { ServiceFeatures } from '@/components/service/ServiceFeatures';
import { ServiceDescription } from '@/components/service/ServiceDescription';
import { BeforeAfterGallery } from '@/components/service/BeforeAfterGallery';
import { ReviewsList } from '@/components/shared/ReviewsList';
import { RelatedServices } from '@/components/service/RelatedServices';
import { ServiceCTA } from '@/components/service/ServiceCTA';

export const revalidate = 60; // ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servicePackage = await getServicePackageBySlug(slug);
  
  if (!servicePackage) {
    return {
      title: 'Pacote não encontrado',
    };
  }
  
  return {
    title: servicePackage.seoTitle || `${servicePackage.name} | Tuany Barreiros Bioestetica`,
    description: servicePackage.seoDescription || servicePackage.shortDescription || `Conheça ${servicePackage.name} - tratamento personalizado para sua beleza.`,
    openGraph: {
      title: servicePackage.seoTitle || servicePackage.name,
      description: servicePackage.seoDescription || servicePackage.shortDescription || '',
      images: servicePackage.image?.asset ? [
        {
          url: urlFor(servicePackage.image).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: servicePackage.image.alt || servicePackage.name,
        },
      ] : [],
      type: 'website',
    },
  };
}

export default async function ServicePackageDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const servicePackage = await getServicePackageBySlug(slug);
    
    if (!servicePackage) {
      notFound();
    }

    // Fetch related packages and reviews
    const [relatedPackages, reviews] = await Promise.all([
      getRelatedServicePackages(servicePackage._id, servicePackage.category?._id, 3),
      getReviews({ servicePackageId: servicePackage._id, approved: true, limit: 5 })
    ]);

    return (
      <div className="min-h-screen bg-brand-background">
        <ServiceHeader servicePackage={servicePackage} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <ServiceGallery 
              image={servicePackage.image}
              gallery={servicePackage.gallery}
              name={servicePackage.name}
            />
            <div>
              <ServiceInfo servicePackage={servicePackage} reviews={reviews} />
              <ServiceActions servicePackage={servicePackage} />
            </div>
          </div>
          
          <ServiceFeatures 
            includedServices={servicePackage.includedServices}
            benefits={servicePackage.benefits}
            targetAudience={servicePackage.targetAudience}
            contraindications={servicePackage.contraindications}
          />
          
          <ServiceDescription description={servicePackage.description} />
          <BeforeAfterGallery beforeAfterGallery={servicePackage.beforeAfterGallery} />
          <ReviewsList reviews={reviews} />
          <RelatedServices services={relatedPackages} />
          <ServiceCTA />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar pacote de serviço:', error);
    notFound();
  }
}
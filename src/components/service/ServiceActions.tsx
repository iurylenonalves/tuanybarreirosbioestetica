import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { urlFor } from '@/sanity/lib/image';

interface ServiceImage {
  alt?: string;
}

interface ServicePackage {
  _id: string;
  name: string;
  price: number;
  image: ServiceImage;
  slug: { current: string };
  bookingRequired?: boolean;
}

interface ServiceActionsProps {
  servicePackage: ServicePackage;
}

export function ServiceActions({ servicePackage }: ServiceActionsProps) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      {servicePackage.bookingRequired ? (
        <Link
          href="/agendar"
          className="w-full py-4 px-6 bg-brand-text-button hover:bg-brand-brown text-white rounded-lg font-semibold text-lg text-center transition-colors"
        >
          Agendar Consulta
        </Link>
      ) : (
        <AddToCartButton
          item={{
            id: servicePackage._id,
            name: servicePackage.name,
            price: servicePackage.price,
            image: urlFor(servicePackage.image).width(100).height(100).url(),
            type: 'service',
            slug: servicePackage.slug.current
          }}
          className="w-full py-4 px-6 text-lg"
        >
          Contratar Pacote
        </AddToCartButton>
      )}
      
      <Link
        href="/contato"
        className="w-full py-3 px-6 border-2 border-brand-text-button text-brand-text-button rounded-lg font-semibold text-center hover:bg-brand-pink-light transition-colors"
      >
        Tirar Dúvidas
      </Link>
    </div>
  );
}
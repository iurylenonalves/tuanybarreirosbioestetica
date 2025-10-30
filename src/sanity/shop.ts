import { client } from './lib/client';

// Interface para Produtos
export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  description?: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  shortDescription?: string;
  images: Array<{
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  }>;
  price: number;
  compareAtPrice?: number;
  category: {
    _id: string;
    name: string;
    slug: { current: string };
  };
  brand?: string;
  sku?: string;
  stock?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags?: string[];
  featured: boolean;
  active: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// Interface para Categorias
export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  parent?: {
    _id: string;
    name: string;
  };
  order: number;
  active: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// Interface para Pacotes de Serviços
export interface ServicePackage {
  _id: string;
  name: string;
  slug: { current: string };
  description?: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  shortDescription?: string;
  image: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  gallery?: Array<{
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  }>;
  price: number;
  originalPrice?: number;
  duration?: string;
  sessions?: number;
  includedServices?: Array<{
    service: string;
    quantity: number;
    description?: string;
  }>;
  benefits?: string[];
  targetAudience?: string[];
  contraindications?: string[];
  beforeAfterGallery?: Array<{
    before: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    after: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    description?: string;
  }>;
  category?: {
    _id: string;
    name: string;
    slug: { current: string };
  };
  featured: boolean;
  popular: boolean;
  active: boolean;
  bookingRequired: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

// Interface para Avaliações
export interface Review {
  _id: string;
  customerName: string;
  customerEmail?: string;
  product?: {
    _id: string;
    name: string;
  };
  servicePackage?: {
    _id: string;
    name: string;
  };
  rating: number;
  title?: string;
  comment?: string;
  images?: Array<{
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  }>;
  verified: boolean;
  featured: boolean;
  approved: boolean;
  response?: {
    message: string;
    respondedAt: string;
    respondedBy: string;
  };
  createdAt: string;
}

// Função para buscar produtos
export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const { category, featured, limit = 20, offset = 0 } = options || {};
  
  let filter = 'active == true';
  
  if (category) {
    filter += ` && category->slug.current == "${category}"`;
  }
  
  if (featured) {
    filter += ` && featured == true`;
  }

  const query = `
    *[_type == "product" && ${filter}] | order(name asc) [${offset}...${offset + limit}] {
      _id,
      name,
      slug,
      description,
      shortDescription,
      images[] {
        asset-> {
          _ref,
          url
        },
        alt
      },
      price,
      compareAtPrice,
      category-> {
        _id,
        name,
        slug
      },
      brand,
      sku,
      stock,
      weight,
      dimensions,
      tags,
      featured,
      active,
      seoTitle,
      seoDescription
    }
  `;

  return client.fetch(query);
}

// Função para buscar produto por slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `
    *[_type == "product" && slug.current == $slug && active == true][0] {
      _id,
      name,
      slug,
      description,
      shortDescription,
      images[] {
        asset-> {
          _ref,
          url
        },
        alt
      },
      price,
      compareAtPrice,
      category-> {
        _id,
        name,
        slug
      },
      brand,
      sku,
      stock,
      weight,
      dimensions,
      tags,
      featured,
      active,
      seoTitle,
      seoDescription
    }
  `;

  return client.fetch(query, { slug });
}

// Função para buscar categorias
export async function getCategories(): Promise<Category[]> {
  const query = `
    *[_type == "category" && active == true] | order(order asc, name asc) {
      _id,
      name,
      slug,
      description,
      image {
        asset-> {
          _ref,
          url
        },
        alt
      },
      parent-> {
        _id,
        name
      },
      order,
      active,
      seoTitle,
      seoDescription
    }
  `;

  return client.fetch(query);
}

// Função para buscar pacotes de serviços
export async function getServicePackages(options?: {
  category?: string;
  featured?: boolean;
  popular?: boolean;
  limit?: number;
  offset?: number;
}): Promise<ServicePackage[]> {
  const { category, featured, popular, limit = 20, offset = 0 } = options || {};
  
  let filter = 'active == true';
  
  if (category) {
    filter += ` && category->slug.current == "${category}"`;
  }
  
  if (featured) {
    filter += ` && featured == true`;
  }
  
  if (popular) {
    filter += ` && popular == true`;
  }

  const query = `
    *[_type == "servicePackage" && ${filter}] | order(order asc, name asc) [${offset}...${offset + limit}] {
      _id,
      name,
      slug,
      description,
      shortDescription,
      image {
        asset-> {
          _ref,
          url
        },
        alt
      },
      gallery[] {
        asset-> {
          _ref,
          url
        },
        alt
      },
      price,
      originalPrice,
      duration,
      sessions,
      includedServices,
      benefits,
      targetAudience,
      contraindications,
      beforeAfterGallery[] {
        before {
          asset-> {
            _ref,
            url
          }
        },
        after {
          asset-> {
            _ref,
            url
          }
        },
        description
      },
      category-> {
        _id,
        name,
        slug
      },
      featured,
      popular,
      active,
      bookingRequired,
      order,
      seoTitle,
      seoDescription
    }
  `;

  return client.fetch(query);
}

// Função para buscar pacote de serviço por slug
export async function getServicePackageBySlug(slug: string): Promise<ServicePackage | null> {
  const query = `
    *[_type == "servicePackage" && slug.current == $slug && active == true][0] {
      _id,
      name,
      slug,
      description,
      shortDescription,
      image {
        asset-> {
          _ref,
          url
        },
        alt
      },
      gallery[] {
        asset-> {
          _ref,
          url
        },
        alt
      },
      price,
      originalPrice,
      duration,
      sessions,
      includedServices,
      benefits,
      targetAudience,
      contraindications,
      beforeAfterGallery[] {
        before {
          asset-> {
            _ref,
            url
          }
        },
        after {
          asset-> {
            _ref,
            url
          }
        },
        description
      },
      category-> {
        _id,
        name,
        slug
      },
      featured,
      popular,
      active,
      bookingRequired,
      order,
      seoTitle,
      seoDescription
    }
  `;

  return client.fetch(query, { slug });
}

// Função para buscar avaliações
export async function getReviews(options?: {
  productId?: string;
  servicePackageId?: string;
  approved?: boolean;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<Review[]> {
  const { productId, servicePackageId, approved = true, featured, limit = 10, offset = 0 } = options || {};
  
  let filter = approved ? 'approved == true' : '_type == "review"';
  
  if (productId) {
    filter += ` && product._ref == "${productId}"`;
  }
  
  if (servicePackageId) {
    filter += ` && servicePackage._ref == "${servicePackageId}"`;
  }
  
  if (featured) {
    filter += ` && featured == true`;
  }

  const query = `
    *[_type == "review" && ${filter}] | order(createdAt desc) [${offset}...${offset + limit}] {
      _id,
      customerName,
      customerEmail,
      product-> {
        _id,
        name
      },
      servicePackage-> {
        _id,
        name
      },
      rating,
      title,
      comment,
      images[] {
        asset-> {
          _ref,
          url
        },
        alt
      },
      verified,
      featured,
      approved,
      response,
      createdAt
    }
  `;

  return client.fetch(query);
}

// Função para buscar produtos relacionados
export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  const query = `
    *[_type == "product" && _id != $productId && category._ref == $categoryId && active == true] | order(featured desc, name asc) [0...$limit] {
      _id,
      name,
      slug,
      shortDescription,
      images[0] {
        asset-> {
          _ref,
          url
        },
        alt
      },
      price,
      compareAtPrice,
      category-> {
        _id,
        name,
        slug
      },
      featured
    }
  `;

  return client.fetch(query, { productId, categoryId, limit });
}

// Função para buscar pacotes relacionados
export async function getRelatedServicePackages(packageId: string, categoryId?: string, limit = 4): Promise<ServicePackage[]> {
  let query = `
    *[_type == "servicePackage" && _id != $packageId && active == true
  `;
  
  if (categoryId) {
    query += ` && category._ref == $categoryId`;
  }
  
  query += `] | order(popular desc, featured desc, name asc) [0...$limit] {
      _id,
      name,
      slug,
      shortDescription,
      image {
        asset-> {
          _ref,
          url
        },
        alt
      },
      price,
      originalPrice,
      category-> {
        _id,
        name,
        slug
      },
      featured,
      popular,
      bookingRequired
    }
  `;

  return client.fetch(query, { packageId, categoryId, limit });
}
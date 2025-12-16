import { client } from './lib/client';

// Product interface
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
  bundleWith?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    images: Array<{
      asset: {
        _ref: string;
        url?: string;
      };
      alt?: string;
    }>;
  }>;
  bundleDiscount?: number;
}

// Category interface
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

// Service Package interface
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

// Review interface
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

// Function to fetch products
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
      images[defined(asset)] {
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

  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

// Function to fetch product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `
    *[_type == "product" && slug.current == $slug && active == true][0] {
      _id,
      name,
      slug,
      description,
      shortDescription,
      images[defined(asset)] {
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
      seoDescription,
      bundleWith[]->{
        _id,
        name,
        slug,
        price,
        images[0...1] {
          asset-> {
            _ref,
            url
          },
          alt
        }
      },
      bundleDiscount
    }
  `;

  return client.fetch(query, { slug });
}

// Function to fetch categories
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

  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

// Function to fetch service packages
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
      gallery[defined(asset)] {
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

  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

// Function to fetch service package by slug
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
      gallery[defined(asset)] {
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

// Function to fetch reviews
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

// Function to fetch related products
export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
  const query = `
    *[_type == "product" && _id != $productId && category._ref == $categoryId && active == true] | order(featured desc, name asc) [0...$limit] {
      _id,
      name,
      slug,
      shortDescription,
      images[0...1] {
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

// Function to fetch related service packages
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
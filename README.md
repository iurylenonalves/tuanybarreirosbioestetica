# Tuany Barreiros Bioestética - High-Performance E-commerce

This is the official repository for the website and e-commerce platform of **Dr. Tuany Barreiros - Bioestética**. The project is a modern web application designed to showcase bio-aesthetic services, sell products and treatment packages, and share educational content through a blog.

**A production-ready platform transitioning a bio-aesthetics clinic into a fully digital ecosystem with real-time content management and hybrid sales capabilities.**

## 🏆 Key Achievements & Technical Highlights
This project operates in production, delivering high availability and a seamless user experience.

- **🚀 Bleeding Edge Tech Stack:** Built with **Next.js 16** and **Tailwind CSS v4**, utilizing the latest Server Components and React 19 features for maximum efficiency.
- **⚡ 95+ Lighthouse Performance:** Engineered with `next/image` optimization, font sub-setting, and aggressive caching strategies to ensure instant load times even on mobile networks.
- **🛠️ Real-Time Content Velocity:** Empowered the non-technical client with a custom **Sanity Studio**, featuring "Visual Editing" (Draft Mode) for safe, real-time content updates without developer intervention.
- **🔒 Security & Reliability:** Implemented robust validation with **Zod**, Rate Limiting on API routes, and CORS protection to secure client data and payment transactions.

## 🚀 Technologies Used

The project was built with a modern stack focused on performance, SEO, and developer experience:

- **Main Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS (Content Management)**: [Sanity.io](https://www.sanity.io/)
- **Payments**: Integration with [Mercado Pago](https://www.mercadopago.com.br/)
- **Icons**: [Lucide React](https://lucide.dev/) & React Icons
- **Carousels**: [Embla Carousel](https://www.embla-carousel.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Validation**: [Zod](https://zod.dev/)

## ✨ Key Features

### 1. Content Management (CMS)
All site content is dynamic and editable via Sanity Studio (`/studio`), including:
- **Home Page**: Banner (Hero), About Section, Methodology, Results, Features.
- **Blog**: Creation and editing of articles with Rich Text support.
- **Shop**: Management of Products and Service Packages.
- **Services**: Registration of aesthetic procedures.

### 2. E-commerce & Shop
- **Hybrid Catalog**: Support for selling **Physical Products** (e.g., creams) and **Service Packages** (e.g., treatment sessions).
- **Shopping Cart**: Global cart state management.
- **Checkout**: Integration for payment processing.
- **Inventory Management**: Basic stock control for products.

### 3. Blog & SEO
- **Draft Mode (Preview)**: Real-time preview of drafts before publishing (Visual Editing).
- **Optimized SEO**: Dynamic meta tags, XML Sitemap, and Robots.txt configured.
- **Performance**: Use of `next/image` for automatic image optimization and strategic caching (ISR/SSR).

### 4. Security & Infrastructure
- **Rate Limiting**: Protection against abuse on API routes.
- **Origin Validation**: CORS security configured for Preview mode.
- **Analytics**: Integration with Google Analytics 4 (GA4).

## 📂 Project Structure

```bash
src/
├── app/                 # Next.js Routes (App Router)
│   ├── (pages)/         # Public pages (Home, Blog, Shop, etc.)
│   ├── api/             # API Routes (Draft mode, Checkout, etc.)
│   └── studio/          # Sanity Studio Route
├── components/          # React Components
│   ├── cards/           # Product, post, service cards
│   ├── layout/          # Header, Footer
│   ├── sections/        # Full page sections (Hero, Features, etc.)
│   └── ui/              # Base components (Buttons, Inputs, etc.)
├── lib/                 # Utilities and configs (Rate Limit, Logger)
├── sanity/              # CMS Configurations
│   ├── lib/             # Sanity client and helper functions
│   └── schemaTypes/     # Content type definitions (Schemas)
└── styles/              # Global styles
```

## 📝 CMS Schemas (Sanity)

The CMS has the following document types configured:

- **`hero`**: Configuration for the main Home banner.
- **`about`**: Information about Dr. Tuany (Bio, Photo, Role).
- **`post`**: Blog articles.
- **`product`**: Physical products for sale.
- **`servicePackage`**: Service/treatment packages for sale.
- **`procedure`**: List of offered procedures (informational).
- **`results`**: Before/After gallery.
- **`features`**: List of competitive advantages.
- **`methodology`**: Explanation of the work method.
- **`review`**: Customer testimonials.
- **`category`**: Categories to organize products and services.
- **`order`**: Record of placed orders.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tuany-bioestetica.git
   cd tuany-bioestetica
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root with the following keys:

   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-02-06
   
   # Sanity Tokens (Generate in Sanity dashboard)
   SANITY_API_READ_TOKEN=token_with_viewer_permission
   SANITY_API_WRITE_TOKEN=token_with_editor_permission
   SANITY_PREVIEW_SECRET=your_preview_secret

   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Google Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access:**
   - Site: `http://localhost:3000`
   - CMS Studio: `http://localhost:3000/studio`

## 📦 Deploy

The project is configured for deployment on **Vercel**.

1. Connect the GitHub repository to Vercel.
2. Configure the environment variables in the Vercel dashboard.
3. Deployment will be automatic on every push to the `main` branch.

---

Developed for **Tuany Barreiros Bioestética**.

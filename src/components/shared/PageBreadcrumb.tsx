'use client';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <div className="bg-brand-pink-light border-b border-brand-dark-nude/20" style={{ position: 'relative', zIndex: 10 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {item.href ? (
                <a
                  href={item.href}
                  className="hover:text-brand-text-button transition-colors underline cursor-pointer"
                  style={{ position: 'relative', zIndex: 11 }}
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 font-semibold">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

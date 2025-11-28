interface IncludedService {
  service: string;
  quantity: number;
  description?: string;
}

interface ServiceFeaturesProps {
  includedServices?: IncludedService[];
  benefits?: string[];
  targetAudience?: string[];
  contraindications?: string[];
}

export function ServiceFeatures({ 
  includedServices, 
  benefits, 
  targetAudience, 
  contraindications 
}: ServiceFeaturesProps) {
  return (
    <>
      {/* Included Services */}
      {includedServices && includedServices.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">O que está incluído</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {includedServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-brand-dark-nude/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{service.service}</h3>
                  <span className="text-sm bg-brand-pink-light text-brand-text-button px-2 py-1 rounded border border-brand-dark-nude/20">
                    {service.quantity}x
                  </span>
                </div>
                {service.description && (
                  <p className="text-gray-600 text-sm">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Benefícios</h2>
          <div className="bg-brand-pink-light rounded-2xl p-8 border border-brand-dark-nude/20">
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-brand-text-button text-xl">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Target Audience */}
      {targetAudience && targetAudience.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Para quem é indicado</h2>
          <div className="bg-brand-off-white rounded-2xl p-8 border border-brand-dark-nude/20">
            <div className="grid md:grid-cols-2 gap-4">
              {targetAudience.map((audience, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-brand-text-button text-xl">👤</span>
                  <span className="text-gray-700">{audience}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contraindications */}
      {contraindications && contraindications.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Contraindicações</h2>
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <div className="grid gap-3">
              {contraindications.map((contraindication, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-red-600 text-xl">⚠️</span>
                  <span className="text-gray-700">{contraindication}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
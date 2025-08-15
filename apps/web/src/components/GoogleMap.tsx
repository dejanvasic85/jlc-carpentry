interface GoogleMapProps {
  address?: {
    street?: string | null;
    suburb?: string | null;
    state?: string | null;
    postcode?: string | null;
  };
  businessName?: string;
  className?: string;
}

const GoogleMap = ({ address, businessName, className = '' }: GoogleMapProps) => {
  if (!address?.suburb) {
    return null;
  }

  // Construct address string for Google Maps
  const fullAddress = [address.street, address.suburb, address.state, address.postcode, 'Australia']
    .filter(Boolean)
    .join(', ');

  // Fallback to search mode without API key
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title={`Map showing location of ${businessName || 'our business'} in ${address.suburb}`}
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />

        {/* Overlay with business info */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-md p-3 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-jlc-black text-sm">{businessName || 'Our Location'}</h4>
              <p className="text-xs text-gray-600">
                Based in {address.suburb}, {address.state}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-jlc-blue text-white px-3 py-1 rounded text-xs font-medium hover:bg-jlc-blue-dark transition-colors"
              aria-label={`Get directions to ${businessName || 'our business'}`}
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;

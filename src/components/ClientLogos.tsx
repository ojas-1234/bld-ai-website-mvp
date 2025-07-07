import { useState, useEffect } from 'react';
const ClientLogos = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const element = document.getElementById('client-logos');
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  const clients = [{
    name: 'AWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    width: 'w-24',
    height: 'h-12'
  }, {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    width: 'w-32',
    height: 'h-8'
  }, {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    width: 'w-28',
    height: 'h-10'
  }, {
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    width: 'w-24',
    height: 'h-10'
  }, {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    width: 'w-10',
    height: 'h-12'
  }, {
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg',
    width: 'w-12',
    height: 'h-12'
  }, {
    name: 'Samsara',
    logo: '/lovable-uploads/e4f7d2dd-2337-4247-82b1-e256985fe2c9.png',
    width: 'w-28',
    height: 'h-12'
  }, {
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    width: 'w-24',
    height: 'h-10'
  }];
  const duplicatedClients = [...clients, ...clients];
  return <section id="client-logos" className={`py-16 bg-background border-t border-border/20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">We Work with the Best</h2>
          <p className="text-muted-foreground text-lg">
            We've partnered with leading companies to deliver cutting-edge AI solutions
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left" style={{
          width: `${duplicatedClients.length * 200}px`
        }}>
            {duplicatedClients.map((client, index) => <div key={`${client.name}-${index}`} className="flex-shrink-0 w-48 h-24 flex items-center justify-center mx-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img src={client.logo} alt={`${client.name} logo`} className={`${client.width} ${client.height} object-contain filter grayscale hover:grayscale-0 transition-all duration-300`} />
              </div>)}
          </div>
          
          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>;
};
export default ClientLogos;
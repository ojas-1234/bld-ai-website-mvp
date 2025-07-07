import { useEffect, useState } from 'react';

const ClientLogos = () => {
  const clients = [
    { name: 'AWS', logo: 'https://logo.clearbit.com/aws.amazon.com' },
    { name: 'Microsoft Azure', logo: 'https://logo.clearbit.com/azure.microsoft.com' },
    { name: 'DataRobot', logo: 'https://logo.clearbit.com/datarobot.com' },
    { name: 'Samsara', logo: 'https://logo.clearbit.com/samsara.com' },
    { name: 'Median', logo: 'https://logo.clearbit.com/median.co' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-accent/20 to-accent/10 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-12">
          We've worked with the best
        </h2>
        
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          {/* Scrolling logos container */}
          <div className="flex animate-scroll-left">
            {/* First set of logos */}
            <div className="flex space-x-16 min-w-max">
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-12 max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-muted-foreground font-medium">${client.name}</div>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-16 min-w-max">
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-12 max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-muted-foreground font-medium">${client.name}</div>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
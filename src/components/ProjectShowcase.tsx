import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Project {
  id: string;
  client: string;
  logo: string;
  title: string;
  description: string;
  videoPreview: string;
  videoFull: string;
  metrics: {
    title: string;
    value: string;
    description: string;
  }[];
}

const ProjectShowcase = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const projects: Project[] = [
    {
      id: '1',
      client: 'AWS Enterprise',
      logo: 'https://logo.clearbit.com/aws.amazon.com',
      title: 'AI-Powered Cost Optimization',
      description: 'Automated cloud resource optimization using machine learning',
      videoPreview: '/api/placeholder/400/225',
      videoFull: '/api/placeholder/800/450',
      metrics: [
        { title: 'Cost Savings', value: '30%', description: 'Reduced monthly cloud spend' },
        { title: 'Efficiency Gain', value: '45%', description: 'Faster resource allocation' },
        { title: 'ROI', value: '350%', description: 'Return on investment in 6 months' }
      ]
    },
    {
      id: '2',
      client: 'Samsara Fleet',
      logo: 'https://logo.clearbit.com/samsara.com',
      title: 'Predictive Fleet Maintenance',
      description: 'ML-driven predictive maintenance for commercial vehicles',
      videoPreview: '/api/placeholder/400/225',
      videoFull: '/api/placeholder/800/450',
      metrics: [
        { title: 'Downtime Reduction', value: '60%', description: 'Less unexpected breakdowns' },
        { title: 'Maintenance Costs', value: '25%', description: 'Reduction in repair expenses' },
        { title: 'Fleet Efficiency', value: '40%', description: 'Improved vehicle utilization' }
      ]
    },
    {
      id: '3',
      client: 'DataRobot',
      logo: 'https://logo.clearbit.com/datarobot.com',
      title: 'Automated Model Deployment',
      description: 'End-to-end ML pipeline automation and monitoring',
      videoPreview: '/api/placeholder/400/225',
      videoFull: '/api/placeholder/800/450',
      metrics: [
        { title: 'Deployment Speed', value: '75%', description: 'Faster model to production' },
        { title: 'Accuracy Improvement', value: '20%', description: 'Better model performance' },
        { title: 'Developer Productivity', value: '3x', description: 'More models deployed per sprint' }
      ]
    }
  ];

  const handleCardClick = (projectId: string) => {
    if (expandedCard === projectId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(projectId);
    }
  };

  const handleCardHover = (projectId: string, isHovering: boolean) => {
    const newFlipped = new Set(flippedCards);
    if (isHovering && !expandedCard) {
      newFlipped.add(projectId);
    } else {
      newFlipped.delete(projectId);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from our AI solutions that have transformed enterprise operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-500 ${
                expandedCard === project.id 
                  ? 'md:col-span-2 lg:col-span-3 scale-[1.02]' 
                  : 'hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card
                className={`relative h-80 cursor-pointer overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 ${
                  expandedCard === project.id ? 'h-auto' : ''
                }`}
                style={{ 
                  background: expandedCard === project.id 
                    ? 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--accent)))'
                    : undefined,
                  boxShadow: expandedCard === project.id 
                    ? 'var(--shadow-glow)' 
                    : 'var(--shadow-card)'
                }}
                onClick={() => handleCardClick(project.id)}
                onMouseEnter={() => handleCardHover(project.id, true)}
                onMouseLeave={() => handleCardHover(project.id, false)}
              >
                {/* Front of card */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-600 ${
                    flippedCards.has(project.id) && !expandedCard ? 'transform rotateY-180 opacity-0' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={project.logo}
                        alt={project.client}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <h3 className="font-semibold text-foreground">{project.client}</h3>
                    </div>
                    <h4 className="text-xl font-bold text-primary mb-3">{project.title}</h4>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  
                  <div className="mt-4">
                    <div 
                      className="w-full h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-primary rounded-full"></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Video Preview</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card (hover state) */}
                <div
                  className={`absolute inset-0 p-6 bg-gradient-to-br from-primary/10 to-primary/5 transition-transform duration-600 ${
                    flippedCards.has(project.id) && !expandedCard ? 'transform rotateY-0 opacity-100' : 'transform rotateY-180 opacity-0'
                  }`}
                >
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <div className="space-y-4">
                      {project.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl font-bold text-primary">{metric.value}</div>
                          <div className="text-sm font-semibold text-foreground">{metric.title}</div>
                          <div className="text-xs text-muted-foreground">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-primary text-sm font-medium">
                      Click to see full details →
                    </div>
                  </div>
                </div>

                {/* Expanded state */}
                {expandedCard === project.id && (
                  <div className="absolute inset-0 p-8 bg-card animate-fade-in-up">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(null);
                      }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground"
                    >
                      ×
                    </button>
                    
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <img
                            src={project.logo}
                            alt={project.client}
                            className="w-10 h-10 object-contain"
                          />
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{project.client}</h3>
                            <h4 className="text-2xl font-bold text-primary">{project.title}</h4>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 text-lg">{project.description}</p>
                        
                        <div 
                          className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-6"
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-primary/20 rounded-full flex items-center justify-center">
                              <div className="w-8 h-8 bg-primary rounded-full"></div>
                            </div>
                            <p className="text-muted-foreground">Full Demo Video</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-2xl font-bold text-foreground mb-6">Impact Metrics</h5>
                        <div className="space-y-6">
                          {project.metrics.map((metric, idx) => (
                            <div 
                              key={idx} 
                              className="p-4 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30"
                            >
                              <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                              <div className="text-lg font-semibold text-foreground mb-1">{metric.title}</div>
                              <div className="text-muted-foreground">{metric.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
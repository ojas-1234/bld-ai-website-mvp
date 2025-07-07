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
                  className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    flippedCards.has(project.id) && !expandedCard ? 'transform rotateY-180 opacity-0' : 'transform rotateY-0 opacity-100'
                  }`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={project.logo}
                          alt={project.client}
                          className="w-12 h-12 object-contain drop-shadow-sm"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-sm -z-10"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{project.client}</h3>
                        <div className="w-8 h-0.5 bg-primary mt-1"></div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-primary mb-3 leading-tight">{project.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  </div>
                  
                  <div className="mt-4">
                    <div 
                      className="w-full h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg flex items-center justify-center border border-primary/10 hover:border-primary/20 transition-colors duration-300"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">Hover to see results</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card (hover state) */}
                <div
                  className={`absolute inset-0 p-6 bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/20 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    flippedCards.has(project.id) && !expandedCard ? 'transform rotateY-0 opacity-100' : 'transform rotateY-180 opacity-0'
                  }`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-8">
                    <div className="space-y-6">
                      {project.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="transform hover:scale-105 transition-transform duration-300">
                          <div className="text-6xl font-extrabold text-primary mb-2 drop-shadow-lg">{metric.value}</div>
                          <div className="text-lg font-bold text-foreground uppercase tracking-wide">{metric.title}</div>
                          <div className="text-sm text-muted-foreground max-w-xs">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center justify-center space-x-2 text-primary text-sm font-semibold bg-primary/10 px-4 py-2 rounded-full">
                        <span>Click for full case study</span>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded state */}
                {expandedCard === project.id && (
                  <div className="absolute inset-0 p-8 bg-card animate-fade-in-up shadow-2xl">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(null);
                      }}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground text-xl font-bold transition-all duration-200 hover:scale-110 z-10"
                    >
                      ×
                    </button>
                    
                    <div className="grid md:grid-cols-3 gap-8 h-full">
                      {/* Left Column - Project Info */}
                      <div className="md:col-span-1">
                        <div className="flex items-center space-x-4 mb-8">
                          <div className="relative">
                            <img
                              src={project.logo}
                              alt={project.client}
                              className="w-16 h-16 object-contain drop-shadow-lg"
                            />
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-md -z-10"></div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">{project.client}</h3>
                            <h4 className="text-xl font-bold text-primary">{project.title}</h4>
                            <div className="w-12 h-1 bg-primary mt-2 rounded-full"></div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{project.description}</p>
                        
                        {/* Solution Animation Placeholder */}
                        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-xl p-8 border-2 border-primary/20 h-64 flex flex-col items-center justify-center space-y-4">
                          <div className="relative">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center shadow-xl">
                              <div className="w-10 h-10 bg-primary rounded-full animate-pulse"></div>
                            </div>
                            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
                          </div>
                          <div className="text-center">
                            <h6 className="text-lg font-bold text-primary mb-2">Interactive Solution Demo</h6>
                            <p className="text-sm text-muted-foreground">Animated walkthrough coming soon</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Columns - Impact Metrics */}
                      <div className="md:col-span-2">
                        <h5 className="text-3xl font-bold text-foreground mb-8 text-center">Measurable Impact</h5>
                        <div className="grid gap-6">
                          {project.metrics.map((metric, idx) => (
                            <div 
                              key={idx} 
                              className="group p-6 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent/30 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-5xl font-extrabold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">{metric.value}</div>
                                  <div className="text-xl font-bold text-foreground mb-2 uppercase tracking-wider">{metric.title}</div>
                                  <div className="text-muted-foreground text-lg">{metric.description}</div>
                                </div>
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                                </div>
                              </div>
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
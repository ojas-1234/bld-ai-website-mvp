
import { useState, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import awsWaterInfrastructureVideo from '@/assets/aws-water-infrastructure-video.jpg';

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
  demoAnimation?: {
    type: 'chart' | 'flow' | 'metrics';
    data: any;
  };
}

const ProjectShowcase = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      client: 'AWS Enterprise',
      logo: 'https://logo.clearbit.com/aws.amazon.com',
      title: 'Water Infrastructure Digital Twin',
      description: 'Comprehensive digital twin model optimizing water consumption and management at AWS data centers with real-time insights and simulations',
      videoPreview: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop',
      videoFull: awsWaterInfrastructureVideo,
      metrics: [
        { title: 'Truck Reduction', value: '40%', description: 'Fewer trucks needed through optimization' },
        { title: 'Water Efficiency', value: '60%', description: 'Improved consumption planning' },
        { title: 'Cost Offset', value: '100%', description: 'Project costs fully recovered' }
      ],
      demoAnimation: {
        type: 'chart',
        data: {}
      }
    },
    {
      id: '2',
      client: 'Samsara Fleet',
      logo: 'https://logo.clearbit.com/samsara.com',
      title: 'Predictive Fleet Maintenance',
      description: 'ML-driven predictive maintenance for commercial vehicles',
      videoPreview: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
      videoFull: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=675&fit=crop',
      metrics: [
        { title: 'Downtime Reduction', value: '60%', description: 'Less unexpected breakdowns' },
        { title: 'Maintenance Costs', value: '-25%', description: 'Reduction in repair expenses' },
        { title: 'Fleet Efficiency', value: '+40%', description: 'Improved vehicle utilization' }
      ],
      demoAnimation: {
        type: 'flow',
        data: {}
      }
    },
    {
      id: '3',
      client: 'DataRobot',
      logo: 'https://logo.clearbit.com/datarobot.com',
      title: 'Automated Model Deployment',
      description: 'End-to-end ML pipeline automation and monitoring',
      videoPreview: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=450&fit=crop',
      videoFull: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=675&fit=crop',
      metrics: [
        { title: 'Deployment Speed', value: '75%', description: 'Faster model to production' },
        { title: 'Accuracy Improvement', value: '+20%', description: 'Better model performance' },
        { title: 'Developer Productivity', value: '3x', description: 'More models deployed per sprint' }
      ],
      demoAnimation: {
        type: 'metrics',
        data: {}
      }
    }
  ];

  // Loading simulation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = useCallback((projectId: string) => {
    setExpandedCard(projectId);
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedCard(null);
  }, []);

  const handleCardHover = useCallback((projectId: string, isHovering: boolean) => {
    if (expandedCard) return; // Don't flip if a card is expanded
    
    const newFlipped = new Set(flippedCards);
    if (isHovering) {
      newFlipped.add(projectId);
    } else {
      newFlipped.delete(projectId);
    }
    setFlippedCards(newFlipped);
  }, [flippedCards, expandedCard]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent, projectId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(projectId);
    }
  }, [handleCardClick]);

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <Card className="relative h-80 overflow-hidden border-2 border-border/30">
      <div className="absolute inset-0 p-6 animate-pulse">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-muted/50 rounded-lg"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-muted/50 rounded"></div>
            <div className="w-8 h-0.5 bg-primary/30 rounded"></div>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <div className="w-full h-6 bg-muted/50 rounded"></div>
          <div className="w-3/4 h-4 bg-muted/40 rounded"></div>
          <div className="w-full h-4 bg-muted/40 rounded"></div>
        </div>
        <div className="w-full h-32 bg-muted/30 rounded-lg"></div>
      </div>
    </Card>
  );

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background via-background/95 to-accent/5 relative overflow-hidden"
      aria-label="Project showcase section"
    >
      {/* Background enhancement */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_50%)] opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real results from our AI solutions that have transformed enterprise operations
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform hover:scale-[1.03] hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Card
                  className={`
                    relative h-80 cursor-pointer overflow-hidden 
                    border-2 border-border/40 
                    hover:border-primary/60 
                    focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20
                    transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                    backdrop-blur-sm
                    ${focusedCard === project.id ? 'ring-2 ring-primary/30' : ''}
                  `}
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--card)/0.95))',
                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 20px hsl(var(--primary) / 0.05)',
                    willChange: 'transform, box-shadow',
                    perspective: '1000px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(project.id);
                  }}
                  onMouseEnter={() => handleCardHover(project.id, true)}
                  onMouseLeave={() => handleCardHover(project.id, false)}
                  onFocus={() => setFocusedCard(project.id)}
                  onBlur={() => setFocusedCard(null)}
                  onKeyDown={(e) => handleKeyPress(e, project.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expandedCard === project.id}
                  aria-label={`${project.client} project: ${project.title}. Click to expand details.`}
                >
                  {/* Card Flip Container */}
                  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Front of card */}
                    <div
                      className={`
                        absolute inset-0 p-6 flex flex-col justify-between 
                        transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                        will-change-transform
                        ${flippedCards.has(project.id) 
                          ? 'opacity-0 pointer-events-none' 
                          : 'opacity-100'
                        }
                      `}
                      style={{ 
                        transform: flippedCards.has(project.id) ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="relative group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={project.logo}
                              alt={`${project.client} logo`}
                              className="w-12 h-12 object-contain drop-shadow-lg transition-all duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                              {project.client}
                            </h3>
                            <div className="w-8 h-0.5 bg-primary mt-1 group-hover:w-12 transition-all duration-300"></div>
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-primary/90 transition-colors duration-300">
                          {project.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                          <div className="text-center relative z-10">
                            <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary/30 transition-all duration-300">
                              <div className="w-6 h-6 bg-primary rounded-full animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300"></div>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                              Hover to see results
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of card (hover state) */}
                    <div
                      className={`
                        absolute inset-0 p-6 
                        bg-gradient-to-br from-primary/15 to-primary/5 
                        border-2 border-primary/20 
                        transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                        will-change-transform
                        ${flippedCards.has(project.id) 
                          ? 'opacity-100' 
                          : 'opacity-0 pointer-events-none'
                        }
                      `}
                      style={{ 
                        transform: flippedCards.has(project.id) ? 'rotateY(0deg)' : 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div className="h-full flex flex-col justify-center items-center text-center space-y-4 overflow-hidden">
                        <div className="space-y-4 w-full px-2">
                          {project.metrics.slice(0, 2).map((metric, idx) => (
                            <div 
                              key={idx} 
                              className="transform hover:scale-105 transition-transform duration-300"
                              style={{ animationDelay: `${idx * 100}ms` }}
                            >
                              <div 
                                className="text-4xl lg:text-5xl font-extrabold text-primary mb-1 bg-gradient-to-r from-primary to-primary/80 bg-clip-text animate-fade-in-up"
                                style={{ animationDelay: `${idx * 150}ms` }}
                              >
                                {metric.value}
                              </div>
                              <div className="text-sm lg:text-base font-bold text-foreground uppercase tracking-wide mb-1">
                                {metric.title}
                              </div>
                              <div className="text-xs lg:text-sm text-muted-foreground max-w-[90%] mx-auto leading-relaxed">
                                {metric.description}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-auto">
                          <div className="flex items-center justify-center space-x-2 text-primary text-sm font-semibold bg-primary/10 px-6 py-3 rounded-full hover:bg-primary/20 transition-colors duration-300 border border-primary/20">
                            <span>Click for full case study</span>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      <Dialog open={!!expandedCard} onOpenChange={handleCloseExpanded}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-card/95 backdrop-blur-md border border-primary/20">
          {expandedCard && (() => {
            const project = projects.find(p => p.id === expandedCard);
            if (!project) return null;

            return (
              <div className="h-full p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  {/* Left Column - Project Info */}
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={project.logo}
                          alt={`${project.client} logo`}
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
                    
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed flex-1">
                      {project.id === '1' ? (
                        <>
                          <strong className="text-foreground">The Challenge:</strong> AWS faced critical queuing problems in water management with no software solution for capacity planning or emergency scenarios. Without simulation-based optimization, they relied on worst-case Excel scenarios, leading to oversupply in water storage and redundant infrastructure.
                          <br /><br />
                          <strong className="text-foreground">Our Solution:</strong> We designed a comprehensive digital twin with fully customizable water storage configuration accessible through web interface, CLI, and API. Our swarming algorithm optimized truck deployment by maximizing cost functions to minimize disruptions.
                          <br /><br />
                          <strong className="text-foreground">The Impact:</strong> Essential for planning future infrastructure expansions across all data centers and manufacturing facilities - delivered ahead of schedule and under budget.
                        </>
                      ) : project.description}
                    </p>
                    
                    {/* Impact Metrics */}
                    <div className="space-y-4">
                      <h5 className="text-xl font-bold text-foreground mb-4">
                        Key Results
                      </h5>
                      {project.metrics.map((metric, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30"
                        >
                          <div>
                            <div className="text-2xl font-extrabold text-primary mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm font-bold text-foreground uppercase tracking-wider">
                              {metric.title}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground text-right max-w-[120px]">
                            {metric.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Column - Video Demo */}
                  <div className="flex flex-col">
                    <h5 className="text-2xl font-bold text-foreground mb-6 text-center">
                      Solution Demo
                    </h5>
                    
                     {/* Video Container */}
                     <div className="flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-xl border-2 border-primary/20 overflow-hidden relative">
                       <div className="relative aspect-video h-full bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                         {/* Background Image */}
                         <img
                           src={project.videoFull}
                           alt={`${project.client} solution demo`}
                           className="absolute inset-0 w-full h-full object-cover opacity-80"
                         />
                         
                         {/* Tech Overlay for AWS Project */}
                         {project.id === '1' && (
                           <>
                             {/* Animated Data Flow Lines */}
                             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                               {[...Array(5)].map((_, i) => (
                                 <div
                                   key={i}
                                   className="absolute w-0.5 h-16 bg-gradient-to-b from-blue-400/60 via-cyan-300/40 to-transparent rounded-full"
                                   style={{
                                     left: `${15 + i * 18}%`,
                                     top: `${10 + (i % 2) * 20}%`,
                                     animation: `slide-in-right ${2 + i * 0.3}s ease-in-out infinite`,
                                     animationDelay: `${i * 0.4}s`
                                   }}
                                 />
                               ))}
                             </div>
                             
                             {/* Water Flow Indicators */}
                             <div className="absolute top-4 left-4 flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-400/30">
                               <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                               <span className="text-xs text-blue-100 font-semibold">Water Flow: Active</span>
                             </div>
                             
                             {/* Digital Twin Status */}
                             <div className="absolute top-4 right-4 flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-400/30">
                               <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                               <span className="text-xs text-green-100 font-semibold">Digital Twin: Online</span>
                             </div>
                             
                             {/* Efficiency Metrics */}
                             <div className="absolute bottom-4 left-4 bg-purple-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-purple-400/30">
                               <div className="text-xs text-purple-100 font-semibold">Efficiency: 96.2%</div>
                               <div className="w-16 h-1 bg-purple-600/30 rounded-full mt-1">
                                 <div className="w-[96%] h-full bg-gradient-to-r from-purple-400 to-purple-300 rounded-full animate-pulse"></div>
                               </div>
                             </div>
                           </>
                         )}
                         
                         {/* Generic Animated Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse"></div>
                         
                         {/* Play Button */}
                         <div className="relative z-10 text-center">
                           <button 
                             className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-primary/40 hover:bg-primary/40 active:bg-primary/50 transition-all duration-300 group mb-4"
                             aria-label="Play solution demo"
                           >
                             <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1 group-hover:scale-110 group-active:scale-95 transition-transform duration-200"></div>
                           </button>
                           <h6 className="text-lg font-bold text-primary mb-2">
                             {project.id === '1' ? 'Water Infrastructure Demo' : 'Interactive Walkthrough'}
                           </h6>
                           <p className="text-sm text-muted-foreground">
                             {project.id === '1' ? 'Real-time digital twin simulation' : 'Click to see our solution in action'}
                           </p>
                         </div>
                         
                         {/* Generic Animated Elements */}
                         {project.id !== '1' && (
                           <>
                             <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                             <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                           </>
                         )}
                         
                         {/* Generic Data Flow Animation */}
                         {project.id !== '1' && (
                           <div className="absolute inset-0 overflow-hidden pointer-events-none">
                             {[...Array(3)].map((_, i) => (
                               <div
                                 key={i}
                                 className="absolute w-1 h-8 bg-gradient-to-b from-primary/40 to-transparent rounded-full"
                                 style={{
                                   left: `${20 + i * 30}%`,
                                   top: '10%',
                                   animation: `slide-in-right ${3 + i}s ease-in-out infinite`,
                                   animationDelay: `${i * 0.5}s`
                                 }}
                               />
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                    
                    {/* Demo Description */}
                    <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-muted-foreground text-center">
                        This interactive demo showcases how our {project.title.toLowerCase()} solution 
                        delivered measurable results for {project.client}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectShowcase;

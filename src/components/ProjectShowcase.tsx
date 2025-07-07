import { useState, useCallback, useEffect } from 'react';
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
  // Add demo animation data
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
  const [animatingProject, setAnimatingProject] = useState<string | null>(null);

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
      ],
      demoAnimation: {
        type: 'chart',
        data: { /* chart data */ }
      }
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
        { title: 'Maintenance Costs', value: '-25%', description: 'Reduction in repair expenses' },
        { title: 'Fleet Efficiency', value: '+40%', description: 'Improved vehicle utilization' }
      ],
      demoAnimation: {
        type: 'flow',
        data: { /* flow data */ }
      }
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
        { title: 'Accuracy Improvement', value: '+20%', description: 'Better model performance' },
        { title: 'Developer Productivity', value: '3x', description: 'More models deployed per sprint' }
      ],
      demoAnimation: {
        type: 'metrics',
        data: { /* metrics data */ }
      }
    }
  ];

  // Loading simulation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = useCallback((projectId: string) => {
    if (expandedCard === projectId) {
      setExpandedCard(null);
      setAnimatingProject(null);
    } else {
      setExpandedCard(projectId);
      // Start animation after expansion
      setTimeout(() => {
        setAnimatingProject(projectId);
      }, 300);
    }
  }, [expandedCard]);

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

  // Animation component for project demos
  const ProjectDemoAnimation = ({ project, isAnimating }: { project: Project; isAnimating: boolean }) => {
    if (!isAnimating || !project.demoAnimation) return null;

    return (
      <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
        {project.demoAnimation.type === 'chart' && (
          <div className="w-full h-full p-8 animate-fade-in-up">
            {/* Animated Chart Demo */}
            <div className="h-full bg-white/90 backdrop-blur rounded-lg shadow-lg p-6">
              <h5 className="text-lg font-bold mb-4">Cost Optimization Timeline</h5>
              <div className="relative h-48">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 w-12 bg-primary/80 rounded-t transition-all duration-1000"
                    style={{
                      left: `${i * 16}%`,
                      height: isAnimating ? `${20 + i * 15}%` : '0%',
                      transitionDelay: `${i * 200}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {project.demoAnimation.type === 'flow' && (
          <div className="w-full h-full p-8 animate-fade-in-up">
            {/* Animated Flow Demo */}
            <div className="h-full bg-white/90 backdrop-blur rounded-lg shadow-lg p-6">
              <h5 className="text-lg font-bold mb-4">Predictive Maintenance Flow</h5>
              <div className="flex items-center justify-around h-32">
                {['Sensor Data', 'ML Analysis', 'Prediction', 'Alert'].map((step, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center text-white font-bold mb-2 transition-all duration-500"
                      style={{
                        transform: isAnimating ? 'scale(1)' : 'scale(0)',
                        transitionDelay: `${i * 300}ms`
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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
                className={`group transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform ${
                  expandedCard === project.id 
                    ? 'md:col-span-2 lg:col-span-3 scale-[1.01] z-20' 
                    : 'hover:scale-[1.03] hover:-translate-y-2'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: expandedCard === project.id ? 'translateZ(0)' : undefined
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
                    ${expandedCard === project.id ? 'h-auto border-primary/60' : ''}
                    ${focusedCard === project.id ? 'ring-2 ring-primary/30' : ''}
                  `}
                  style={{ 
                    background: expandedCard === project.id 
                      ? 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--accent)/0.3))'
                      : 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--card)/0.95))',
                    boxShadow: expandedCard === project.id 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px hsl(var(--primary) / 0.15)' 
                      : '0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 20px hsl(var(--primary) / 0.05)',
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
                        ${flippedCards.has(project.id) && !expandedCard 
                          ? 'opacity-0 pointer-events-none' 
                          : 'opacity-100'
                        }
                      `}
                      style={{ 
                        transform: flippedCards.has(project.id) && !expandedCard ? 'rotateY(-180deg)' : 'rotateY(0deg)',
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
                              {expandedCard ? 'Click to see demo' : 'Hover to see results'}
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
                        ${flippedCards.has(project.id) && !expandedCard 
                          ? 'opacity-100' 
                          : 'opacity-0 pointer-events-none'
                        }
                      `}
                      style={{ 
                        transform: flippedCards.has(project.id) && !expandedCard ? 'rotateY(0deg)' : 'rotateY(180deg)',
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

                  {/* Expanded state */}
                  {expandedCard === project.id && (
                    <div className="absolute inset-0 p-4 md:p-8 bg-card/95 backdrop-blur-md animate-fade-in-up shadow-2xl border border-primary/20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard(null);
                          setAnimatingProject(null);
                        }}
                        className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 rounded-full bg-muted/80 hover:bg-muted backdrop-blur-sm flex items-center justify-center text-foreground text-xl font-bold transition-all duration-200 hover:scale-110 z-20 focus:ring-2 focus:ring-primary/30 touch-manipulation"
                        aria-label="Close expanded view"
                      >
                        ×
                      </button>
                      
                      <div className="grid md:grid-cols-3 gap-6 md:gap-8 h-full">
                        {/* Left Column - Project Info */}
                        <div className="md:col-span-1">
                          <div className="flex items-center space-x-4 mb-6 md:mb-8">
                            <div className="relative">
                              <img
                                src={project.logo}
                                alt={`${project.client} logo`}
                                className="w-12 md:w-16 h-12 md:h-16 object-contain drop-shadow-lg"
                              />
                              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-md -z-10"></div>
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-foreground">{project.client}</h3>
                              <h4 className="text-lg md:text-xl font-bold text-primary">{project.title}</h4>
                              <div className="w-12 h-1 bg-primary mt-2 rounded-full"></div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* Video/Solution Demo Container */}
                          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-xl border-2 border-primary/20 overflow-hidden touch-manipulation relative">
                            {/* Video Container */}
                            <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center min-h-[200px]">
                              {/* Add animation demo */}
                              <ProjectDemoAnimation project={project} isAnimating={animatingProject === project.id} />
                              
                              <div className="relative z-10 text-center">
                                <div className="relative mb-4">
                                  <button 
                                    className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm border border-primary/30 hover:bg-primary/30 active:bg-primary/40 transition-all duration-300 cursor-pointer group touch-manipulation"
                                    aria-label="Play solution demo"
                                  >
                                    <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1 group-hover:scale-110 group-active:scale-95 transition-transform duration-200"></div>
                                  </button>
                                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
                                </div>
                                <h6 className="text-lg font-bold text-primary mb-2">Solution Demo</h6>
                                <p className="text-sm text-muted-foreground">Tap to play interactive walkthrough</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Columns - Impact Metrics */}
                        <div className="md:col-span-2">
                          <h5 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
                            Measurable Impact
                          </h5>
                          <div className="grid gap-4 md:gap-6">
                            {project.metrics.map((metric, idx) => (
                              <div 
                                key={idx} 
                                className="group p-4 md:p-6 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent/30 hover:border-primary/40 active:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[1.01] touch-manipulation"
                                style={{ animationDelay: `${idx * 100}ms` }}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-primary to-primary


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InteractiveTimeline from './InteractiveTimeline';

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  const dynamicPrompts = [
    'Start a project for me',
    'Create a proposal for an AI-powered digital twin',
    'What solutions/teams are available?'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % dynamicPrompts.length);
        setIsTransitioning(false);
      }, 200); // Half transition duration
    }, 4000); // Slightly longer interval for better readability

    return () => clearInterval(interval);
  }, []);

  const quickActions = ['Brainstorm 💡', 'Proposal 📋', 'Estimate 💰', 'Hire a team 👥', 'About bld.ai ℹ️', 'QA & Compliance 📋'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      setSubmittedPrompt(prompt);
      setShowTimeline(true);
      console.log('Submitted:', prompt);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent/5 to-accent/10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/ddef9eac-5628-4264-93f0-5cabc331b304.png" 
            alt="bld.ai logo" 
            className="w-16 h-16"
          />
        </div>

        {/* Main Value Proposition */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight whitespace-nowrap">
            <span className="text-foreground">We build</span>{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-flow_4s_ease-in-out_infinite]">
                Enterprise AI Solutions
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-xl animate-[pulse_3s_ease-in-out_infinite]"></div>
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium">Faster, Smarter, Cheaper</p>
        </div>

        {/* Prompt Input */}
        <div className="mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Input
                type="text"
                placeholder={dynamicPrompts[currentPlaceholder]}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full h-14 pl-6 pr-24 text-lg border-2 border-border/50 focus:border-primary rounded-xl bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-400 placeholder:transition-opacity placeholder:duration-400 ${
                  isTransitioning ? 'placeholder:opacity-0' : 'placeholder:opacity-100'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button type="button" variant="ghost" size="sm" className="p-2 hover:bg-muted/50">
                  📎
                </Button>
                <Button type="button" variant="ghost" size="sm" className="p-2 hover:bg-muted/50">
                  🎤
                </Button>
                <Button type="submit" size="sm" className="px-4 bg-primary hover:bg-primary/90">
                  Generate
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="px-4 py-2 text-sm border-border/50 hover:border-primary/50 hover:bg-accent/20 transition-all duration-300"
            >
              {action}
            </Button>
          ))}
        </div>

        {/* Enhanced Timeline Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-3xl"></div>
              
              <div className="relative space-y-16">
                {/* Step 1 */}
                <div className="text-center group">
                  <div className="relative inline-block">
                    <div className="absolute -inset-8 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700"></div>
                    <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl hover:shadow-violet-500/10 transition-all duration-500">
                      <h3 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-flow_8s_ease-in-out_infinite]">
                          Assemble a Team
                        </span>
                      </h3>
                      <div className="text-2xl font-semibold text-violet-500">in 24 hours</div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 1 */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-1 h-16 bg-gradient-to-b from-violet-500 via-purple-500 to-blue-500 rounded-full"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-blue-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="text-center group">
                  <div className="relative inline-block">
                    <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700"></div>
                    <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                      <h3 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-flow_8s_ease-in-out_infinite_1s]">
                          Proposal
                        </span>
                      </h3>
                      <div className="text-2xl font-semibold text-cyan-500">in 24 hours</div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 2 */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-1 h-16 bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500 rounded-full"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-emerald-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="text-center group">
                  <div className="relative inline-block">
                    <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700"></div>
                    <div className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                      <h3 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-flow_8s_ease-in-out_infinite_2s]">
                          MVP
                        </span>
                      </h3>
                      <div className="text-2xl font-semibold text-emerald-500">in 2 weeks</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Timeline */}
      {showTimeline && (
        <InteractiveTimeline prompt={submittedPrompt} />
      )}
    </section>
  );
};

export default HeroSection;

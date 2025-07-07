import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    // Handle prompt submission
    console.log('Submitted:', prompt);
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
                  →
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

        {/* New Captivating Timeline Text */}
        <div className="mb-16">
          <div className="relative p-8 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 border border-primary/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradient-flow_6s_ease-in-out_infinite]">
                    Assemble a Team in 24 hours
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 blur-lg animate-[pulse_4s_ease-in-out_infinite]"></div>
                </span>
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                <div className="mx-4 text-2xl animate-bounce">→</div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradient-flow_6s_ease-in-out_infinite_1s]">
                    Proposal in 24 hours
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-cyan-400/30 to-blue-400/30 blur-lg animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
                </span>
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"></div>
                <div className="mx-4 text-2xl animate-bounce">→</div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradient-flow_6s_ease-in-out_infinite_2s]">
                    MVP in 2 weeks
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 blur-lg animate-[pulse_4s_ease-in-out_infinite_2s]"></div>
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mb-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business with AI?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can help you build the future, faster.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Book your free meeting now
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center text-primary">
          <div className="text-sm mb-2">scroll to view more</div>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

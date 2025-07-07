
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const dynamicPrompts = [
    'Start a project for me',
    'Create a proposal for an AI-powered digital twin',
    'What solutions/teams are available?'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % dynamicPrompts.length);
    }, 3000); // Change every 3 seconds

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
                className="w-full h-14 pl-6 pr-24 text-lg border-2 border-border/50 focus:border-primary rounded-xl bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300"
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

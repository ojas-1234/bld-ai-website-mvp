import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');

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
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">bld.ai</h1>
        </div>

        {/* Main Value Proposition */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            We build{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent whitespace-nowrap">
              Enterprise-Level AI Solutions
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium">Faster, Better, Smarter</p>
        </div>

        {/* Prompt Input */}
        <div className="mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Ask bld.ai"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-14 pl-6 pr-24 text-lg border-2 border-border/50 focus:border-primary rounded-xl bg-card/80 backdrop-blur-sm shadow-lg"
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


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import type { CarouselApi } from '@/components/ui/carousel';

interface Milestone {
  id: number;
  title: string;
  duration: string;
  tasks: string[];
}

interface InteractiveTimelineProps {
  prompt: string;
}

const InteractiveTimeline = ({ prompt }: InteractiveTimelineProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Demo milestones - in real app this would be AI generated based on prompt
  const milestones: Milestone[] = [
    {
      id: 0,
      title: "Product Design & Management",
      duration: "2 weeks",
      tasks: [
        "Project planning and requirements gathering",
        "Technical architecture planning", 
        "Tech Stack and third-party integration feasibility analysis",
        "User experience design and wireframing",
        "Stakeholder alignment and documentation"
      ]
    },
    {
      id: 1,
      title: "Core MVP",
      duration: "6 weeks", 
      tasks: [
        "Course Content Upload & Processing - Interface for uploading course outlines and SOPs",
        "AI-Powered Content Generation - Convert uploaded materials into structured lesson content",
        "Avatar SDK Integration - Integrate Klleon SDK for AI avatar functionality",
        "Class Scheduling & Management - Create and manage live avatar sessions with meeting links",
        "Live Chat System - Real-time Q&A interaction with AI avatar during classes",
        "Basic Infrastructure Setup - Core hosting, security, and user authentication"
      ]
    },
    {
      id: 2,
      title: "Essential Learning Tools",
      duration: "4 weeks",
      tasks: [
        "Text-Based Quiz System - Create and deliver assessments through chat interface",
        "Student Progress Monitoring - Track individual learning completion and milestones",
        "User Enrollment & Management - Manage student access and course registration", 
        "Course Material Organization - Structured content library for course resources"
      ]
    },
    {
      id: 3,
      title: "Advanced Learning Capabilities", 
      duration: "6 weeks",
      tasks: [
        "Assessment Completion Analytics - Detailed insights into student engagement",
        "Intelligent Assessment Generation - AI-generated questions based on course content",
        "Learning Path Design & Prerequisites - Define curriculum sequences and dependencies",
        "Achievement & Certification System - Badges and certificates for course completion",
        "Content Repository & Search - Searchable library of all course materials",
        "Detailed Learning Analytics - Comprehensive reporting on learning outcomes"
      ]
    },
    {
      id: 4,
      title: "Enterprise-Ready Platform",
      duration: "4 weeks", 
      tasks: [
        "Multi-Organization Support - Manage multiple departments and organizations",
        "AI-Driven Content Recommendations - Personalized course suggestions for learners",
        "Role-Based Access Control - Granular permissions for different user types",
        "Enterprise Reporting & Analytics - Organization-wide performance dashboards"
      ]
    }
  ];

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleBuildClick = () => {
    console.log('Build clicked for project:', prompt);
    // In real app, this would trigger the actual build process
  };

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground">Proposed Timeline for: "{prompt}"</h3>
        <p className="text-muted-foreground">Swipe through milestones or tap the timeline below</p>
      </div>

      {/* Timeline Navigation */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-muted via-primary/20 to-muted transform -translate-y-1/2" />
        <div className="flex items-center justify-between px-8 relative">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex flex-col items-center group">
              <button
                onClick={() => scrollToSlide(index)}
                className={`
                  relative w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 transform hover:scale-110
                  ${current === index 
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/25 scale-110 animate-pulse' 
                    : current > index
                      ? 'bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground shadow-lg shadow-primary/15'
                      : 'bg-gradient-to-br from-background to-muted border border-border text-muted-foreground hover:border-primary hover:text-primary hover:shadow-lg'
                  }
                `}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                {milestone.id}
              </button>
              <div className={`mt-3 text-xs font-medium transition-colors duration-300 ${
                current === index ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {milestone.duration}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center group">
            <button
              onClick={() => scrollToSlide(milestones.length)}
              className={`
                relative w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-500 transform hover:scale-110
                ${current === milestones.length
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl shadow-green-500/25 scale-110 animate-pulse' 
                  : 'bg-gradient-to-br from-background to-muted border border-border text-muted-foreground hover:border-green-500 hover:text-green-500 hover:shadow-lg'
                }
              `}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              🚀
            </button>
            <div className={`mt-3 text-xs font-medium transition-colors duration-300 ${
              current === milestones.length ? 'text-green-500' : 'text-muted-foreground'
            }`}>
              Build
            </div>
          </div>
        </div>
      </div>

      <Carousel 
        className="w-full"
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent>
          {milestones.map((milestone) => (
            <CarouselItem key={milestone.id} className="md:basis-1/2 lg:basis-1/3">
              <Card 
                className={`
                  h-full cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl
                  bg-gradient-to-br from-card via-card to-card/95 border-0 shadow-lg
                  ${selectedMilestone === milestone.id 
                    ? 'ring-2 ring-primary shadow-primary/20 shadow-2xl scale-[1.02]' 
                    : 'hover:shadow-primary/10'
                  }
                `}
                onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className="bg-primary/5 border-primary/20 text-primary font-medium"
                    >
                      Milestone {milestone.id}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-0 font-semibold px-3 py-1">
                      {milestone.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {milestone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {milestone.tasks.slice(0, selectedMilestone === milestone.id ? milestone.tasks.length : 2).map((task, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 text-sm text-muted-foreground group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0 group-hover:bg-primary transition-colors" />
                        <span className="leading-relaxed group-hover:text-foreground transition-colors">
                          {task}
                        </span>
                      </div>
                    ))}
                    {milestone.tasks.length > 2 && selectedMilestone !== milestone.id && (
                      <div className="flex items-center space-x-2 text-xs text-primary cursor-pointer hover:text-primary/80 transition-colors pt-2 border-t border-border/50">
                        <span>+{milestone.tasks.length - 2} more tasks</span>
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px]">→</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
          
          {/* Build Button Card */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-teal-950/50 border-green-200/50 dark:border-green-800/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5" />
              <CardContent className="text-center p-8 relative z-10">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="text-5xl animate-bounce">🚀</div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-xl" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-green-600">
                      Ready to Build?
                    </h3>
                    <p className="text-muted-foreground">
                      Transform your vision into reality
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleBuildClick}
                    className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg font-semibold"
                  >
                    Build This Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default InteractiveTimeline;

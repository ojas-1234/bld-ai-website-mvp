import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

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

  const handleBuildClick = () => {
    console.log('Build clicked for project:', prompt);
    // In real app, this would trigger the actual build process
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Proposed Timeline for: "{prompt}"</h3>
        <p className="text-muted-foreground">Swipe or use arrows to explore each milestone</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {milestones.map((milestone) => (
            <CarouselItem key={milestone.id} className="md:basis-1/2 lg:basis-1/3">
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedMilestone === milestone.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Milestone {milestone.id}</Badge>
                    <Badge className="bg-primary/10 text-primary">{milestone.duration}</Badge>
                  </div>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {milestone.tasks.slice(0, selectedMilestone === milestone.id ? milestone.tasks.length : 2).map((task, index) => (
                      <div key={index} className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 py-1">
                        {task}
                      </div>
                    ))}
                    {milestone.tasks.length > 2 && selectedMilestone !== milestone.id && (
                      <div className="text-xs text-primary cursor-pointer hover:underline">
                        +{milestone.tasks.length - 2} more tasks... (tap to expand)
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
          
          {/* Build Button Card */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="text-center p-8">
                <div className="space-y-4">
                  <div className="text-4xl">🚀</div>
                  <h3 className="text-xl font-bold">Ready to Build?</h3>
                  <p className="text-muted-foreground text-sm">
                    Start your project with our expert team
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleBuildClick}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white"
                  >
                    Build This Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        
        <CarouselPrevious className="-left-8" />
        <CarouselNext className="-right-8" />
      </Carousel>
    </div>
  );
};

export default InteractiveTimeline;

import HeroSection from '@/components/HeroSection';
import ClientLogos from '@/components/ClientLogos';
import ProjectShowcase from '@/components/ProjectShowcase';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ClientLogos />
      <ProjectShowcase />
      <CallToAction />
    </div>
  );
};

export default Index;

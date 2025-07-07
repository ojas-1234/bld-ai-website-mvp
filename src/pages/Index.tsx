import HeroSection from '@/components/HeroSection';
import ClientLogos from '@/components/ClientLogos';
import ProjectShowcase from '@/components/ProjectShowcase';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ClientLogos />
      <ProjectShowcase />
    </div>
  );
};

export default Index;

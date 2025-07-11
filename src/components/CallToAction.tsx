import { Button } from '@/components/ui/button';
const CallToAction = () => {
  return <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-accent/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready for Agentic AI?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">See how business outcomes can meet applied AI</p>
          <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Book your free meeting now
          </Button>
        </div>
      </div>
    </section>;
};
export default CallToAction;
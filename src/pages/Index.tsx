
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, FileText, Zap, Palette } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      title: "Intelligent Conversations",
      description: "Revolutionary AI that masters context, emotion, and nuance - delivering interviews so natural they feel human. Experience dialogue that adapts, learns, and evolves with every interaction."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: "Real-time Processing",
      description: "Blazing-fast neural processing with sub-100ms response times. Zero lag, zero interruptions - just seamless voice interactions that flow at the speed of thought."
    },
    {
      icon: <Palette className="w-8 h-8 text-green-400" />,
      title: "Natural Voice Quality",
      description: "Premium voice synthesis that's indistinguishable from human speech. Powered by cutting-edge ElevenLabs technology for emotionally expressive, crystal-clear audio."
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
      title: "Enhanced Interview Experience",
      description: "Provide comprehensive interview practice with instant feedback and evaluation, leading to better candidate preparation and confidence."
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-400" />,
      title: "Increased Operational Efficiency",
      description: "Automate initial screening processes and free up valuable human resources to focus on more strategic hiring initiatives."
    }
  ];

  const handleTryNow = () => {
    window.open("https://elevenlabs.io/app/talk-to?agent_id=agent_01jxrsbbnre6g980t2vkyx3q9t", "_blank");
  };

  const handleWatchDemo = () => {
    // Placeholder for demo functionality
    console.log("Watch Demo clicked");
  };

  const handleStartConversation = () => {
    window.open("https://elevenlabs.io/app/talk-to?agent_id=agent_01jxrsbbnre6g980t2vkyx3q9t", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="text-center z-10 px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-scale-in">
            AI-Interviewer
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto animate-fade-in animation-delay-200">
            Experience the future of interview practice with natural, intelligent voice interactions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <Button 
              onClick={handleTryNow}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full border-2 border-green-400 hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Try Now
            </Button>
            <Button 
              onClick={handleWatchDemo}
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Revolutionary Features
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gray-800/50 border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our AI Agent Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Our AI Interviewer?
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="bg-gray-900/50 border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10 animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-400 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience It Live Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 animate-fade-in">
            Experience It Live
          </h2>
          
          <Card className="bg-gray-800/50 border-green-500/30 p-12 hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                AI Interviewer in Action
              </h3>
              
              {/* Audio Visualizer */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-green-500 rounded-full animate-pulse"
                    style={{
                      width: '4px',
                      height: `${20 + Math.random() * 40}px`,
                      animationDelay: `${i * 100}ms`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Click the button below to start talking with our AI interviewer and discover
              the power of natural voice conversations.
            </p>
            
            <Button 
              onClick={handleStartConversation}
              className="bg-gray-600 hover:bg-gray-500 text-white px-12 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start Conversation
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-green-400 font-bold text-lg mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Demo</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-green-400 font-bold text-lg mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-green-400 font-bold text-lg mb-4">Connect</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 AI-Interviewer. All rights reserved. Powered by ElevenLabs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/home");
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to AI Interviewer</h1>
        <p className="text-gray-400 mb-8">Practice your interview skills with our AI-powered platform</p>
        <Button 
          onClick={() => navigate("/auth")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;

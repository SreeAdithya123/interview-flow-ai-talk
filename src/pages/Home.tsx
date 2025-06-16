
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, CreditCard, LogOut, Coins, Zap, Crown, Star } from "lucide-react";

const Home = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    isFirstTime: false, // Set to true for first-time users
    freeCoins: 3,
    plan: "Free" // Free, Plus, Premium
  });

  const [coins, setCoins] = useState(user.freeCoins);

  const handleStartInterview = () => {
    if (coins > 0) {
      setCoins(coins - 1);
      window.open("https://elevenlabs.io/app/talk-to?agent_id=agent_01jxsme3j2ftb8mz73n7sv1vkc", "_blank");
    }
  };

  const handleUpgrade = () => {
    window.location.href = "/#/profile";
  };

  const handleLogout = () => {
    window.location.href = "/#/auth";
  };

  const goToProfile = () => {
    window.location.href = "/#/profile";
  };

  const goToDashboard = () => {
    window.location.href = "/#/dashboard";
  };

  const goToPricing = () => {
    window.location.href = "/#/profile";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-green-400">AI-Interviewer</h1>
            <nav className="flex gap-4">
              <Button variant="ghost" className="text-white hover:text-green-400">
                Home
              </Button>
              <Button 
                onClick={goToDashboard}
                variant="ghost" 
                className="text-gray-400 hover:text-white"
              >
                Dashboard
              </Button>
              <Button 
                onClick={goToProfile}
                variant="ghost" 
                className="text-gray-400 hover:text-white"
              >
                Profile
              </Button>
              <Button 
                onClick={goToPricing}
                variant="ghost" 
                className="text-gray-400 hover:text-white"
              >
                Pricing
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Coin Display */}
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{coins}</span>
              <span className="text-gray-400 text-sm">coins</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white">{user.name}</span>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="bg-red-600 hover:bg-red-700 text-white border-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {user.isFirstTime 
              ? `Hey ${user.name}!!! Let's Begin Your First Interview` 
              : `Hey ${user.name}... Welcome Back. Let's Begin Our Interview`
            }
          </h2>
          <p className="text-gray-400 text-lg">
            Practice with our AI interviewer and improve your skills
          </p>
        </div>

        {/* Coin Status and Interview Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Interview Card */}
          <Card className="bg-gray-800 border-green-500/30 p-8">
            <div className="text-center">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Start AI Interview</h3>
              <p className="text-gray-300 mb-6">
                Begin your interview practice session with our advanced AI interviewer
              </p>
              
              {coins > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Coins className="w-5 h-5" />
                    <span className="font-semibold">{coins} free interviews remaining</span>
                  </div>
                  <Button 
                    onClick={handleStartInterview}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-full w-full"
                  >
                    Start Interview
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-red-400 font-semibold">
                    No free interviews remaining
                  </div>
                  <Button 
                    onClick={handleUpgrade}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-full w-full"
                  >
                    Upgrade to Continue
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Coin Status Card */}
          <Card className="bg-gray-800 border-yellow-500/30 p-8">
            <div className="text-center">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Your Coins</h3>
              
              <div className="space-y-4">
                <div className="text-4xl font-bold text-yellow-400">{coins}</div>
                <p className="text-gray-300">Free interviews remaining</p>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Current Plan</span>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {user.plan}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    Each interview uses 1 coin. Upgrade for unlimited access!
                  </p>
                </div>

                {coins === 0 && (
                  <Button 
                    onClick={handleUpgrade}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full w-full"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Plan Upgrade Section */}
        {coins <= 1 && (
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 p-8 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                {coins === 0 ? "Out of Free Interviews!" : "Almost Out of Coins!"}
              </h3>
              <p className="text-gray-300 mb-6">
                Upgrade to Plus or Premium for unlimited interviews and advanced features
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-blue-400">Plus Plan</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">50 interviews/month</p>
                  <Button 
                    onClick={handleUpgrade}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Upgrade to Plus
                  </Button>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-purple-400">Premium Plan</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Unlimited interviews</p>
                  <Button 
                    onClick={handleUpgrade}
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                  >
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 p-6 hover:border-green-500/30 transition-colors cursor-pointer" onClick={goToDashboard}>
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">View Dashboard</h4>
                <p className="text-gray-400 text-sm">Check your progress</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-6 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={goToProfile}>
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Profile Settings</h4>
                <p className="text-gray-400 text-sm">Manage your account</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-6 hover:border-purple-500/30 transition-colors cursor-pointer" onClick={goToPricing}>
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Upgrade Plan</h4>
                <p className="text-gray-400 text-sm">View pricing options</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;

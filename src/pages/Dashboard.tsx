
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { User, TrendingUp, Clock, Target, Award, BarChart3, PieChart as PieChartIcon, LogOut, Settings } from "lucide-react";

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { profile, sessions, loading: dataLoading } = useUserData();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading || !user || !profile) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Calculate analytics from real data
  const latestSession = sessions[0];
  const averageScore = sessions.length > 0 
    ? Math.round(sessions.reduce((acc, session) => acc + (session.overall_score || 0), 0) / sessions.length)
    : 0;

  // Voice analysis data from latest session or defaults
  const voiceAnalysisData = latestSession?.voice_analysis ? [
    { name: "Clarity", value: latestSession.voice_analysis.clarity_score, color: "#10B981" },
    { name: "Confidence", value: latestSession.voice_analysis.confidence_score, color: "#3B82F6" },
    { name: "Pace", value: latestSession.voice_analysis.pace_score, color: "#F59E0B" },
    { name: "Tone", value: latestSession.voice_analysis.tone_score, color: "#EF4444" },
  ] : [
    { name: "Clarity", value: 0, color: "#10B981" },
    { name: "Confidence", value: 0, color: "#3B82F6" },
    { name: "Pace", value: 0, color: "#F59E0B" },
    { name: "Tone", value: 0, color: "#EF4444" },
  ];

  // Interview comparison data
  const interviewComparisonData = sessions.length >= 2 ? [
    { 
      category: "Communication", 
      lastInterview: sessions[1]?.voice_analysis?.clarity_score || 0, 
      latestInterview: sessions[0]?.voice_analysis?.clarity_score || 0 
    },
    { 
      category: "Confidence", 
      lastInterview: sessions[1]?.voice_analysis?.confidence_score || 0, 
      latestInterview: sessions[0]?.voice_analysis?.confidence_score || 0 
    },
    { 
      category: "Pace", 
      lastInterview: sessions[1]?.voice_analysis?.pace_score || 0, 
      latestInterview: sessions[0]?.voice_analysis?.pace_score || 0 
    },
    { 
      category: "Tone", 
      lastInterview: sessions[1]?.voice_analysis?.tone_score || 0, 
      latestInterview: sessions[0]?.voice_analysis?.tone_score || 0 
    },
    { 
      category: "Overall Score", 
      lastInterview: sessions[1]?.overall_score || 0, 
      latestInterview: sessions[0]?.overall_score || 0 
    },
  ] : [];

  const chartConfig = {
    lastInterview: {
      label: "Last Interview",
      color: "#94A3B8",
    },
    latestInterview: {
      label: "Latest Interview",
      color: "#10B981",
    },
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const goHome = () => {
    navigate("/home");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Track your interview progress and improvements</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={goHome}
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              Home
            </Button>
            <Button 
              onClick={goToProfile}
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              <Settings className="w-4 h-4 mr-2" />
              Profile
            </Button>
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

        {/* Profile Section */}
        <Card className="bg-gray-800 border-green-500/30 p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{profile.full_name || profile.email}</h2>
              <p className="text-gray-400 mb-2">{profile.email}</p>
              <div className="flex gap-6 text-sm">
                <span className="text-gray-300">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Last Interview: {latestSession ? new Date(latestSession.created_at).toLocaleDateString() : "None"}
                </span>
                <span className="text-gray-300">
                  <Target className="w-4 h-4 inline mr-1" />
                  Total Interviews: {sessions.length}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Average Score</span>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{averageScore}%</div>
              <Progress value={averageScore} className="h-2" />
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Latest Score</span>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">{latestSession?.overall_score || 0}%</div>
              <p className="text-sm text-gray-400">From last interview</p>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Best Category</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {latestSession?.voice_analysis ? 
                  Object.entries({
                    Clarity: latestSession.voice_analysis.clarity_score,
                    Confidence: latestSession.voice_analysis.confidence_score,
                    Pace: latestSession.voice_analysis.pace_score,
                    Tone: latestSession.voice_analysis.tone_score
                  }).reduce((a, b) => a[1] > b[1] ? a : b)[0] : "N/A"
                }
              </div>
              <p className="text-sm text-gray-400">Highest score</p>
            </div>
          </div>
        </Card>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Analysis Pie Chart */}
          <Card className="bg-gray-800 border-green-500/30 p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChartIcon className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Voice Analysis</h3>
            </div>
            
            {latestSession?.voice_analysis ? (
              <>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={voiceAnalysisData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {voiceAnalysisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {voiceAnalysisData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-300 text-sm">{item.name}</span>
                      <span className="text-white font-semibold ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                <p>No interview data available yet. Complete your first interview to see analysis!</p>
              </div>
            )}
          </Card>

          {/* Interview Comparison Bar Chart */}
          <Card className="bg-gray-800 border-green-500/30 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Interview Comparison</h3>
            </div>
            
            {interviewComparisonData.length > 0 ? (
              <>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interviewComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="category" 
                        stroke="#9CA3AF" 
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="lastInterview" fill="#94A3B8" name="Last Interview" radius={4} />
                      <Bar dataKey="latestInterview" fill="#10B981" name="Latest Interview" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                
                <div className="flex justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-gray-300 text-sm">Last Interview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-300 text-sm">Latest Interview</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                <p>Complete at least 2 interviews to see comparison data!</p>
              </div>
            )}
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-green-500/30 p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Interview Sessions</h3>
          
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{session.session_type} Interview</h4>
                      <p className="text-gray-400 text-sm">
                        {new Date(session.created_at).toLocaleDateString()} • {session.duration_minutes || 30} min
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">{session.overall_score || 0}%</div>
                    <div className="text-sm text-gray-400">Score</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No interview sessions yet. Start your first interview to see your progress!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

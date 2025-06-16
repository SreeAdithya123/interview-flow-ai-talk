
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Bell, Shield, CreditCard, Crown, Check, ArrowLeft } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "",
    plan: "Pro",
    joinDate: "January 2024"
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    practiceReminders: true,
    weeklyReports: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Profile saved:", user);
  };

  const goBack = () => {
    window.location.href = "/#/dashboard";
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "5 practice interviews per month",
        "Basic voice analysis",
        "Standard feedback",
        "Community support"
      ],
      current: user.plan === "Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "Unlimited practice interviews",
        "Advanced voice & speech analysis",
        "Detailed performance reports",
        "Industry-specific questions",
        "Priority support",
        "Progress tracking"
      ],
      current: user.plan === "Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      features: [
        "Everything in Pro",
        "Custom question sets",
        "Team collaboration",
        "Advanced analytics",
        "Dedicated account manager",
        "API access"
      ],
      current: user.plan === "Enterprise",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={goBack}
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
          </div>
          
          <Button 
            onClick={goHome}
            variant="outline" 
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            Home
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="bg-gray-800 border-green-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-green-500/20 text-green-400 text-xl">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Crown className="w-3 h-3 mr-1" />
                        {user.plan}
                      </Badge>
                    </div>
                    <p className="text-gray-400">Member since {user.joinDate}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      value={user.name}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <Input
                      value={user.phone}
                      onChange={(e) => setUser({...user, phone: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      value={user.location}
                      onChange={(e) => setUser({...user, location: e.target.value})}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Card */}
            <Card className="bg-gray-800 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-gray-400 text-sm">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, emailNotifications: checked})
                    }
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Get notified on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, pushNotifications: checked})
                    }
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Practice Reminders</p>
                    <p className="text-gray-400 text-sm">Daily practice session reminders</p>
                  </div>
                  <Switch
                    checked={settings.practiceReminders}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, practiceReminders: checked})
                    }
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Weekly Reports</p>
                    <p className="text-gray-400 text-sm">Get weekly progress summaries</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, weeklyReports: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan Card */}
            <Card className="bg-gray-800 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-green-400" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-green-400">{user.plan}</h3>
                  <p className="text-gray-400">
                    {pricingPlans.find(p => p.current)?.price} 
                    {pricingPlans.find(p => p.current)?.period !== "forever" && 
                      ` ${pricingPlans.find(p => p.current)?.period}`
                    }
                  </p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Billing
                </Button>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="bg-gray-800 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="w-full bg-red-600 hover:bg-red-700 text-white border-red-500">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Section */}
        <Card className="bg-gray-800 border-green-500/30 mt-8">
          <CardHeader>
            <CardTitle className="text-white text-center">Choose Your Plan</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Upgrade or downgrade your subscription at any time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-lg border-2 ${
                    plan.current
                      ? "border-green-500 bg-green-500/10"
                      : plan.popular
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-700/50"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.current
                        ? "bg-green-600 hover:bg-green-700"
                        : plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

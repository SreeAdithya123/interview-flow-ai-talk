import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Simulate successful login
    window.location.href = "/#/home";
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempted with:", { name, email, password });
    // Simulate successful signup
    window.location.href = "/#/home";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-green-500/30">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{isLogin ? "Login" : "Sign Up"}</h2>
            <p className="text-gray-400">
              {isLogin ? "Login to your account" : "Create a new account"}
            </p>
          </div>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-700 text-white focus-visible:ring-green-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-gray-700 text-white focus-visible:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Password"
                className="bg-gray-700 text-white focus-visible:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-white"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

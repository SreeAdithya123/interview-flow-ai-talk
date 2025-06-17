
-- Create user profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create interview sessions table
CREATE TABLE public.interview_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  session_type text NOT NULL DEFAULT 'general',
  duration_minutes integer,
  overall_score integer CHECK (overall_score >= 0 AND overall_score <= 100),
  status text NOT NULL DEFAULT 'completed',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create voice analysis table
CREATE TABLE public.voice_analysis (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES public.interview_sessions(id) ON DELETE CASCADE NOT NULL,
  clarity_score integer CHECK (clarity_score >= 0 AND clarity_score <= 100),
  confidence_score integer CHECK (confidence_score >= 0 AND confidence_score <= 100),
  pace_score integer CHECK (pace_score >= 0 AND pace_score <= 100),
  tone_score integer CHECK (tone_score >= 0 AND tone_score <= 100),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user coins table
CREATE TABLE public.user_coins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  free_coins integer DEFAULT 3 NOT NULL,
  plan_type text DEFAULT 'free' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_coins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for interview_sessions
CREATE POLICY "Users can view own interview sessions" ON public.interview_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interview sessions" ON public.interview_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interview sessions" ON public.interview_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for voice_analysis
CREATE POLICY "Users can view own voice analysis" ON public.voice_analysis
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.interview_sessions 
      WHERE id = voice_analysis.session_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own voice analysis" ON public.voice_analysis
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.interview_sessions 
      WHERE id = voice_analysis.session_id AND user_id = auth.uid()
    )
  );

-- Create RLS policies for user_coins
CREATE POLICY "Users can view own coins" ON public.user_coins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own coins" ON public.user_coins
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own coins" ON public.user_coins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_coins (user_id, free_coins, plan_type)
  VALUES (new.id, 3, 'free');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_coins
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

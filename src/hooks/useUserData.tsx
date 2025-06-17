
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface UserCoins {
  free_coins: number;
  plan_type: string;
}

interface InterviewSession {
  id: string;
  session_type: string;
  duration_minutes?: number;
  overall_score?: number;
  created_at: string;
  voice_analysis?: {
    clarity_score: number;
    confidence_score: number;
    pace_score: number;
    tone_score: number;
  };
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [coins, setCoins] = useState<UserCoins | null>(null);
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }

      // Fetch coins
      const { data: coinsData } = await supabase
        .from('user_coins')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (coinsData) {
        setCoins(coinsData);
      }

      // Fetch interview sessions with voice analysis
      const { data: sessionsData } = await supabase
        .from('interview_sessions')
        .select(`
          *,
          voice_analysis(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (sessionsData) {
        const formattedSessions = sessionsData.map(session => ({
          ...session,
          voice_analysis: session.voice_analysis?.[0] || null
        }));
        setSessions(formattedSessions);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCoins = async (newCoinCount: number) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('user_coins')
      .update({ free_coins: newCoinCount })
      .eq('user_id', user.id);
    
    if (!error) {
      setCoins(prev => prev ? { ...prev, free_coins: newCoinCount } : null);
    }
  };

  const addInterviewSession = async (sessionData: {
    session_type: string;
    duration_minutes?: number;
    overall_score?: number;
  }) => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('interview_sessions')
      .insert({
        user_id: user.id,
        ...sessionData
      })
      .select()
      .single();
    
    if (!error && data) {
      await fetchUserData(); // Refresh data
      return data.id;
    }
    
    return null;
  };

  const addVoiceAnalysis = async (sessionId: string, analysisData: {
    clarity_score: number;
    confidence_score: number;
    pace_score: number;
    tone_score: number;
  }) => {
    const { error } = await supabase
      .from('voice_analysis')
      .insert({
        session_id: sessionId,
        ...analysisData
      });
    
    if (!error) {
      await fetchUserData(); // Refresh data
    }
  };

  return {
    profile,
    coins,
    sessions,
    loading,
    updateCoins,
    addInterviewSession,
    addVoiceAnalysis,
    refreshData: fetchUserData
  };
};

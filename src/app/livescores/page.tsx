'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface LiveScore {
  id: number;
  home_team_id: number;
  away_team_id: number;
  home_score: number;
  away_score: number;
  start_time: string;
  league_id: number;
  status: string;
  updated_at: string;
  home_logo: string;
  away_logo: string;
  finished_at?: string;
  home_team: string;
  away_team: string;
  minute?: number;
  starting_at: string;
  league_name?: string;
  league_logo?: string;
  venue_name?: string;
  venue_city?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LiveScores() {
  const [scheduledMatches, setScheduledMatches] = useState<LiveScore[]>([]);
  const [liveMatches, setLiveMatches] = useState<LiveScore[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<LiveScore[]>([]);
  const [activeTab, setActiveTab] = useState<'scheduled' | 'live' | 'finished'>('live');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetchAllMatches();

    // Set up realtime subscriptions
    const scheduledSubscription = supabase
      .channel('livescores-scheduled-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'livescores_scheduled'
        },
        (payload) => {
          handleScheduledChange(payload);
        }
      )
      .subscribe();

    const liveSubscription = supabase
      .channel('livescores-live-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'livescores_live'
        },
        (payload) => {
          handleLiveChange(payload);
        }
      )
      .subscribe();

    const finishedSubscription = supabase
      .channel('livescores-finished-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'livescores_finished'
        },
        (payload) => {
          handleFinishedChange(payload);
        }
      )
      .subscribe();

    return () => {
      scheduledSubscription.unsubscribe();
      liveSubscription.unsubscribe();
      finishedSubscription.unsubscribe();
    };
  }, []);

  const fetchAllMatches = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchScheduledMatches(),
      fetchLiveMatches(),
      fetchFinishedMatches()
    ]);
    setIsLoading(false);
  };

  const fetchScheduledMatches = async () => {
    const { data, error } = await supabase
      .from('livescores_scheduled')
      .select('*')
      .order('start_time', { ascending: true });

    if (!error && data) {
      setScheduledMatches(data);
    }
  };

  const fetchLiveMatches = async () => {
    const { data, error } = await supabase
      .from('livescores_live')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setLiveMatches(data);
    }
  };

  const fetchFinishedMatches = async () => {
    const { data, error } = await supabase
      .from('livescores_finished')
      .select('*')
      .order('finished_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setFinishedMatches(data);
    }
  };

  const handleScheduledChange = (payload: any) => {
    switch (payload.eventType) {
      case 'INSERT':
        setScheduledMatches(prev => [...prev, payload.new].sort((a, b) => 
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        ));
        break;
      case 'UPDATE':
        setScheduledMatches(prev => 
          prev.map(match => match.id === payload.new.id ? payload.new : match)
        );
        break;
      case 'DELETE':
        setScheduledMatches(prev => prev.filter(match => match.id !== payload.old.id));
        break;
    }
  };

  const handleLiveChange = (payload: any) => {
    switch (payload.eventType) {
      case 'INSERT':
        setLiveMatches(prev => [payload.new, ...prev]);
        break;
      case 'UPDATE':
        setLiveMatches(prev => 
          prev.map(match => match.id === payload.new.id ? payload.new : match)
        );
        break;
      case 'DELETE':
        setLiveMatches(prev => prev.filter(match => match.id !== payload.old.id));
        break;
    }
  };

  const handleFinishedChange = (payload: any) => {
    switch (payload.eventType) {
      case 'INSERT':
        setFinishedMatches(prev => [payload.new, ...prev.slice(0, 19)]);
        break;
      case 'UPDATE':
        setFinishedMatches(prev => 
          prev.map(match => match.id === payload.new.id ? payload.new : match)
        );
        break;
      case 'DELETE':
        setFinishedMatches(prev => prev.filter(match => match.id !== payload.old.id));
        break;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'NS': 'Not Started',
      'LIVE': 'Live',
      'HT': 'Half Time',
      'FT': 'Full Time',
      'POSTPONED': 'Postponed',
      'CANCELLED': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const renderMatchCard = (match: LiveScore, showTime: boolean = true) => (
    <div
      key={match.id}
      className="bg-card rounded-lg shadow-md p-4 border-l-4 border-primary mb-3"
    >
      {showTime && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {new Date(match.start_time).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            match.status === 'LIVE' ? 'bg-destructive/20 text-destructive' :
            match.status === 'HT' ? 'bg-warning/20 text-warning' :
            'bg-muted text-muted-foreground'
          }`}>
            {getStatusText(match.status)}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 flex-1">
          <img
            src={match.home_logo || '/placeholder-team.png'}
            alt="Home team"
            className="w-8 h-8 object-contain"
          />
          <span className="font-medium text-foreground">{match.home_team}</span>
        </div>

        <div className="flex items-center space-x-3 mx-4">
          <span className="text-2xl font-bold text-foreground">{match.home_score}</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-2xl font-bold text-foreground">{match.away_score}</span>
        </div>

        <div className="flex items-center space-x-2 flex-1 justify-end">
          <span className="font-medium text-foreground">{match.away_team}</span>
          <img
            src={match.away_logo || '/placeholder-team.png'}
            alt="Away team"
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>

      {match.status === 'LIVE' && (
        <div className="mt-2 text-xs text-green-600 font-semibold">
          Last updated: {new Date(match.updated_at).toLocaleTimeString()}
        </div>
      )}

      {match.finished_at && (
        <div className="mt-2 text-xs text-muted-foreground">
          Finished: {new Date(match.finished_at).toLocaleDateString()} at {new Date(match.finished_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      )}
    </div>
  );

  // Handle empty state for all tabs
  const renderEmptyState = () => (
    <div className="text-center py-12 bg-muted/50 rounded-lg">
      <div className="text-6xl mb-4">⚽</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {activeTab === 'live' && 'No Live Matches Right Now'}
        {activeTab === 'scheduled' && 'No Scheduled Matches'}
        {activeTab === 'finished' && 'No Finished Matches'}
      </h3>
      <p className="text-muted-foreground">
        {activeTab === 'live' && 'Check back later for live football action!'}
        {activeTab === 'scheduled' && 'No matches are scheduled at the moment.'}
        {activeTab === 'finished' && 'No matches have finished recently.'}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading live scores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Live Scores</h2>
        <p className="text-muted-foreground">
          Real-time updates of football matches
        </p>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'live' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('live')}
        >
          Live Matches ({liveMatches.length})
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'scheduled' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('scheduled')}
        >
          Scheduled ({scheduledMatches.length})
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'finished' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('finished')}
        >
          Finished ({finishedMatches.length})
        </button>
      </div>

      <div className="space-y-3">
        {activeTab === 'live' && (
          liveMatches.length > 0 
            ? liveMatches.map(match => renderMatchCard(match)) 
            : renderEmptyState()
        )}
        
        {activeTab === 'scheduled' && (
          scheduledMatches.length > 0 
            ? scheduledMatches.map(match => renderMatchCard(match)) 
            : renderEmptyState()
        )}
        
        {activeTab === 'finished' && (
          finishedMatches.length > 0 
            ? finishedMatches.map(match => renderMatchCard(match, false)) 
            : renderEmptyState()
        )}
      </div>
    </div>
  );
}
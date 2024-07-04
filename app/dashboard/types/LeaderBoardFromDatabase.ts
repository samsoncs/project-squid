export type LeaderBoardFromDatabase = {
    game_id: number;
    game_name: string;
    is_squid_game: boolean;
    completed: boolean;
    squid_token_used?: string;
    squid_token_used_by?: string;
    team_name: string;
    place: number;
    points: number | null;
  };
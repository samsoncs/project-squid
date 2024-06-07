import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getLeaderboard(req: Request, supabase: SupabaseClient): Promise<Response> {
  const { data, error } = await supabase.rpc('get_leaderboard')

  const resultsByTeamName = Object.groupBy(data, f => f.team_name)
  const keys = Object.keys(resultsByTeamName).filter(k => k !== "null");

  const result = keys.map(k => ({
    teamName: k,
    score: resultsByTeamName[k].reduce((a, b) => a + ((!b.squid_token_used ? (keys.length - b.place) : 0)), 0),
    firstPlaces: resultsByTeamName[k]
    .filter(r => r.place === 1 && !r.squid_token_used)
    .length,
    secondPlaces: resultsByTeamName[k]
    .filter(r => r.place === 2 && !r.squid_token_used)
    .length,
    thirdPlaces: resultsByTeamName[k]
    .filter(r => r.place === 3 && !r.squid_token_used)
    .length,
    squidTokensUsed: resultsByTeamName[k]
    .filter(r => r.squid_token_used)
    .length
  }))

  if (error) {
    throw error
  }

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function getGames(req: Request, supabase: SupabaseClient): Promise<Response> {
  const { data, error } = await supabase.rpc('get_leaderboard')

  const resultsByGame = Object.groupBy(data, f => f.game_name)
  const keys = Object.keys(resultsByGame).filter(k => k !== "null");
  const result = {
    completed: keys.filter(k => resultsByGame[k][0].completed).map(k => ({
      gameName: k,
      order:  resultsByGame[k][0].game_id,
      isSquidGame: resultsByGame[k][0].is_squid_game,
      firstPlace: !resultsByGame[k][0].squid_token_used ? resultsByGame[k].find(g => g.place === 1).team_name : null,
      secondPlace: !resultsByGame[k][0].squid_token_used ? resultsByGame[k].find(g => g.place === 2).team_name : null,
      thirdPlace: !resultsByGame[k][0].squid_token_used ? resultsByGame[k].find(g => g.place === 3).team_name : null,
      squidTokenUsed: resultsByGame[k][0].squid_token_used
    })),
    upcoming: keys.filter(k => !resultsByGame[k][0].completed).map(k => ({
      gameName: k,
      order:  resultsByGame[k][0].game_id,
      isSquidGame: resultsByGame[k][0].is_squid_game,
    }))
  }

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const url = new URL(req.url)
    const method = req.method
    const command = url.pathname.split('/').pop()

    switch (`${method}:${command}`) {
      case 'GET:leaderboard':
        return getLeaderboard(req, supabase)
      case 'GET:games':
        return getGames(req, supabase)
    }

    return new Response("Not found", { status: 404 })
       
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 })
  }
})
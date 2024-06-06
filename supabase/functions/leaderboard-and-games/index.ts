import { createClient } from 'https://esm.sh/@supabase/supabase-js'

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data, error } = await supabase.rpc('get_leaderboard')

    const resultsByTeamName = Object.groupBy(data, f => f.team_name)

    const keys = Object.keys(resultsByTeamName).filter(k => k !== "null");

    const result = keys.map(k => ({
      teamName: k,
      score: resultsByTeamName[k].reduce((a, b) => a + (keys.length - b.place), 0),
      firstPlaces: resultsByTeamName[k]
      .filter(r => r.place === 1)
      .length,
      secondPlaces: resultsByTeamName[k]
      .filter(r => r.place === 2)
      .length,
      thirdPlaces: resultsByTeamName[k]
      .filter(r => r.place === 3)
      .length,
      squidTokensUsed: resultsByTeamName[k]
      .filter(r => r.squid_token_used)
      .length
    }))

    if (error) {
      throw error
    }

    console.log(result)

    return new Response(JSON.stringify({ result }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 })
  }
})
CREATE OR REPLACE FUNCTION get_leaderboard()
  returns table (
    game_id integer, 
    game_name varchar(100), 
    is_squid_game boolean, 
    completed boolean, 
    team_name varchar(100), 
    place integer, 
    squid_token_used varchar(50)
    )
AS 
$$
    select 
        ga.game_id,
        ga."name" as game_name,
        ga.is_squid_game,
        ga.completed,
        te."name" as team_name,
        gr.place,
        gr.squid_token_used
    from game ga
    left join gameround gr on gr.game_id = ga.game_id
    left join team te on te.team_id = gr.team_id
    order by ga.game_id
$$
LANGUAGE sql;
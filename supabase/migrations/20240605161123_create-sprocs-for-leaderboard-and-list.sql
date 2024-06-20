CREATE OR REPLACE FUNCTION get_leaderboard()
  returns table (
    game_id integer, 
    game_name varchar(100), 
    is_squid_game boolean, 
    completed boolean, 
    squid_token_used varchar(50),
    team_name varchar(100), 
    place integer
    )
AS 
$$
    select 
        ga.game_id,
        ga."name" as game_name,
        ga.is_squid_game,
        ga.completed,
        (select "name" from team where team_id = ga.squid_token_used) as squid_token_used,
        te."name" as team_name,
        gr.place
    from game ga
    left join game_round gr on gr.game_id = ga.game_id
    left join team te on te.team_id = gr.team_id
    order by ga.game_id
$$
LANGUAGE sql;

CREATE OR REPLACE FUNCTION complete_game(game_id integer, first_place integer, second_place integer, third_place integer, fourth_place integer)
RETURNS void
AS
$$
BEGIN
    IF auth.uid() != '66efe21d-7bf8-4425-915b-8000a7b10840' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    UPDATE game SET completed = true
	WHERE game.game_id = complete_game.game_id;

    -- Reset state if re-completing a round
    DELETE FROM game_round WHERE game_round.game_id = complete_game.game_id;

    INSERT INTO game_round(game_id, team_id, place)
    VALUES 
        (game_id, first_place, 1),
        (game_id, second_place, 2),
        (game_id, third_place, 3),
        (game_id, fourth_place, 4);
END;
$$
LANGUAGE plpgsql;
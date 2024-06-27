CREATE OR REPLACE FUNCTION get_leaderboard()
  returns table (
    game_id integer, 
    game_name varchar(100), 
    is_squid_game boolean, 
    completed boolean, 
    squid_token_used varchar(50),
    squid_token_used_by varchar(100),
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
        tu.token_type as squid_token_used,
        (select "name" from team where team_id = tu.team_id) as squid_token_used_by,
        te."name" as team_name,
        gr.place
    from game ga
    left join game_round gr on gr.game_id = ga.game_id
    left join team te on te.team_id = gr.team_id
    left join tokens_used tu on tu.game_id = ga.game_id --and tu.team_id = te.team_id
    order by ga.game_id
$$
LANGUAGE sql;

CREATE OR REPLACE FUNCTION start_game(game_id integer)
RETURNS void
AS
$$
BEGIN
    IF auth.uid() != '66efe21d-7bf8-4425-915b-8000a7b10840' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

	IF (SELECT min(game.game_id) FROM game WHERE game.is_started = false) != start_game.game_id THEN
        RAISE EXCEPTION 'Cant start that game yet';
	END IF;

	UPDATE game set is_started = true
    WHERE game.game_id = start_game.game_id;

END;
$$
LANGUAGE plpgsql;





CREATE OR REPLACE FUNCTION complete_game(game_id integer, result_list integer[])
RETURNS void
AS
$$
DECLARE 
	i int = 1;
	curr_team int;
    curr_token varchar(50);
    curr_token_team_id int;
    number_of_teams int;
	points int;
BEGIN
    IF auth.uid() != '66efe21d-7bf8-4425-915b-8000a7b10840' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    IF (SELECT is_started FROM game WHERE game.game_id = complete_game.game_id) = false THEN
        RAISE EXCEPTION 'Cant complete game that is not started';
    END IF;

    number_of_teams = cardinality(result_list);
	IF (select count(1) from Team) != number_of_teams THEN
		RAISE EXCEPTION 'All teams needs to have result to complete game';
	END IF;

	-- Give tokens to first place if a squid game, and it has not been completed yet
	IF (SELECT is_squid_game FROM game WHERE game.game_id = complete_game.game_id) = true
		AND (SELECT completed FROM game WHERE game.game_id = complete_game.game_id) = false
	THEN 
		INSERT INTO tokens_available(team_id, token_type)
		VALUES(complete_game.result_list[1], 'REVERSE');
	END IF;

    UPDATE game SET completed = true
	WHERE game.game_id = complete_game.game_id;

    -- Reset state if re-completing a round
    DELETE FROM game_round WHERE game_round.game_id = complete_game.game_id;

    SELECT t.token_type, t.team_id INTO curr_token, curr_token_team_id 
	FROM tokens_used t 
	WHERE t.game_id = complete_game.game_id;
		
	FOREACH curr_team IN ARRAY result_list LOOP
		-- Hide points if token was used, and its not the last game
        IF curr_token IS NOT NULL AND complete_game.game_id != (SELECT MAX(game.game_id) FROM game) THEN
            points = null;
		ELSEIF curr_token = 'REVERSE' THEN
            points = i - 1;
        ELSEIF (curr_token = 'DOUBLE_TROUBLE' AND curr_token_team_id = curr_team AND i < number_of_teams) THEN
            points = (number_of_teams - i) * 2;
        ELSEIF (curr_token = 'DOUBLE_TROUBLE' AND curr_token_team_id = curr_team AND i = number_of_teams) THEN
            points = (number_of_teams - i) - 1;
        ELSE
            points = (number_of_teams - i);
        END IF;

		INSERT INTO game_round(game_id, team_id, place, points) 
	    VALUES (game_id, curr_team, i, points);
        i:= i+ 1;	
	END LOOP;

END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION use_token(token_id integer, game_id integer)
RETURNS void
AS
$$
DECLARE 
BEGIN

    IF (SELECT is_started FROM game WHERE game.game_id = use_token.game_id) = true THEN
        RAISE EXCEPTION 'Cant use token on started game';
    END IF;

    IF EXISTS(SELECT * FROM tokens_used WHERE tokens_used.game_id = use_token.game_id) THEN
        RAISE EXCEPTION 'Someone already used a token on given game';
    END IF;


	INSERT INTO tokens_used(tokens_used_id,token_type,team_id,game_id)
	SELECT 
		use_token.token_id, 
		tokens_available.token_type,
		tokens_available.team_id,
		use_token.game_id
	FROM tokens_available WHERE tokens_available.tokens_available_id = use_token.token_id;

	DELETE FROM tokens_available WHERE tokens_available.tokens_available_id = use_token.token_id;
END;
$$
LANGUAGE plpgsql;
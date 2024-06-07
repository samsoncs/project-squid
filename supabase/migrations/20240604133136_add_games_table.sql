CREATE TABLE game(
    game_id integer primary key,
    "name" varchar(500) not null,
    is_squid_game boolean not null default false,
    completed boolean not null default false,
    squid_token_used bigint REFERENCES team(team_id)
);
	
CREATE TABLE GameRound(
    game_round_id bigint primary key generated always as identity,
    team_id bigint REFERENCES team(team_id),
    game_id bigint REFERENCES game(game_id),
    place int not null
);
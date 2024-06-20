CREATE TABLE game(
    game_id integer primary key,
    "name" varchar(500) not null,
    is_squid_game boolean not null default false,
    completed boolean not null default false,
    squid_token_used bigint REFERENCES team(team_id)
);

alter table game enable row level security;

create policy "Authenticated can read from game"
on game for select
to authenticated
using ( true );

create policy "Hardcoded authenticated user can update completed and squid_token_used"
on game for update
to authenticated
using ( (select auth.uid()) = '66efe21d-7bf8-4425-915b-8000a7b10840' );

CREATE TABLE game_round(
    game_round_id bigint primary key generated always as identity,
    team_id bigint REFERENCES team(team_id),
    game_id bigint REFERENCES game(game_id),
    place int not null,
    UNIQUE (game_round_id, team_id, game_id)
);

alter table game_round enable row level security;

create policy "Authenticated can read from game_round"
on game_round for select
to authenticated
using ( true );

create policy "Hardcoded authenticated user can insert game_rounds"
on game_round for insert
to authenticated
with check( (select auth.uid()) = '66efe21d-7bf8-4425-915b-8000a7b10840' );
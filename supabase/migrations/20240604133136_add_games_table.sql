CREATE TABLE game(
    game_id integer primary key,
    "name" varchar(500) not null,
    is_squid_game boolean not null default false,
    completed boolean not null default false,
    squid_token_used bigint REFERENCES team(team_id)
);

alter table game enable row level security;

create policy "Anyone can read from game"
on game for select
to anon, authenticated
using ( true );

--create policy "Hardcoded authenticated user can update completed and squid_token_used"
--on game for update
--to authenticated
--using ( (select auth.uid()) = '2b70bafd-9aa3-47d4-854e-da678d181635' )
--with check ( (select auth.uid()) = user_id ); -- checks if the new row complies with the policy expression


CREATE TABLE game_round(
    game_round_id bigint primary key generated always as identity,
    team_id bigint REFERENCES team(team_id),
    game_id bigint REFERENCES game(game_id),
    place int not null
);

alter table game_round enable row level security;

create policy "Anyone can read from game_round"
on game_round for select
to anon, authenticated
using ( true );


CREATE TABLE game(
    game_id integer primary key,
    "name" varchar(500) not null,
    is_squid_game boolean not null default false,
    is_started boolean not null default false,
    completed boolean not null default false
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
    team_id bigint not null REFERENCES team(team_id),
    game_id bigint not null REFERENCES game(game_id),
    place int not null,
    points int,
    UNIQUE (team_id, game_id)
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

CREATE TABLE tokens_used(
    tokens_used_id bigint primary key,
	token_type varchar(50) not null,
    team_id bigint not null REFERENCES team(team_id),
    game_id bigint not null REFERENCES game(game_id),
	UNIQUE(game_id)
);

alter table tokens_used enable row level security;

create policy "Authenticated can read from tokens_used"
on tokens_used for select
to authenticated
using ( true );

create policy "Hardcoded authenticated user can insert tokens_used"
on tokens_used for insert
to authenticated
with check( (select auth.uid()) = '66efe21d-7bf8-4425-915b-8000a7b10840' );

-- Token types:
-- REVERSE => Reverse the ordering for round
-- DOUBLE_TROUBLE => Double points if in top 3 (or top half?), minus point if not
-- EVEN_STEVEN => +1 point if on even place

CREATE TABLE tokens_available(
    tokens_available_id bigint primary key generated always as identity,
    team_id bigint not null REFERENCES team(team_id),
	token_type varchar(50),
	constraint check_token_type check (token_type in ('REVERSE', 'DOUBLE_TROUBLE'))
);

alter table tokens_available enable row level security;

create policy "Authenticated can read all tokens from tokens_available assigned to their own team"
on tokens_available for select
to authenticated
using (team_id = (select cast((auth.jwt() -> 'app_metadata' ->> 'team') as integer)));


create policy "Authenticated can delete tokens from tokens_available assigned to their own team"
on tokens_available for delete
to authenticated
using (team_id = (select cast((auth.jwt() -> 'app_metadata' ->> 'team') as integer)));

create policy "Hardcoded authenticated user can insert tokens_available"
on tokens_available for insert
to authenticated
with check( (select auth.uid()) = '66efe21d-7bf8-4425-915b-8000a7b10840' );
CREATE TABLE team(
    team_id bigint primary key not null,
    name varchar(100)
);

alter table team enable row level security;

create policy "Authenticated can read from teams"
on team for select
to authenticated
using ( true );
CREATE TABLE Game(
    GameId bigint primary key generated always as identity,
    Order integer not null,
    Name varchar(500) not null,
    SquidGame boolean not null default false,
    Completed boolean not null default false,
)

CREATE TABLE GameRound(
    GameRoundId bigint primary key generated always as identity,
    TeamId bigint REFERENCES Team(TeamId)
    GameId bigint REFERENCES Game(GameId)
    Place int not null,
    SquidTokenUsed boolean not null default false
)
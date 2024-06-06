
insert into game(game_id, "name", is_squid_game, completed)
values
(1, 'The cookie cutter', false, true),
(2, 'Running', false, true),
(3, 'Skiing', true, false),
(4, 'Go Kart', false, false),
(5, 'Skipping rope', false, false),
(6, 'Dancing', true, false)


insert into team(team_id, "name")
values
(1, 'Gangbu'),
(2, 'Milaysian'),
(3, 'Test'),
(4, 'Cool team')


insert into gameround(team_id, game_id, place, squid_token_used)
values
(1,1,4,false),
(2,1,2,false),
(3,1,1,false),
(4,1,3,false),
(1,2,1,false),
(2,2,2,false),
(3,2,3,false),
(4,2,4,false)

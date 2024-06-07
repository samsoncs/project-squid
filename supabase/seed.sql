insert into team(team_id, "name")
values
(1, 'Gangbu'),
(2, 'Milaysian'),
(3, 'Test'),
(4, 'Cool team');

insert into game(game_id, "name", is_squid_game, completed, squid_token_used)
values
(1, 'The cookie cutter', true, true, null),
(2, 'Running', false, true, 1),
(3, 'Skiing', true, false, null),
(4, 'Go Kart', false, false, 2),
(5, 'Skipping rope', false, false, null),
(6, 'Dancing', true, false, null);

insert into gameround(team_id, game_id, place)
values
(1,1,4),
(2,1,2),
(3,1,1),
(4,1,3),
(1,2,1),
(2,2,2),
(3,2,3),
(4,2,4);

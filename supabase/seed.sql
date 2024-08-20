-- Clean up
delete from auth.users
delete from starting_tokens;
delete from tokens_available;
delete from tokens_used;
delete from game_round;
delete from team;
delete from game;

insert into team(team_id, "name")
values
(1, 'Gangbu'),
(2, 'Milaysian'),
(3, 'Test'),
(4, 'Cool team');

insert into game(game_id, "name", is_squid_game)
values
(1, 'Go Kart', true),
(2, 'The Name of the Game', true),
(3, 'Electrobubble Trouble', true),
(4, 'Shock and score', true), -- Penalties
(5, 'Water or vodka', true),
(6, 'Shocking Truth', true), -- Quiz
(7, 'Squid Grid', false),
(8, 'Battle Squid', false),
(9, 'Rock, Paper, Squidsor', false),
(10, 'Wiener Schwung!', false),
(11, 'The Secret Frontman ', false);

insert into starting_tokens(token_type)
values
('REVERSE'),
('REVERSE'),
('DOUBLE_TROUBLE'),
('DOUBLE_TROUBLE'),
('DOUBLE_TROUBLE'),
('DOUBLE_TROUBLE');

INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
)
values(
    '66efe21d-7bf8-4425-915b-8000a7b10840',
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'samsoncsv@gmail.com',
    crypt('qwer1234', gen_salt('bf')),
    now(),
    NULL::timestamp,
    '',
    NULL::timestamp,
    '',
    NULL::timestamp,
    '',
    '',
    NULL::timestamp,
    now()::timestamp,
    '{"provider":"email","providers":["email"], "team": 1}'::jsonb,
    '{}'::jsonb,
    0::boolean,
    '2022-10-04 03:41:27.391146+00'::timestamp,
    '2022-10-04 03:41:27.391146+00'::timestamp,
    NULL,
    NULL::timestamp,
    '',
    '',
    NULL::timestamp,
    '',
    0,
    NULL::timestamp,
    '',
    NULL::timestamp
);

INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
)
values(
    '66efe21d-7bf8-4425-915b-8000a7b10841',
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'testing',
    crypt('qwer1234', gen_salt('bf')),
    now(),
    NULL::timestamp,
    '',
    NULL::timestamp,
    '',
    NULL::timestamp,
    '',
    '',
    NULL::timestamp,
    now()::timestamp,
    '{"provider":"email","providers":["email"], "team": 1}'::jsonb,
    '{}'::jsonb,
    0::boolean,
    '2022-10-04 03:41:27.391146+00'::timestamp,
    '2022-10-04 03:41:27.391146+00'::timestamp,
    NULL,
    NULL::timestamp,
    '',
    '',
    NULL::timestamp,
    '',
    0,
    NULL::timestamp,
    '',
    NULL::timestamp
);
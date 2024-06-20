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

insert into game_round(team_id, game_id, place)
values
(1,1,4),
(2,1,2),
(3,1,1),
(4,1,3),
(1,2,1),
(2,2,2),
(3,2,3),
(4,2,4);


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
    '{"provider":"email","providers":["email"]}'::jsonb,
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
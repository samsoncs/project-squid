-- Clean up
delete from auth.users;
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
(1, 'Human Mario Kart', true),
(2, 'The Name of the Game', true),
(3, 'Electrobubble Trouble', true),
(4, 'Shock and score', true), -- Penalties
(5, 'Water or vodka', true),
(6, 'Shocking Truth', true), -- Quiz
(7, 'Squid Grid', false),
(8, 'Battle Squid', false),
(9, 'Rock, Paper, Squidsor', false),
(10, 'SquidFlix', false),
(11, 'Wiener Schwung!', false),
(12, 'The Secret Frontman ', false);

insert into starting_tokens(token_type)
values
('REVERSE'),
('REVERSE'),
('DOUBLE_TROUBLE'),
('DOUBLE_TROUBLE'),
('DOUBLE_TROUBLE'),
('DOUBLE_TROUBLE');


CREATE OR REPLACE FUNCTION create_user(user_id uuid, user_name varchar(50), pwd varchar(20), team_id integer) 
RETURNS void
AS
$$
BEGIN
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
        user_id,
        '00000000-0000-0000-0000-000000000000'::uuid,
        'authenticated',
        'authenticated',
        user_name,
        crypt(pwd, gen_salt('bf')),
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
        --format('{"provider":"email","providers":["email"], "team": %s}', team_id)::jsonb,
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
END;
$$
LANGUAGE plpgsql;

do $$
begin
    PERFORM create_user('66efe21d-7bf8-4425-915b-8000a7b10840', 'samson', 's4msp4ssord', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'morten', 'm0rty', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'mikkel', 'm!kkel', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'markus', 'm4rkym4rk', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'simen', 'semen', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'malte', 'm4lt3', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'eivind_k', '3!vind', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'anders', '4nd3rs', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'henrik', 'h3nrik!', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'martin', 'm4rtin?', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'ole', 'ol3ol3', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'anders_mk', '4ndymk', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'aksel', '4ks3!', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'haakon', 'haak0n', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'jon', 'j0nny', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'eirik', '3!r!k', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'stian', 'st!4n!', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'eivind_dt', 'e!vind?', 1);
    PERFORM create_user(UUID_GENERATE_V4(), 'niklas', 'n!klas', 1);
end$$;

DROP FUNCTION create_user;
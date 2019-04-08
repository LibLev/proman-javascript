alter table if exists only public.boards drop constraint if exists pk_boards_id cascade;
alter table if exists only public.cards drop constraint if exists pk_cards_id cascade;
alter table if exists only public.statuses drop constraint if exists pk_statuses_id cascade;
alter table if exists only public.cards drop constraint if exists fk_boards_id cascade;




drop table if exists public.boards;
create table boards(
  id serial not null,
  title varchar
);

drop table if exists public.cards;
create table cards
(
  id       serial not null,
  board_id serial not null,
  title    varchar,
  status_id serial not null,
  "order" integer
);


drop table if exists public.statuses;
create table statuses(
  id serial not null,
  title varchar
);


alter table only boards
  add constraint pk_boards_id primary key (id);
alter table only cards
  add constraint pk_cards_id primary key (id);
alter table only statuses
  add constraint pk_statuses_id primary key (id);

alter table only cards
  add constraint fk_boards_id foreign key(board_id) references boards(id) on delete cascade;

insert into boards values (1, 'board1');
insert into boards values (2, 'board2');
select pg_catalog.setval('board_id_seq', 2, true);

insert into cards values (1,1,'new card 1',0,0);
insert into cards values (2,1,'new card 2',0,1);
insert into cards values (3,1,'in progress card',1,0);
insert into cards values (4,1,'planning',2,0);
insert into cards values (5,1,'done card 1',3,0);
insert into cards values (6,1,'done card 1',3,1);
insert into cards values (7,2,'new card 1',0,0);
insert into cards values (8,2,'new card 2',0,1);
insert into cards values (9,2,'in progress card',1,0);
insert into cards values (10,2,'planning',2,0);
insert into cards values (11,2,'done card 1',3,0);
insert into cards values (12,2,'done card 1',3,1);
select pg_catalog.setval('cards_id_seq', 12, true);

insert into statuses values (0, 'new');
insert into statuses values (1, 'in progress');
insert into statuses values (2, 'testing');
insert into statuses values (3, 'done');
select pg_catalog.setval('statuses_id_seq', 3, true);

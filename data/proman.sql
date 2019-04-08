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

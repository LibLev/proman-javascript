import connection


@connection.connection_handler
def insert_new_statuses(cursor):
    cursor.execute('''
    insert into statuses(title)
    values ('new');
    insert into statuses(title)
    values ('in progress');
    insert into statuses(title)
    values ('testing');
    insert into statuses(title)
    values ('done')''')


@connection.connection_handler
def connect_board_with_statuses(cursor, board_id):
    pass

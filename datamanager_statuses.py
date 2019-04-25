import connection


@connection.connection_handler
def insert_new_statuses(cursor, board_id, status):
        cursor.execute('''
            INSERT INTO statuses(title)
            VALUES (%(status)s);
            SELECT currval('statuses_id_seq') as stat_id;
             ''', {'status': status})
        status_id = cursor.fetchone()
        cursor.execute('''
            INSERT INTO board_statuses(board_id, status_id)
            values (%(board_id)s, %(status_id)s)
            ''', {'board_id': board_id, 'status_id': status_id['stat_id']})

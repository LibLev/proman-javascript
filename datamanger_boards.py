import connection

@connection.connection_handler
def get_boards(cursor):
    cursor.execute("""
    select * from boards
    """)
    result = cursor.fetchall()
    return result

@connection.connection_handler
def store_board(cursor, b_id, b_title):
    cursor.execute("""
    insert into boards
    values (%(b_id)s,%(b_title)s)
    """,
                   {'b_id': b_id, 'b_title': b_title})

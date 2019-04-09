import connection

@connection.connection_handler
def get_boards(cursor):
    cursor.execute("""
    select * from boards
    """)
    result = cursor.fetchall()
    return result
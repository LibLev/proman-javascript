import connection

@connection.connection_handler
def get_card_status(cursor, statusid):
    cursor.execute("""
    select status_id 
    from cards
    where status_id=%(statusid)s""",
        {'statusid' : statusid})
    result = cursor.fetchone()
    if result == None:
        result = {'statusid':None}
    return result

import connection


@connection.connection_handler
def get_cards_for_board(cursor):
    cursor.execute("""
    select * from cards
    """,)
    result = cursor.fetchall()
    return result

    """
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards"""

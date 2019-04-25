from flask import Flask, render_template, url_for, request
from util import json_response
import json

import datamanger_boards
import datamanager_cards
import datamanager_statuses


app = Flask(__name__)



@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return datamanger_boards.get_boards()


@app.route('/store-board', methods=['POST'])
@json_response
def store_board():
    data = request.get_data(parse_form_data='data')
    json_data = json.loads(data)
    board_id = json_data['board_id']
    board_title = json_data['board_title']
    print(board_title, board_id)
    return datamanger_boards.store_board(b_id=board_id, b_title=board_title)


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return datamanager_cards.get_cards_for_board(b_id=board_id)


@app.route("/update-board-name/<board_id>/<board_name>", methods=['POST'])
@json_response
def update_board_name(board_id, board_name):
    return datamanger_boards.update_board_title(b_id=board_id, b_title=board_name)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()


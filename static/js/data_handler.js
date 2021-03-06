// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response))  // Call the `callback` with the returned object
        //.catch(???);
    },
    _api_post: function (url, data, callback) {
        console.log(url);
        console.log(JSON.stringify(data));
        return fetch(url, {
            credentials: 'same-origin', // 'include', default: 'omit'
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
    },
    init: function (callback) {

    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards
        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            for(let data of this._data){
            }
            callback(response);
        });
    },
    saveBoardName: function(boardID,newName){
        this._api_post("/update-board-name/"+boardID+"/"+newName+"",{board_id:boardID, board_name:newName});
            callback({board_id:boardID, board_name:newName})
    },
    getBoard: function (boardId, callback) {
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        fetch('/api/statuses')
            .then((response) => response.json())
            .then( function (statuses) {
                callback(statuses);})
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status

    },
    getCards: function(callback){
        fetch('/api/cards')
            .then((response) => response.json())
            .then(function (cards) {
                callback(cards);
            })
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        let idNumber = boardTitle.split(' ')[1];
        this._api_post("/store-board", {board_id: idNumber, board_title: boardTitle});
        callback({id: idNumber, title: boardTitle});

    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    }
    // here comes more features

};

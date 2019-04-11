// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, childNode, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        elementToExtend.appendChild(childNode);
        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
        let addBoardButton = document.getElementById('create-board');
        const that = this;
        addBoardButton.addEventListener('click', function (event) {
            let boards = document.getElementById('boards');
            let lastNumber = boards.childElementCount;
            dataHandler.createNewBoard('Board ' + (lastNumber + 1), board => that.showBoards([board]));

        })
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        const creatBoard = function (title, id, callback) {
            const template = document.querySelector('#board-template');
            const clone = document.importNode(template.content, true);
            const boardTitles = clone.querySelector('.board-title');
            boardTitles.addEventListener('dblclick', function (event) {
                let textfield = document.createElement("INPUT");
                boardTitles.replaceWith(textfield);
                let boardID = boardTitles.id;
                textfield.addEventListener('keyup',function (event) {
                  if(event.keyCode===13){
                      let value = textfield.value;
                      let newtag = document.createElement("span");
                      newtag.setAttribute('calss', 'board-title');
                      newtag.setAttribute('id', boardID);
                      console.log(newtag);
                      newtag.textContent=value;
                      textfield.replaceWith(newtag);
                      dataHandler.saveBoardName(boardID,value)
                  }
                })
            });

            clone.querySelector('.board-title').textContent = title;
            clone.querySelector('span').id = id;
            let columns = clone.querySelectorAll('.board-column-title');
            for (let [i, column] of columns.entries()) {
                column.addEventListener('dblclick', function () {
                    column.replaceWith(document.createElement("INPUT"));
                    console.log("yeah")
                })
            }
            callback(clone)

        };
        const dom = this;
        for (let board of boards) {
            creatBoard(board.title, board.id, function (element) {
                dom._appendToElement(document.querySelector('#boards'), element);
            });
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    addBoard: function (callback) {


    },
    renameBoard: function (callback) {
    }
};

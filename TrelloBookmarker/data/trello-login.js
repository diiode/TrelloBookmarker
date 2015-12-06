var bookmarkUrl, bookmarkTitle;
var boardLabels = [];

function checkAuth() {
    Trello.authorize({
        expiration: "never",
        interactive: false,
        persist: false,
        error: function () {
            return auth();
        },
        success: function () {
            return init();
        }
    });
};

function auth() {
    Trello.authorize({
        name: "TrelloBookmarker",
        type: "popup",
        expiration: "never",
        persist: false,
        scope: {
            read: true,
            write: true,
            account: true
        },
        error: function () {
            console.log("Trello authorize error");
        },
        success: function () {
            return init();
        }
    });
};

function init() {
    $("#login").hide();
    $("#bookmark").show();

    Trello.get("members/me", { boards: "open" }, function (data) {
        var boardSelect, board;
        boardSelect = $("#boardSelect");
        for (i = 0; i < data.boards.length; i++) {
            board = data.boards[i];
            boardSelect.append('<option value="' + board.id + '">' + board.name + '</option>');
        }
    });
    
    $("#boardSelect").change(function () {
        if ($("#boardSelect").val()) {
            var boardId = $("#boardSelect").val();
            // Clear select list on change before adding new items.
            $("#listSelect")
            .empty()
            .append('<option>Select...</option>');
            
            Trello.get("boards/" + boardId + "/lists", function (data) {
                for (i = 0; i < data.length; i++) {
                    list = data[i];
                    $("#listSelect").append('<option value="' + list.id + '">' + list.name + '</option>');
                }
            });
            
            Trello.get("boards/" + boardId + "/labels", function (data) {
                boardLabels = [];
                for (i = 0; i < data.length; i++) {
                    label = data[i];
                    boardLabels.push(
                        {
                            id: label.id,
                            text: label.name
                        });
                }
                $("#labelPicker").select2({
                    multiple: true,
                    placeholder: "Please enter tags",
                    data: boardLabels
                });
            });
        } else {
        }
        
    });

    $("#newBookmarkButton").click(function () {

        var name = $("#bookmarkName").val();
        var url = $("#bookmarkUrl").val();
        var listId = $("#listSelect").val();
        var labels_raw = $("#labelPicker").val();
        var labels = labels_raw.split(',');

        console.log("Selected labels: ");
        

        console.log(labels);

        var card = createNewCard(name, url, listId, labels);

        Trello.post("cards/", card, function (data) {
            $("#successMessage").show();
        }, function (data) {
            console.log("Error on post: ");
            console.log(data);
        });
        
        return false;
    });

    
};





function createNewCard(name, url, listId, labelIds) {
    return {
        name: name,
        desc: '<' + url + '>',
        pos: "bottom",
        due: null,
        idList: listId,
        idLabels: labelIds,
        urlSource: null
    };
    //return newCard;
}





self.port.on("tabUrlMessage", function tabUrlMessageAction(data) {
    bookmarkUrl = data;
    $("#bookmarkUrl").val(bookmarkUrl);
});

self.port.on("tabTitleMessage", function tabTitleMessageAction(data) {
    bookmarkTitle = data;
    $("#bookmarkName").val(bookmarkTitle);
});

$(function () {
    $("#loginButton").click(function () {
        checkAuth();
    });  
});

$("#testLabelPicker").select2({
    multiple: true,
    placeholder: "Please enter tags",
    data: ["foo", "bar"]
});
var bookmarkUrl, bookmarkTitle;

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
            console.log("In auth() { error } ");
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

    
};

$("#boardSelect").change(function () {
    if ($("#boardSelect").val()) {
        var boardId = $("#boardSelect").val();
        Trello.get("boards/" + boardId + "/lists", function (data) {
            for (i = 0; i < data.length; i++) {
                list = data[i];
                $("#listSelect").append('<option value="' + list.id + '">' + list.name + '</option>');
            }
        });
    } else {
    }
        
})


$(function() {
    $("#loginButton").click(function () {
        checkAuth();
    });
});


self.port.on("tabUrlMessage", function tabUrlMessageAction(data) {
    console.log("Got url from tab: " + data);
    bookmarkUrl = data;
    $("bookmarkUrl").val(bookmarkUrl);
});

self.port.on("tabTitleMessage", function tabTitleMessageAction(data) {
    console.log("Got title from tab: " + data);
    bookmarkTitle = data;
    $("bookmarkName").val(bookmarkTitle);
})
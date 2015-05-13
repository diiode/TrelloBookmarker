function checkAuth() {
    console.log("In checkAuth()");
    console.log(window.location);
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
    console.log("In auth()");
    console.log(window.location);
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
    console.log("In init()");

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
            Trello.get("boards/" + boardId + "/lists", function (data) {
                console.log(data);
                for (i   = 0; i < data.length; i++) {
                    list = data[i];
                    $("#listSelect").append('<option value="' + list.id + '">' + list.name + '</option>');
                }
            });
        } else {
            console.log("Selected 'Select...'");
        }
        
    })
};


$(function() {
    $("#loginButton").click(function () {
        checkAuth();
    });
});



//(function () {
//    var auth, checkAuth, init

//    checkAuth = function () {

//        console.log("In checkAuth()");
//        Trello.authorize({
//            interactive: false,
//            persist: false,
//            error: function () {
//                return auth();
//            },
//            success: function () {
//                return init();
//            }
//        });
//    };

//    auth = function () {
//        console.log("In auth()");
//        Trello.authorize( {
//            name: "TrelloBookmarker",
//            type: "redirect",
//            persist: false,
//            scope: {
//                read: true,
//                write: true,
//                account: true
//            },
//            expiration: "never",
//            error: function () {
//                console.log("In auth() { error } ");
//            },
//            success: function () {
//                return init();
//            }
//        });
//    };

//    init = function () {
//        console.log("In init()");
//    };

//    $(checkAuth);

//}).call(this);;
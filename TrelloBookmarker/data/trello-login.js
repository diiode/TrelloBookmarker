var bookmarkUrl, bookmarkTitle;
var boardLabels = [];

function checkAuth(isInit) {
    Trello.authorize({
        expiration: "never",
        interactive: false,
        persist: true,
        error: function () {
            if (isInit) {
                return auth();
            } else {

            }
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
        persist: true,
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
            
            fillLabelList(boardId);
            
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
        if (labels[0] == "") {
            labels = [];
        }
        
        var card = createNewCard(name, url, listId, labels);
        console.log(card);

        Trello.post("cards/", card, function (data) {
            showNotificationAlert("Successfully added card");
            
        }, function (data) {
            console.log("Error on post: ");
            console.log(data);
            showNotificationAlert("Could not add new card");
        });
        
        return false;
    });
    
    $("#newLabelButton").click(function () {
        var boardId = $("#boardSelect").val();
        
        var newColor = $("#colorSelect").val();
        var newLabelName = $("#newLabelTextbox").val();
        console.log(newColor);
        console.log(newLabelName);
        
        var newLabel = {
            name: newLabelName,
            color: newColor
        };
        
        Trello.post("boards/" + boardId + "/labels", newLabel, function (data) {
            // Success
            showNotificationAlert("Successfully added new label");
            console.log("Successfully added new label");
            
            $("#newLabelTextbox").val('');
            $("#colorSelect").val($("#colorSelect").prop("defaultSelected"));
            fillLabelList(boardId);

            //TODO Clear selection
        }, function (data) {
            // Error
            console.log("Could not add the new label");

            console.log(data);
            showNotificationAlert("Could not add the new label", true);
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

function formatState(state) {
    var $state = $(
        '<span><span class="color-label" style="background-color: ' + state.color + '"></span><span class="text-label">' + state.text + '</span></span>'
    );
    return $state;
}

function fillLabelList(boardId) {
    Trello.get("boards/" + boardId + "/labels", function (data) {
        boardLabels = [];
        for (i = 0; i < data.length; i++) {
            label = data[i];
            boardLabels.push(
                {
                    id: label.id,
                    text: label.name,
                    color: label.color
                });
        }
        boardLabels.sort(function (a, b) {
            return ((a.text < b.text) ? -1 : (a.text > b.text) ? 1 : 0);
        });
        $("#labelPicker").select2({
            multiple: true,
            placeholder: "Please enter tags",
            data: boardLabels, 
            formatResult: formatState,
            formatSelection: formatState,
            escapeMarkup: function (m) { return m; }
        });
    });
}

function showNotificationAlert(text, isError) {
    isError = isError || false;
    var alertClass = "alert " + (isError ? "error-alert" : "success-alert");
    $("#successMessage").attr("class", alertClass);
    $("#textSuccessMessage").text(text);
    $("#successMessage").show();
    $("#successMessage").fadeOut(3000);
}


// Debug
//$(function () {
//    var boardLabels = [{ id: 0, text: "foo", color: "green" }, 
//        { id: 1, text: "bar", color: "yellow" }, 
//        { id: 2, text: "baz", color: "green" },
//        { id: 3, text: "C#", color: null },
//        { id: 4, text: "C++", color: null },
//        { id: 5, text: "C", color: null },
//        { id: 6, text: "Haskell", color: null },
//        { id: 7, text: "Electronics", color: "green" },
//        { id: 8, text: "Art", color: "blue" },
//        { id: 9, text: "Pro", color: "purple" }]
//    boardLabels.sort(function (a, b) {
//        return ((a.text < b.text) ? -1 : (a.text > b.text) ? 1 : 0);
//    })
    
//    $("#labelPicker").select2({
//        multiple: true,
//        placeholder: "Please enter tags",
//        data: boardLabels, 
//        formatResult: formatState,
//        formatSelection: formatState,
//        escapeMarkup: function (m) { return m; }
//    });
//});

$(function () {
    $("#loginButton").click(function () {
        checkAuth(true);
    });
    
    checkAuth(false);
});


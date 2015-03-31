(function () {
    var auth, checkAuth, init
    
    checkAuth = function () {
        return Trello.authorize({
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

    auth = function () {
        return Trello.authorize( {
            name: "TrelloBookmarker",
            persist: true,
            scope: {
                read: true,
                write: true,
                account: true
            },
            expiration: "never",
            success: function () {
                return init();
            }
        });
    };

    init = function () {
    };

    $(checkAuth);

}).call(this);;
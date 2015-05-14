var buttons = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var trelloButton = buttons.ToggleButton({
    id: "trelloButton",
    label: "Add bookmark",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    width: 600,
    height: 450,
    contentURL: "./trello-login.html",
    contentScriptFile: ["./jquery-1.7.1.min.js", "./trello-client.js","./trello-login.js"],
    onHide: handleHide
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: trelloButton
        });
        // Communicate Url
        var tabUrl = tabs.activeTab.url;
        console.log(tabUrl);
        panel.port.emit("tabUrlMessage", tabUrl);

        // Communicate title
        var pageTitle = tabs.activeTab.title;
        console.log(pageTitle);
        panel.port.emit("tabTitleMessage", pageTitle);

    }
}

function handleHide(state) {
    trelloButton.state('window', { checked: false });
}
var buttons = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
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
    contentURL: self.data.url("trello-login.html"),
    onHide: handleHide
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: trelloButton
        });
    }
}

function handleHide(state) {
    button.state('window', { checked: false });
}
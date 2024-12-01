const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;
const Util = imports.misc.util;
const Gio = imports.gi.Gio;

let scrollerText, timeout;
let currentIndex = 0;
let config = {
    textColor: '#ffffff',
    timeout: 60,
    offlineEmoji: '❗️'
};

function init() {
    scrollerText = new St.Label({
        text: '',
        style_class: 'scroller-text',
        y_align: St.Align.MIDDLE,
        reactive: true
    });
    scrollerText.connect('button-press-event', () => {
        openChromeApp();
    });
}

function enable() {
    Main.panel._leftBox.insert_child_at_index(scrollerText, 0);
    loadConfig();
    updateScroller();
}

function disable() {
    if (timeout) {
        Mainloop.source_remove(timeout);
    }
    Main.panel._leftBox.remove_child(scrollerText);
}

function openChromeApp() {
    const appId = 'hbblfifohofgngfbjbiimbbcimepbdcb'; // Replace with the actual Chrome app ID
    Util.spawn(['google-chrome', '--app-id=' + appId]);
}

function loadConfig() {
    const configPath = GLib.get_home_dir() + '/automations/config.json';
    
    try {
        let [success, contents] = GLib.file_get_contents(configPath);
        if (success) {
            config = JSON.parse(contents);
        }
    } catch (e) {
        log('Failed to read config file: ' + e);
    }
    
    applyConfig();
}

function applyConfig() {
    scrollerText.set_style('color: ' + config.textColor);
}

function updateScroller() {
    const filePath = GLib.get_home_dir() + '/automations/prompts.txt';
    let strings = [];

    // Read strings from the file
    try {
        let [success, contents] = GLib.file_get_contents(filePath);
        if (success) {
            strings = contents.toString().split('\n').filter(line => line.trim());
        }
    } catch (e) {
        log('Failed to read prompts file: ' + e);
        strings = [config.offlineEmoji + " Failed to load prompts."]; // Default message if read fails
    }

    function updateText() {
        if (strings.length > 0) {
            let text = strings[currentIndex];
            if (!Gio.NetworkMonitor.get_default().get_network_available()) {
                text = config.offlineEmoji + " " + text;
            }
            scrollerText.set_text(text);
            currentIndex = (currentIndex + 1) % strings.length;
        }
    }

    updateText();
    timeout = Mainloop.timeout_add_seconds(config.timeout, () => {
        updateText();
        return true; // Run indefinitely
    });
}

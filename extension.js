const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;
const Util = imports.misc.util;

let scrollerText, timeout;
let currentStringIndex = 0;
let currentCharIndex = 0;

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
        strings = ["Failed to load prompts."]; // Default message if read fails
    }

    let currentIndex = 0;

    function updateText() {
        if (strings.length > 0) {
            scrollerText.set_text(strings[currentIndex]);
            currentIndex = (currentIndex + 1) % strings.length;
        }
    }

    updateText();

    timeout = Mainloop.timeout_add_seconds(60, () => {
        updateText();
        return true; // Run indefinitely
    });
}


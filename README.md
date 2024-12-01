# GNOME Shell Extension: Top Bar Scroller

- **UUID**: top-bar-scroller@wmv.cx
- **Description**: Displays reminders in the top bar based on a list of strings
- **Shell Versions**: 3.36, 3.38, 40, 41, 42
- **Version**: 1

---

## 📖 Overview  

The **Daily Customization GNOME Extension** is a lightweight tool that adds a rotating text to your GNOME panel. It's designed to display daily prompts, affirmations, or reminders, and adapts its style and behavior based on a simple, user-hosted JSON configuration. 

---

## ✨ Features  

- **Rotating Prompts:** Dynamically display rotating text-based reminders from a local `prompts.txt` file.
- **JSON-Based Config:** Fully-customizable via a JSON file hosted on a local or remote server. Adjust:
  - **Colors** of displayed text.
  - **Rotation Interval** for how often messages update.
- **Interactive:** Clicking the text scroller can open external apps, scripts or be customized for other actions.
- **Lightweight and Minimal:** Designed to blend seamlessly into your GNOME environment without clutter.  

---

## 🧰 Installation  

1. Clone this repository:  
   ```bash
   git clone git@github.com:wmv/gnome-top-bar-scroller.git
   cd daily-customization-gnome-extension
   ```

2. Create a directory to store the extension:  
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/top-bar-scroller@wmv
   ```

3. Copy the contents of the downloaded repository into the extension directory:  
   ```bash
   cp -r * ~/.local/share/gnome-shell/extensions/top-bar-scroller@wmv
   ```

4. Enable the extension using GNOME Tweaks or by running:  
   ```bash
   gnome-extensions enable top-bar-scroller@wmv
   ```

5. Restart GNOME Shell (press `Alt + F2`, type `r`, and hit Enter).  

---

## 🔧 Configuration  

### 1. **Prompts (`prompts.txt`)**  
Store your rotating prompts in a simple text file:  
- File Path: `~/automations/prompts.txt`  
- Format: Each line represents a new prompt.

Example `prompts.txt`:  
```
Take a walk and stretch.
Drink water. You're not a cactus.
Focus on one thing at a time.
```

### 2. **Config (`config.json`)**  
Define your extension settings in a JSON file.  
- File Path: `~/automations/config.json`  

Example `config.json`:  
```json
{
    "textColor": "#0fbaba",
    "timeout": 30,
    "offlineEmoji": "❌"
}
```

## 📜 Extension Behavior  

1. **Dynamic Prompt Updates**  
   The extension reads lines from your `prompts.txt` file and cycles through them at the interval defined in `config.json`.  

2. **Customization via Config**  
   - The text color is applied dynamically using `config.textColor`.  
   - The rotation interval (`config.timeout`) determines how often prompts change.

3. **Offline Handling**  
   - The extension will detect if it's unable to read the `config.json` file (e.g., due to network issues).  
   - In offline mode, prompts are prefixed with an emoji, such as ❗️, to let you know something needs attention.

---

### Dependencies  
- **GNOME Shell**: Tested on GNOME 40+.  
- **GLib and Gio APIs**: For file handling and network monitoring.

### Key Logic Highlights  
- Reads local files (`prompts.txt` and `config.json`) using GLib.
- Handles network availability using the **Gio.NetworkMonitor** API.
- Updates the GNOME panel dynamically with the **Mainloop.timeout_add_seconds** function.

Feel free to modify the extension to suit your own needs. Contributions are more than welcome! ❤️  

---

## 🙌 Contributing  

Contributions are welcome! If you’d like to enhance the extension, submit a pull request or open an issue to discuss your ideas.  

---

## 📝 License  

This project is licensed under the MIT License. See `LICENSE` for details.  

---

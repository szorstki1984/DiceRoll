# GitHub Copilot Instructions – Chrome Extension Development

## Purpose

This file defines rules for GitHub Copilot when generating code for this project.
The project is a Google Chrome Extension and must follow modern best practices.

---

# 1. General Rules

- Always generate code compatible with **Chrome Extension Manifest V3**.
- Use **modern JavaScript (ES6+)**.
- Prefer **clean, readable and modular code**.
- Avoid unnecessary dependencies.
- Keep logic separated between extension components.
- KBuild as a side panel extention

Preferred syntax:

- `const` instead of `var`
- `let` instead of `var`
- arrow functions
- async/await instead of callbacks

Example:

```javascript
const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tabs[0];
};
```

---

# 2. Project Structure

Copilot should assume the following structure:

```
/extension
 ├ manifest.json
 ├ background.js
 ├ content.js
 ├ popup/
 │   ├ popup.html
 │   ├ popup.js
 │   └ popup.css
 ├ options/
 │   ├ options.html
 │   └ options.js
 └ icons/
```

Each major feature should be placed in a separate file.

---

# 3. Manifest Rules

Manifest must always follow **Manifest Version 3**.

Example structure:

```json
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0",
  "description": "Chrome extension description",
  "permissions": [],
  "action": {
    "default_popup": "popup/popup.html"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

Rules:

- Avoid unnecessary permissions
- Use `service_worker` for background scripts
- Keep manifest minimal and secure

---

# 4. Background Script

The background script should handle:

- extension lifecycle events
- central logic
- message routing
- tab management

Example:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
```

---

# 5. Content Scripts

Content scripts should:

- interact with the page DOM
- collect data from the page
- send data to the background script

They should NOT contain complex business logic.

Example:

```javascript
const pageTitle = document.title;

chrome.runtime.sendMessage({
  type: "PAGE_TITLE",
  title: pageTitle,
});
```

---

# 6. Popup UI

Popup should remain lightweight.

Responsibilities:

- user interface
- triggering extension actions
- sending messages to background

Example:

```javascript
document.querySelector("#runButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "RUN_ACTION",
  });
});
```

---

# 7. Messaging System

Communication between extension components must use the Chrome messaging API.

Allowed methods:

```
chrome.runtime.sendMessage
chrome.runtime.onMessage.addListener
```

Example:

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_DATA") {
    sendResponse({ status: "ok" });
  }
});
```

---

# 8. Security Rules

Generated code must follow security best practices.

Avoid:

- `eval()`
- dynamic script execution
- unsafe `innerHTML`

Prefer:

- `textContent`
- strict message validation
- minimal permissions in manifest

Example:

```javascript
element.textContent = userInput;
```

---

# 9. Error Handling

All async code must include error handling.

Example:

```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error("[Extension Error]", error);
}
```

---

# 10. Logging and Debugging

Logs should use a clear prefix:

```javascript
console.log("[Chrome Extension]", message);
```

Debugging logs should be easy to disable or remove later.

---

# 11. Code Quality

Copilot should aim to generate:

- modular functions
- clear variable names
- short and maintainable functions
- comments only when helpful

Example:

```javascript
const sendMessageToBackground = (payload) => {
  return chrome.runtime.sendMessage(payload);
};
```

---

# 12. Performance Guidelines

Copilot should avoid:

- unnecessary DOM queries
- heavy scripts in popup
- blocking operations

Prefer:

- caching selectors
- async operations
- event-driven logic

---

# 13. Styling

Popup and options UI should:

- use simple CSS
- avoid heavy frameworks
- remain fast and minimal

---

# Final Rule

All generated code must be compatible with:

- Chrome Extension API
- Manifest V3
- modern browsers

Code should prioritize **security, performance and readability**.

# AI Chatbot

A simple browser-based AI chatbot built with HTML, CSS, and JavaScript. The app uses Google's Gemini API to generate responses and supports optional image uploads alongside text prompts.

## Features

- Text chat with Gemini
- Optional image upload with prompt
- Minimal single-page UI
- Runs as a static front-end project

## Project Files

- `index.html` - UI layout and styles
- `script.js` - Chat logic, API request handling, and image upload support

## How It Works

1. The user types a message in the input box.
2. The message is sent to the Gemini `generateContent` endpoint.
3. The API response is shown in the chat area.
4. If an image is selected, it is converted to Base64 and included in the request.

## Setup

1. Open `script.js`.
2. Set your Gemini API key in the `API_URL` value.
3. Open `index.html` in a browser or run the project through a local server.

Example:

```js
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY_HERE";
```

## Notes

- Keep your API key private.
- If the API does not respond, check the key, model access, and browser/network restrictions.
- For best results, use a local server instead of opening the HTML file directly.

## Usage

- Type a message and click **Send**.
- Press **Enter** to send a message.
- Click the image button to upload a picture before sending.

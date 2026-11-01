# WhatsApp Translator Bot 🌍

A personal WhatsApp bot that automatically translates incoming messages and helps you reply in any language.

## Features

✅ **Auto-translate incoming messages** - Receives messages in any language, shows you English translation  
✅ **Language detection** - Automatically detects the sender's language  
✅ **Manual translation** - Use commands to translate any text  
✅ **Multi-language support** - Supports all major languages  
✅ **Session persistence** - Stays logged in between restarts  
✅ **Per-chat language memory** - Remembers each contact's language  

## How It Works

1. **You receive a message in Chinese** → Bot shows you the English translation
2. **You type your reply in English** → (Optional) Bot can translate it back to Chinese
3. **Bot remembers** → Next time, it knows to translate between English ↔ Chinese for that contact

## Installation

```bash
# Install dependencies (already done if you're reading this!)
npm install

# Start the bot
npm start
```

## First Time Setup

1. Run `npm start`
2. A QR code will appear in your terminal
3. Open WhatsApp on your phone
4. Go to **Settings → Linked Devices → Link a Device**
5. Scan the QR code
6. ✅ Bot is now connected!

## Usage

### Automatic Translation
Just receive messages normally! The bot will:
- Detect the language automatically
- Show you the translation in the terminal
- Remember each contact's language

### Commands (send these in WhatsApp)

- `!translate <text>` - Translate any text
  ```
  !translate Hello, how are you?
  ```

- `!lang <code>` - Set preferred language for a chat
  ```
  !lang zh-CN  (Chinese)
  !lang fr     (French)
  !lang es     (Spanish)
  !lang ar     (Arabic)
  ```

- `!help` - Show available commands

### Common Language Codes

| Language | Code |
|----------|------|
| English | en |
| Chinese (Simplified) | zh-CN |
| Chinese (Traditional) | zh-TW |
| Spanish | es |
| French | fr |
| German | de |
| Arabic | ar |
| Japanese | ja |
| Korean | ko |
| Russian | ru |
| Portuguese | pt |
| Italian | it |
| Hindi | hi |

## Configuration

Edit the `CONFIG` object in `bot.js`:

```javascript
const CONFIG = {
  targetLanguage: 'en',     // Your preferred language
  autoTranslate: true,      // Auto-translate incoming messages
  showOriginal: true,       // Show original before translation
  replyInOriginal: true     // Translate replies back (coming soon)
};
```

## What You'll See

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📨 Message from: John
Original: 你好，今天怎么样？
🌍 Detected: zh-CN → en
📝 Translation: Hello, how are you today?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Next Steps (Coming Soon)

🔜 **AI Reply Suggestions** - Get smart reply suggestions based on context  
🔜 **Auto-reply translation** - Your replies automatically translate to sender's language  
🔜 **Group chat support** - Use in group chats  
🔜 **Web dashboard** - See all translations in a nice UI  
🔜 **Multi-platform** - Telegram, Instagram, etc.  

## Troubleshooting

**QR Code doesn't appear?**
- Make sure you're in the correct directory
- Try running `npm start` again

**Bot disconnects?**
- WhatsApp Web sessions can expire
- Just run `npm start` again and rescan the QR code

**Translation not working?**
- Check your internet connection
- The free translation API has rate limits
- If it persists, we can switch to a paid API

**"Session closed" error?**
- Delete the `.wwebjs_auth` folder
- Run `npm start` and scan QR again

## Privacy & Security

⚠️ **Important Notes:**
- This bot runs locally on your computer
- Your WhatsApp session data is stored in `.wwebjs_auth/` folder
- Translations use Google Translate (unofficial API)
- Keep your `.wwebjs_auth/` folder private (it's like your password!)
- Using unofficial WhatsApp APIs is against WhatsApp ToS
- Use for personal purposes only

## Tech Stack

- **whatsapp-web.js** - WhatsApp Web automation
- **Google Translate API** - Translation (unofficial, free)
- **Node.js** - Runtime
- **qrcode-terminal** - QR code display

---

Made for personal use 🚀 Happy translating!

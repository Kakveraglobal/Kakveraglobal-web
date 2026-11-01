# 🚀 Quick Start Guide

## Step 1: Navigate to the bot folder
```bash
cd whatsapp-translator
```

## Step 2: Start the bot
```bash
npm start
```

## Step 3: Scan the QR code
1. A QR code will appear in your terminal
2. Open WhatsApp on your phone
3. Go to: **Settings** → **Linked Devices** → **Link a Device**
4. Scan the QR code from your terminal
5. Wait for "✅ WhatsApp Translator Bot is ready!"

## Step 4: Test it!
1. Have someone send you a message in another language (Chinese, French, Spanish, etc.)
2. Check your terminal - you'll see the translation!
3. Try sending `!help` in WhatsApp to see available commands

## Commands You Can Use

Send these commands directly in WhatsApp:

- `!translate Hello, how are you?` - Translate any text
- `!lang zh-CN` - Set language to Chinese
- `!help` - Show help message

## Example Output in Terminal

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📨 Message from: Maria
Original: Hola, ¿cómo estás?
🌍 Detected: es → en
📝 Translation: Hello, how are you?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Stopping the Bot

Press `Ctrl + C` to stop the bot gracefully.

## Next Session

The bot remembers your login! Next time just run:
```bash
cd whatsapp-translator
npm start
```

No need to scan QR code again (unless session expires).

---

Need help? Check the README.md for full documentation!

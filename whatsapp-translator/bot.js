const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const translate = require('@vitalets/google-translate-api');
require('dotenv').config();

// Configuration
const CONFIG = {
  targetLanguage: 'en', // Language you want to receive messages in
  autoTranslate: true,   // Automatically translate incoming messages
  showOriginal: true,    // Show original message before translation
  replyInOriginal: true  // Translate your replies back to sender's language
};

// Store detected languages for each chat
const chatLanguages = new Map();

// Initialize WhatsApp client with session persistence
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Event: QR Code generation
client.on('qr', (qr) => {
  console.log('\n📱 WhatsApp Translator Bot Starting...\n');
  console.log('Scan this QR code with your WhatsApp mobile app:\n');
  qrcode.generate(qr, { small: true });
  console.log('\nWaiting for authentication...\n');
});

// Event: Client ready
client.on('ready', () => {
  console.log('✅ WhatsApp Translator Bot is ready!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Features enabled:');
  console.log(`  📥 Auto-translate incoming: ${CONFIG.autoTranslate ? 'Yes' : 'No'}`);
  console.log(`  📤 Auto-translate replies: ${CONFIG.replyInOriginal ? 'Yes' : 'No'}`);
  console.log(`  🌍 Target language: ${CONFIG.targetLanguage}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('💡 Commands you can use:');
  console.log('  !translate <text> - Translate any text');
  console.log('  !lang <code> - Set your preferred language (e.g., !lang zh-CN)');
  console.log('  !help - Show help message\n');
});

// Event: Authentication success
client.on('authenticated', () => {
  console.log('🔐 Authenticated successfully!');
});

// Event: Authentication failure
client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failed:', msg);
});

// Event: Disconnected
client.on('disconnected', (reason) => {
  console.log('⚠️  Client disconnected:', reason);
});

// Helper: Translate text
async function translateText(text, targetLang = 'en') {
  try {
    const result = await translate(text, { to: targetLang });
    return {
      text: result.text,
      from: result.from.language.iso,
      to: targetLang
    };
  } catch (error) {
    console.error('Translation error:', error.message);
    return null;
  }
}

// Helper: Detect and store language for a chat
function storeLanguage(chatId, language) {
  if (language && language !== CONFIG.targetLanguage) {
    chatLanguages.set(chatId, language);
  }
}

// Helper: Get stored language for a chat
function getChatLanguage(chatId) {
  return chatLanguages.get(chatId) || 'auto';
}

// Event: Incoming message
client.on('message', async (message) => {
  try {
    const chat = await message.getChat();
    const contact = await message.getContact();
    const chatId = chat.id._serialized;
    
    // Skip if message is from you or a group (for now)
    if (message.fromMe || chat.isGroup) {
      return;
    }

    // Get message body
    const messageBody = message.body.trim();
    
    // Skip empty messages
    if (!messageBody) {
      return;
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📨 Message from: ${contact.pushname || contact.number}`);
    console.log(`Original: ${messageBody}`);

    // Handle commands
    if (messageBody.startsWith('!')) {
      await handleCommand(message, messageBody, chatId);
      return;
    }

    // Auto-translate incoming message
    if (CONFIG.autoTranslate) {
      const translation = await translateText(messageBody, CONFIG.targetLanguage);
      
      if (translation && translation.from !== CONFIG.targetLanguage) {
        // Store the detected language for this chat
        storeLanguage(chatId, translation.from);
        
        console.log(`🌍 Detected: ${translation.from} → ${CONFIG.targetLanguage}`);
        console.log(`📝 Translation: ${translation.text}`);
        
        // Optionally send translation back (comment out if you don't want this)
        // await message.reply(`🌍 Translation: ${translation.text}`);
      } else {
        console.log(`✓ Already in ${CONFIG.targetLanguage}`);
      }
    }

    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  } catch (error) {
    console.error('❌ Error processing message:', error.message);
  }
});

// Handle bot commands
async function handleCommand(message, command, chatId) {
  const args = command.slice(1).split(' ');
  const cmd = args[0].toLowerCase();
  
  try {
    switch (cmd) {
      case 'translate':
      case 'tr': {
        const text = args.slice(1).join(' ');
        if (!text) {
          await message.reply('Usage: !translate <text>\nExample: !translate Hello, how are you?');
          return;
        }
        
        const targetLang = getChatLanguage(chatId);
        const translation = await translateText(text, targetLang === 'auto' ? 'en' : targetLang);
        
        if (translation) {
          await message.reply(`🌍 Translation (${translation.from} → ${translation.to}):\n${translation.text}`);
          console.log(`✓ Translated command: ${text} → ${translation.text}`);
        } else {
          await message.reply('❌ Translation failed. Please try again.');
        }
        break;
      }
      
      case 'lang': {
        const lang = args[1];
        if (!lang) {
          const currentLang = getChatLanguage(chatId);
          await message.reply(
            `Current language: ${currentLang}\n\n` +
            `Usage: !lang <code>\n` +
            `Examples:\n` +
            `  !lang zh-CN (Chinese)\n` +
            `  !lang fr (French)\n` +
            `  !lang es (Spanish)\n` +
            `  !lang ar (Arabic)\n` +
            `  !lang auto (Auto-detect)`
          );
          return;
        }
        
        chatLanguages.set(chatId, lang);
        await message.reply(`✓ Language set to: ${lang}`);
        console.log(`✓ Language set for ${chatId}: ${lang}`);
        break;
      }
      
      case 'help': {
        const helpText = 
          `🤖 *WhatsApp Translator Bot*\n\n` +
          `*Commands:*\n` +
          `!translate <text> - Translate text\n` +
          `!lang <code> - Set preferred language\n` +
          `!help - Show this message\n\n` +
          `*Features:*\n` +
          `✓ Auto-translates incoming messages to English\n` +
          `✓ Detects languages automatically\n` +
          `✓ Remembers your language per chat\n\n` +
          `*Language Codes:*\n` +
          `zh-CN (Chinese), fr (French), es (Spanish),\n` +
          `ar (Arabic), de (German), ja (Japanese)`;
        
        await message.reply(helpText);
        console.log(`✓ Sent help to ${chatId}`);
        break;
      }
      
      default:
        await message.reply(`Unknown command: ${cmd}\nType !help for available commands.`);
    }
  } catch (error) {
    console.error(`❌ Error handling command ${cmd}:`, error.message);
    await message.reply('❌ Command failed. Please try again.');
  }
}

// Handle outgoing messages (when you send a message)
// This is for future feature: translating your replies
client.on('message_create', async (message) => {
  try {
    // Only process messages from you
    if (!message.fromMe) {
      return;
    }

    const chat = await message.getChat();
    
    // Skip groups for now
    if (chat.isGroup) {
      return;
    }

    const chatId = chat.id._serialized;
    const messageBody = message.body.trim();
    
    // Skip empty or commands
    if (!messageBody || messageBody.startsWith('!')) {
      return;
    }

    // Get the stored language for this chat
    const targetLang = getChatLanguage(chatId);
    
    // If we have a stored language and it's not English, show translation info
    if (targetLang && targetLang !== 'auto' && targetLang !== CONFIG.targetLanguage) {
      console.log(`\n📤 You sent: ${messageBody}`);
      console.log(`💡 Tip: For auto-translation, use !translate ${messageBody}`);
      
      // Uncomment to auto-translate your replies:
      // const translation = await translateText(messageBody, targetLang);
      // if (translation) {
      //   console.log(`📝 Would translate to ${targetLang}: ${translation.text}`);
      // }
    }

  } catch (error) {
    console.error('❌ Error processing outgoing message:', error.message);
  }
});

// Initialize the client
console.log('🚀 Starting WhatsApp Translator Bot...\n');
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n⚠️  Shutting down gracefully...');
  await client.destroy();
  console.log('✓ Bot stopped. Goodbye!\n');
  process.exit(0);
});

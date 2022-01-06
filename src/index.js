const { client, commands } = require('./client');
const { prefix } = require('../config.json');
const scopes = require('../data/scopes.json');
const Storage = require('./Storage');
const Context = require('./markdown/Context');

const storage = new Storage();

client.on('messageCreate', (message) => {
  if (message.author.id === client.user.id) {
    return;
  }

  const { content, channel } = message;

  if (content.startsWith(prefix)) {
    const [command, ...args] = content.slice(prefix.length).split(/ +/g);

    commands[command]?.call(null, client, message, args);
  } else if (scopes[message.guildId] === message.channelId) {
    const ctx = new Context(content).parse();

    if (ctx.contents.length > 0) {
      channel.send(ctx.toString());
    }
  }
});

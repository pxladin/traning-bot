const Context = require('../markdown/Context');

module.exports = (client, { channel, id: messageId, author }, args) => {
  const ctx = new Context(args.join(' ')).parse();

  ctx.metaData = {
    id: messageId,
    channelId: channel.id,
    submitter: {
      id: author.id,
      name: author.tag,
    },
  };

  ctx.messageQueue.forEach((msg) => void channel.send(msg));

  ctx.contents.forEach((c) => {
    delete c.ctx;
  });

  channel.send(`\`\`\`json\n${JSON.stringify(ctx, null, 2)}\n\`\`\``);
};

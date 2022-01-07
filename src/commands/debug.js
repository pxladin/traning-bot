const Context = require('../markdown/Context');

module.exports = (client, { channel, id: messageId, author }, args) => {
  const startTime = Date.now();
  const ctx = new Context(args.join(' ')).parse();
  const timeTook = Date.now() - startTime;

  ctx.metaData = {
    id: messageId,
    channelId: channel.id,
    timestamp: Date.now(),
    submitter: {
      id: author.id,
      name: author.tag,
    },
  };

  ctx.messageQueue.forEach((msg) => void channel.send(msg));

  ctx.contents.forEach((c) => {
    delete c.ctx;
  });

  channel.send(`
Took ${timeTook}ms
\`\`\`json\n${JSON.stringify(ctx, null, 2)}\n\`\`\`
`);
};

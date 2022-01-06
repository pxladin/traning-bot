const Context = require('../markdown/Context');

module.exports = (client, { channel }, args) => {
  const ctx = new Context(args.join(' ')).parse();

  ctx.messageQueue.forEach((msg) => void channel.send(msg));

  ctx.contents.forEach((c) => {
    delete c.ctx;
  });

  channel.send(`\`\`\`json\n${JSON.stringify(ctx, null, 2)}\n\`\`\``);
};

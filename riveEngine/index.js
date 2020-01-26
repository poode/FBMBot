const RiveScript = require('rivescript');

const bot = new RiveScript({utf8: true});
 
// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multiple file names), the success function is called only when ALL
// the files have finished loading.
function loading_done(username, userMessage) {
  console.log("Bot has finished loading!");
 
  // Now the replies must be sorted!
  bot.sortReplies();
 
  // And now we're free to get a reply from the brain!
 
 
  // NOTE: the API has changed in v2.0.0 and returns a Promise now.
  return bot.reply(username, userMessage)
}

 
// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

 

module.exports = {
  BotReply: loading_done,
  errorHandler: loading_error,
  botLoaded: bot.loadFile("riveEngine/brain/replies.rive"),
}
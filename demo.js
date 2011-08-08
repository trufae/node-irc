var IRC = require('./IRC').IRC;
var irc = new IRC('irc.homelien.no', 6667);
irc.on('connected', function(server) {
    console.log('connected to ' + server);
    irc.join('#foobartest', function() {
        irc.privmsg('#foobartest', 'well hello yall');
        irc.nick('muppetty2', function() {
            irc.privmsg('#foobartest', 'I\'m new!');
        });
    });
});
irc.on('privmsg', function(from, to, message) {
    console.log('privmsg: ' + message + ', from ' + from);
    irc.privmsg(from, 'hi!');
});
irc.on('servertext', function(from, to, text) {
    console.log('(' + from + ') ' + text);
});
irc.on('ping', function(from) {
    console.log('ping from ' + from);
    irc.ping(from);
});
irc.on('ping-reply', function(from, ms) {
    console.log('ping reply from ' + from + ': ' + ms + ' ms');
});
irc.connect('muppetty');
process.on('exit', function () {
    irc.quit('bye');
});
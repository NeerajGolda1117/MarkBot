function bot1handler (options, event, context, callback) {
    options.next_state = 'user1';
    callback (options, event, context);
}
function user1handler (options, event, context, callback) {
    options.next_state = 'bot2';
    options.data.name = event.message; //name is set here
    console.log("*********************************************************"+event.message);
    callback (options, event, context);
}
function bot2handler (options, event, context, callback) {
    callback (options, event, context);
}
function timeHandler (options, event, context, callback) {
    context.simplehttp.makeGet ("http://time.jsontest.com", {}, function (context, event) {
        var res = JSON.parse(event.getresp);
        options.data.time = res.time;
        callback(options, event, context);
    });
}
module.exports.common = {
	timeLabel: timeHandler,
}
module.exports.main = {
	
}
module.exports.profile = {  //export to our own module
    bot1: bot1handler,
    user1: user1handler,
    bot2: bot2handler
}
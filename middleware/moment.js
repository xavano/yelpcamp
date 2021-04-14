var moment = require('moment');

var func = {
    sayhi: function(name) {
        return "Hello " + name;
    }, 
    formatDate: function(date) {
        return moment(date).fromNow();
    }    
};
module.exports = func;

 // use eg. <%= helper.formatDate(comment.createdAt, 'MMMM Do YYYY, h:mm:ss a') %> in show.ejs file

    // formatDate: function(date, format) {
    //     return moment(date).format(format);
    // } 
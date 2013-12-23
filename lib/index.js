/**
  * Module dependencies
  */

require('ember');

var notify = require('notification');


/**
  * Overide render so as to
  * support html messages
  */

notify.Notification.prototype.render = function(options){
  var el = this.el
    , title = options.title
    , msg = options.message
    , self = this;

  el.find('.close').click(function(){
    self.emit('close');
    self.hide();
    return false;
  });

  // el.click(function(e){
  //   e.preventDefault();
  //   self.emit('click', e);
  // });

  el.find('.title').html(title);
  if (!title) el.find('.title').remove();

  // message
  if ('string' == typeof msg) {
    el.find('p').html(msg);
  } else if (msg) {
    el.find('p').replaceWith(msg.el || msg);
  }

  setTimeout(function(){
    el.removeClass('hide');
  }, 0);
};


module.exports = Em.Mixin.create({
  notify: notify
});

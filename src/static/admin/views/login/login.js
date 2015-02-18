define(['backbone', './login.jade', 'domain/auth', 'vendor/js/ladda'], function (Backbone, template) {

    var auth = require('domain/auth');
    var Ladda = require('vendor/js/ladda');

    return Backbone.View.extend({
        name: 'loginForm',
        events: {
            'keyup input': 'validation',
            'click #submit': 'login'
        },
        attributes: {
            class: 'v-loginForm'
        },
        initialize: function () {
            this.$el.html(template());
        },
        validation: function () {
            if (this.$('#login').val() && this.$('#password').val()) {
                this.$('#submit').prop('disabled', false);
            } else {
                this.$('#submit').prop('disabled', true);
            }
        },
        login: function(e) {
            var button = $(e.currentTarget),
                divMessage = this.$('.message'),
                login = this.$('#login').prop('disabled', true).val(),
                password = this.$('#password').prop('disabled', true).val;

            e.preventDefault();

            var l = Ladda.create(button.get(0));
            l.start();
            //button.addClass('wait').prop('disabled', true);
            auth.login(login, password, _.bind(function(err){
                button.removeClass('wait').prop('disabled', false);
                this.$('input').prop('disabled', false);
                if (err) {
                    divMessage.text(err).removeClass('hide');
                    setTimeout(function() {
                        divMessage.addClass('hide');
                    }, 2000);
                }
            }, this));

        },
        remove: function() {
            Backbone.View.prototype.remove.apply(this);
        }
    });
});
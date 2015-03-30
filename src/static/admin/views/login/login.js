define(['backbone', 'underscore', './login.jade', 'domain/net/auth', 'vendor/js/ladda'], function (Backbone, _, template) {

    var auth = require('domain/net/auth'),
        Ladda = require('vendor/js/ladda');


    return Backbone.View.extend({
        name: 'loginForm',
        events: {
            'keyup input': 'validation',
            'change input': 'validation',
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
            var divMessage = this.$('.message'),
                login = this.$('#login').val(),
                password = this.$('#password').val();

            e.preventDefault();
            if (!this.elProggres) {
                this.elProggres = Ladda.create(this.$('#submit').get(0));
            }

            this.elProggres.start();
            auth.login(login, password, _.bind(function(err){
                this.elProggres.stop();
                if (err) {
                    divMessage.text(err).show();
                    setTimeout(function() {
                        divMessage.hide();
                    }, 2000);
                }
            }, this));

        },
        remove: function() {
            Backbone.View.prototype.remove.apply(this);
        }
    });
});
"use strict";

define(['underscore', 'views/entity/parentView', './list.jade', './numbers/numbers', './column/column', 'domain/router', './item/item'],
    function (_, ParentView, template, Numbers, Column, router, Item) {

        return ParentView.extend({
            attributes: {
                class: 'v-list'
            },
            events: {
                'click [data-create]': 'create',
                'click [data-search]': 'search',
                'click [data-search-clean]': 'searchClean',
                'keyup [data-search-val]': 'onKeyUpSearch',
                'change [data-search-val]': 'detectSearch'
            },
            initialize: function (data) {
                this.page = data.page || {};
                this.collection = this.model.get('collection');

                var opt = {};
                _.each(this.page.get('fields'), function (val, key) {
                    var n = key.split(':');

                    opt[n[0]] = {
                        size: (n[1]) ? n[1] : 2,
                        bold: (n[2]),
                        value: val.split(' '),
                        caption: n[0]
                    };
                });
                this.opt = opt;


                this.collection.fetch();
                this.listenTo(this.collection, 'add', this.addItem);
                this.listenTo(this.model, 'change', this.onModel);
                this.listenTo(this.model, 'change:search', this.detectSearch);
                this.render();
                this.collection.each(this.addItem, this);
                this.onModel();
            },
            render: function () {
                var nTop = new Numbers({model: this.model});
                var nBottom = new Numbers({model: this.model});
                var column = new Column({model: this.model, opt: this.opt});

                this.addChild(nTop, nBottom, column);

                this.$el.html(template(this.model.attributes));

                this.$('[data-numbers-top]').append(nTop.$el);
                this.$('[data-numbers-bottom]').append(nBottom.$el);
                this.$('[data-column]').append(column.$el);
                column.render();
                nTop.render();
                nBottom.render();
                this.detectSearch();
            },
            onModel: function () {
                var search = 'active=' + this.model.get('active');
                if (this.model.get('search')) {
                    search += '&search=' + this.model.get('search');
                }
                if (this.model.get('sortBy')) {
                    search += '&sortBy=' + this.model.get('sortBy');
                    if (this.model.get('revert')) {
                        search += '&revert=' + this.model.get('revert');
                    }
                }
                //router.set({ search : search});
            },
            create: function () {
                router.navigate(this.page.get('namespace') + '/create');
            },
            search: function () {
                var search = this.$('[data-search-val]').val();
                router.set({
                    search: search,
                    active: 1
                });
            },
            searchClean: function () {
                this.$('[data-search-val]').val('');
                this.search();
            },
            detectSearch: function () {
                if (this.$('[data-search-val]').val()) {
                    this.$('[data-search-clean]').show();
                } else {
                    this.$('[data-search-clean]').hide();
                }
            },
            onKeyUpSearch: function (e) {
                if (e.keyCode === 13) {
                    this.search();
                    return true;
                }
                this.detectSearch();
            },
            addItem: function (m) {
                var v = new Item({model: m, opt: this.opt});
                this.$('[data-tableConteiner]').append(v.$el);
                v.render();
                this.addChild(v);
            }
        });

    });


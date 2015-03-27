define(['views/entity/parentView', 'domain/menu', './submenu/submenu'],
    function (ParentView, menu, SubMenu) {

        return ParentView.extend({
            attributes: {
                class: 'v-mainMenu'
            },
            tagName: 'ul',
            initialize: function () {
                this.childrens = [];
                menu.each(this.addItem, this);
                this.listenTo(menu, 'add', this.addItem);
            },
            addItem: function (model) {
                var item = new SubMenu({model: model});
                this.addChild(item);
                this.$el.append(item.$el);
            }
        });


    });
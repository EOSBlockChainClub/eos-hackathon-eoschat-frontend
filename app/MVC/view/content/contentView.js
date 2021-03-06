import Marionette from 'backbone.marionette';
import template from './templates/content-template.jst';
import UserListView from '../user-list/userListView';
import workshop from '../../controller/appWorkshop';
import ChatListView from '../chat-list/chatListView';
import store from '../../controller/appStore';
import ChatList from '../../model/collections/ChatList'

export default Marionette.View.extend({
    template: template,
    className: 'row content',
    regions: {
        userList: {
            el: '#user-list',
            replaceElement: true
        },
        chatBox: {
            el: '#chat-box',
            replaceElement: true
        }
    },
    onRender: function(){
            let self = this;
            self.showChildView('userList', new UserListView({collection: store.getUsers()}));
    },
    onChildviewChatSelected: function(model) {
        localStorage.setItem('selected-chat-user', model.get('account_name'));
        let self = this;
        $('#tool').css('display','none');
        workshop.checkKeys(model).then(() => {
            self.showChildView('chatBox', new ChatListView({collection: model.get('messages')}));
        })
    }
})
import { Model } from '@vuex-orm/core';
import User from './User';
import Post from './Post'


export default class Comment extends Model {
    static entity = 'comments'

    static fields () {
        return {
            id: this.increment(),
            user_id: this.number(0),
            post_id: this.number(0),
            comment: this.string(''),
            user: this.belongsTo(User, 'user_id'),
            post: this.belongsTo(Post, 'post_id'),      
        }
    }
}
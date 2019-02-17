import { Model } from '@vuex-orm/core';
import Post from './Post'
import Comment from './Comment'

export default class User extends Model {
    static entity = 'users'

    static fields () {
        return {
            id: this.increment(),
            name: this.string(''),
            email: this.string(''),
            password: this.string('secret'), 
            phone: this.number(123456789),
            comments: this.hasMany(Comment, 'user_id'),
            posts: this.hasMany(Post, 'user_id')       
        }
    }
}
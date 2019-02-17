<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile 
                @click="$router.push(section.route)"
                v-for="section in sections"
                :key="section.id"       
        >
          <v-list-tile-action>
            <v-icon> {{section.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>{{section.name}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import {users, comments, posts} from '@/database/data';
import User from '@/database/models/User'

export default {
  name: 'App',
   data () {
     return {
       drawer: false,
     }
    },
    async created () {
      await this.$store.dispatch('entities/users/create', { data: users })
      await this.$store.dispatch('entities/posts/create', { data: posts })
      await this.$store.dispatch('entities/comments/create', { data: comments })
    },
    computed: {
      auth: {
        get () {
          return this.$store.getters['entities/auth/find'](1)
        },
        set (val) {}
        },
        sections () {
          if (!this.auth) {
            return [
              {id: 2, name: 'Iniciar sesión', route:'/login', icon: 'call_made', auth: false},
              {id: 3, name: 'Registrate', route:'/register', icon: 'person_add', auth: false},
            ]
          }
          return [
            {id: 2, name: 'Blog', route:'/blog', icon: 'format_list_bulleted', auth: true},
            {id: 3, name: 'Perfil', route:'/profile', icon: 'account_box', auth: true}, 
          ]
        } 

      }  
    }

</script>

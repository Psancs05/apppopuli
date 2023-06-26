<template>
    <div class="icono_usuario">
        <v-icon
        :disabled="!currentUser"
        large
        color="#178649">
        mdi-account-circle
        </v-icon>

        <v-menu
          v-if="currentUser"
          offset-y>
          <template v-slot:activator="{ on, attrs }">
              <lab color="primary"
              dark
              v-bind="attrs"
              v-on="on">
              {{ currentUser.contact }}
              </lab>
          </template>

          <v-list>
              <v-list-item
              link>
              <v-list-item-title
                  @click="logout">
                  {{$t("inicio.botonLogout")}}
              </v-list-item-title>
              </v-list-item>
          </v-list>

          <v-list-item link>
            <v-list-item-title>
              <router-link :to="misInformes" style="color: black;">
                {{$t("inicio.botonMisInformes")}}
              </router-link>
            </v-list-item-title>
          </v-list-item>


        </v-menu>
    </div>
</template>

<script>
import i18n from "@/i18n";

  export default {

    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      misInformes() {
        return `/${i18n.locale}/misinformes`;
      },
    },

    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
      }
    }

  }

</script>

<style>

  .icono_usuario {
    text-align: left;
    padding-top: 10px;
    padding-left: 10px
  }

</style>
<template>
  <select
    class="language-selector"
    @change="changeLanguage"
    v-model="selectedLanguage"
  >
    <option
      v-for="(lang, i) in $i18n.availableLocales"
      :key="`Lang${i}`"
      :value="lang"
    >
      {{ lang }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
      this.$router.push({
        params: { lang: this.selectedLanguage },
      });
    },
  },
};
</script>

<style scoped>
.language-selector {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

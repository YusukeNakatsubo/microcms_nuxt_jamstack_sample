<template>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
      <!-- {{ content.content }} -->
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ $config }) {
    const { data } = await axios
      .get(
        'https://microcms-nuxt-jamstack-sample.microcms.io/api/v1/info',
        { headers: { 'X-MICROCMS-API-KEY': $config.apiKey }}
    )
    return data;
  },
  generate: {
    async routes( $config ) {
      const pages = await axios
        .get('https://microcms-nuxt-jamstack-sample.microcms.io/api/v1/info',
        { headers: { 'X-MICROCMS-API-KEY': $config.apiKey }}
        )
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/${content.id}`,
            payload: content
          }))
        )
      return pages
    }
  }
}
</script>
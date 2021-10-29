# Jamstack Project
Nuxt.js + microCMS + Netlify

## Reference
- [microCMS + NuxtでJamstackブログを作ってみよう](https://blog.microcms.io/microcms-nuxt-jamstack-blog/)

## 0. Index
1. Install Nuxt.js
1. Create microCMS account
1. Setting enviroment variables
1. Install axios & sass
1. Edit Vue Template

## 1. Install Nuxt.js

```bash
create-nuxt-app v3.7.1
✨  Generating Nuxt.js project in microcms_nuxt_jamstack_sample
? Project name: microcms_nuxt_jamstack_sample
? Programming language: JavaScript
? Package manager: Npm
? UI framework: None
? Nuxt.js modules: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Linting tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/Jamstack hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? What is your GitHub username? yusukenakatsubo
? Version control system: Git
```

```bash
$ cd microcms_nuxt_jamstack_sample
$ npm run dev

-> http://localhost:3000/
```

## 2. Create microCMS account

## 3. Setting enviroment variables

### .env

```
API_KEY=your_api_key
```

### nuxt.config.js

```javascript
const { API_KEY, API_URL } = process.env;

export default {

// ...

  privateRuntimeConfig: {
    apiKey: API_KEY,
    // apiUrL: API_URL
  },
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined
  },

}
```

## 4. Install axios & sass
- node-sassをインストールしてしまうと、デプロイ時にエラーが発生する
- sass-loaderのバージョン依存を解消しないと、デプロイ時にエラーが発生する

[プリプロセッサ](https://nuxtjs.org/ja/docs/features/configuration/#%E3%83%97%E3%83%AA%E3%83%97%E3%83%AD%E3%82%BB%E3%83%83%E3%82%B5)

```bash
// axios
$ npm install -D axios

$ npm install -D sass sass-loader@10.1.1
```

### package.json

```javascript
{
  "dependencies": {
    "@nuxtjs/axios": "^5.13.6",
    "core-js": "^3.15.1",
    "nuxt": "^2.15.7"
  },
  "devDependencies": {
    "sass": "^1.43.4",
    "sass-loader": "^10.1.1"
  }
}
```

### nuxt.config.js

```javascript 
export default {

  // ...
  modules: [
    "@nuxtjs/axios",
  ],
```

## 5. Edit Vue Template

### pages/index.vue

```javascript
// $config に環境変数が入っている
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
}
</script>
```

### pages/_slug/index.vue

```javascript
// $config に環境変数が入っている
<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="content"></div>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params, $config }) {
    const { data } = await axios.get(
      `https://microcms-nuxt-jamstack-sample.microcms.io/api/v1/info/${params.slug}`,
      { headers: { 'X-MICROCMS-API-KEY': $config.apiKey }
      }
    )
    return data
  },
  // 静的ファイルを出力するのに必要な設定
  generate: {
    async routes( $config ) {
      const pages = await axios.get(
        'https://microcms-nuxt-jamstack-sample.microcms.io/api/v1/info',
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

<style lang="scss" scoped>
.main {
  width: 960px;
  margin: 0 auto;
}

.title {
  margin-bottom: 20px;
}

.publishedAt {
  margin-bottom: 40px;
}

.post {
  & > h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
  }

  & > h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0 16px;
    border-bottom: 1px solid #ddd;
  }

  & > p {
    line-height: 1.8;
    letter-spacing: 0.2px;
  }

  & > ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
}
</style>
```


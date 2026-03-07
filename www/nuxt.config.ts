// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  
  css: ["./assets/css/main.css"],
  runtimeConfig: {
    googleAppicationCreds : process.env.GOOGLE_APPLICATION_CREDENTIALS,
    googleServiceCert: {
      type: process.env.G_CREDS_TYPE,
      project_id: process.env.G_CREDS_PROJECT_ID,
      private_key_id: process.env.G_CREDS_PRIVATE_KEY_ID,
      private_key: process.env.G_CREDS_PRIVATE_KEY,
      client_email: process.env.G_CREDS_CLIENT_EMAIL,
      client_id: process.env.G_CREDS_CLIENT_ID,
      auth_uri: process.env.G_CREDS_AUTH_URI,
      token_uri: process.env.G_CREDS_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.G_CREDS_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.G_CREDS_CLIENT_X509_CERT_URL,
     universe_domain: process.env.G_CREDS_UNIVERSE_DOMAIN
    },
    public: {
      apiBaseUrl:  process.env.API_BASE_URL,
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["nuxt-vuefire", "@pinia/nuxt"],
  vuefire: {
    config: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY ?? "",
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID ?? "",
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? ""
    },
    auth: {
        enabled: true,
        // enables the sessionCookie
        sessionCookie: true,
        persistence: ['browserLocal', 'indexedDBLocal'],
        errorMap: 'debug',
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('md-')
    }
  }
});
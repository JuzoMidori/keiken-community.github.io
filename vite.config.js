export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/keiken-landing/',  // your repo name here
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
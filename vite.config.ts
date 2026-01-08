import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 重要：這裡必須設定為你的 GitHub Repository 名稱
  // 例如你的網址是 https://user.github.io/my-project/，這裡就填 '/my-project/'
  // 如果你不知道名稱，可以先用 './' (相對路徑)，這通常能解決大部分問題
  base: './', 
})
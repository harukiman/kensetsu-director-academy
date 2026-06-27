import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages のプロジェクトサイト（https://<user>.github.io/<repo>/）で
// 配信するため base にリポジトリ名を指定する。
// dev / preview / build いずれの command でも同一 base にすることで、
// `vite preview`（command は 'serve'）でも本番と同じパスで確認できる。
export default defineConfig({
  base: '/kensetsu-director-academy/',
  plugins: [react()],
})

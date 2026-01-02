# BioStat Quest - 404 Hatasını Nasıl Düzeltirim?

## Sorun
GitHub Pages'de siteyi açtığınızda "404 Page Not Found - Did you forget to add the page to the router?" hatası görüyorsunuz.

## Neden?
React Router'ınızda ana sayfa (root path `/`) için bir component tanımlı değil.

## Çözüm Adımları

### 1. Kaynak Kodunuzu Bulun
Bu repository sadece build edilmiş dosyaları içeriyor. React kaynak kodunuzun olduğu projeyi bulun.

Kaynak kod projesi şu dosyalara sahip olmalı:
```
your-project/
├── src/
│   ├── App.tsx
│   ├── components/
│   └── ...
├── package.json
├── vite.config.ts
└── ...
```

### 2. Router Yapılandırmasını Bulun

Muhtemelen bu dosyalardan birinde:
- `src/App.tsx`
- `src/router.tsx`
- `src/routes.tsx`
- `src/main.tsx`

Şuna benzer bir kod arayın:
```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: ???  // Bu null veya undefined olabilir
  },
  {
    path: "/play",
    element: <Play />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
```

### 3. Ana Sayfa Component'i Ekleyin

#### Seçenek A: Yeni bir Home Component Oluşturun

`src/components/Home.tsx` dosyası oluşturun:
```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">BioStat Quest</h1>
        <p className="text-xl mb-8">Learn Biostatistics Through Games</p>
        <a href="/play" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg">
          Start Playing
        </a>
      </div>
    </div>
  )
}
```

Sonra router'da kullanın:
```tsx
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />  // ✅ Artık component var
  },
  {
    path: "/play",
    element: <Play />
  }
])
```

#### Seçenek B: Başka Bir Sayfaya Yönlendirin

Eğer direkt `/play` sayfasına gitmelerini istiyorsanız:
```tsx
import { Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/play" replace />  // ✅ /play'e yönlendir
  },
  {
    path: "/play",
    element: <Play />
  }
])
```

### 4. Build ve Deploy

Düzeltmeyi yaptıktan sonra:

```bash
# 1. Build edin
npm run build
# veya
yarn build

# 2. Build edilen dosyalar dist/ klasöründe olacak
cd dist

# 3. Bu dosyaları biostat-quest repository'sine kopyalayın
cp -r * /path/to/biostat-quest/

# 4. Git'e push edin
cd /path/to/biostat-quest/
git add .
git commit -m "Fix root route by adding Home component"
git push origin main
```

### 5. GitHub Pages Güncellemesini Bekleyin

1-2 dakika içinde https://egundeger.github.io/biostat-quest/ güncellenecek.

## Alternatif: Base URL Ayarı

Eğer Vite kullanıyorsanız, `vite.config.ts` dosyanızda:

```ts
export default defineConfig({
  base: '/biostat-quest/', // GitHub Pages için
  // ...
})
```

## Yardım

Kaynak kodunuzu bulamıyorsanız veya daha fazla yardıma ihtiyacınız varsa, bana:
1. Kaynak kod projenizin konumunu
2. `package.json` dosyanızın içeriğini
3. Router dosyanızın içeriğini gösterin.

# Управление медиа-файлами проектов

Новая система позволяет автоматически сканировать папки с фото и видео, а также вручную контролировать порядок и настройки медиа-файлов.

## Структура папок

Рекомендуемая структура для организации медиа-файлов:

```
public/
  projects/
    1/
      photos/
        image1.jpg
        image2.jpg
        image3.jpg
      videos/
        video1.mp4
        video2.mp4
    2/
      photos/
        ...
      videos/
        ...
```

## Способы использования

### 1. Автоматическое сканирование папок (рекомендуется)

Укажите пути к папкам в настройках проекта:

```typescript
{
  id: "1",
  title: "Car Photoshoot",
  // ... другие поля
  photosFolder: "/projects/1/photos",  // Автоматически сканирует все фото
  videosFolder: "/projects/1/videos", // Автоматически сканирует все видео
}
```

**Преимущества:**
- Просто добавляйте файлы в папку - они автоматически появятся в проекте
- Файлы сортируются по алфавиту
- Не нужно вручную обновлять список файлов

### 2. Ручное управление порядком

Если нужно контролировать порядок и выбрать главное фото/видео:

```typescript
{
  id: "2",
  title: "Fashion Session",
  // ... другие поля
  manualPhotos: [
    { path: "/projects/2/photos/main.jpg", order: 1, isMain: true },
    { path: "/projects/2/photos/photo2.jpg", order: 2 },
    { path: "/projects/2/photos/photo3.jpg", order: 3 },
  ],
  manualVideos: [
    { path: "/projects/2/videos/highlight.mp4", order: 1, isMain: true },
  ],
}
```

**Параметры MediaItem:**
- `path` (обязательно) - путь к файлу
- `order` (опционально) - порядок отображения (меньше = раньше). Если не указан, используется алфавитный порядок
- `isMain` (опционально) - если `true`, этот файл будет использован как главное изображение/видео проекта

### 3. Комбинированный подход

Можно указать ручные настройки для части файлов, а остальные подтянутся автоматически:

```typescript
{
  id: "3",
  title: "Event Coverage",
  photosFolder: "/projects/3/photos", // Автоматически сканирует папку
  manualPhotos: [
    { path: "/projects/3/photos/hero.jpg", order: 1, isMain: true }, // Главное фото вручную
    // Остальные фото из папки подтянутся автоматически после ручных
  ],
}
```

### 4. Fallback (старый способ)

Если не указаны ни папки, ни ручные настройки, используется массив `gallery`:

```typescript
{
  id: "4",
  title: "Old Project",
  gallery: [
    "/image1.jpg",
    "/image2.jpg",
    "/video1.mp4",
  ],
}
```

## Приоритет использования

Система использует следующий приоритет:

1. **Ручные настройки** (`manualPhotos`/`manualVideos`) - если указаны, используются в первую очередь
2. **Автоматическое сканирование** (`photosFolder`/`videosFolder`) - если папки указаны, сканируются автоматически
3. **Fallback** (`gallery` массив) - используется, если ничего не указано

## Поддерживаемые форматы

**Фото:**
- `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`

**Видео:**
- `.mp4`, `.webm`, `.mov`, `.avi`, `.mkv`

## Примеры использования

### Пример 1: Простой проект с автоматическим сканированием

```typescript
{
  id: "car-meet-2024",
  title: "Car Meet 2024",
  creator: ["photographer", "videographer"],
  category: "cars",
  location: "Arena Chishinau",
  type: "photo",
  photosFolder: "/projects/car-meet-2024/photos",
  videosFolder: "/projects/car-meet-2024/videos",
  // imageUrl и gallery будут заполнены автоматически
  imageUrl: "/placeholder.jpg", // Будет заменено на первое фото из папки
  gallery: [], // Будет заполнено автоматически
}
```

### Пример 2: Проект с ручным контролем порядка

```typescript
{
  id: "fashion-editorial",
  title: "Fashion Editorial",
  creator: ["photographer"],
  category: "fashion",
  location: "Studio",
  type: "photo",
  manualPhotos: [
    { path: "/projects/fashion/cover.jpg", order: 1, isMain: true },
    { path: "/projects/fashion/look1.jpg", order: 2 },
    { path: "/projects/fashion/look2.jpg", order: 3 },
    { path: "/projects/fashion/behind-scenes.jpg", order: 10 }, // В конце
  ],
  imageUrl: "/projects/fashion/cover.jpg",
  gallery: [], // Не используется при наличии manualPhotos
}
```

### Пример 3: Смешанный подход

```typescript
{
  id: "wedding-highlights",
  title: "Wedding Highlights",
  creator: ["videographer"],
  category: "events",
  location: "Venue",
  type: "video",
  photosFolder: "/projects/wedding/photos", // Автоматически все фото
  manualVideos: [
    { path: "/projects/wedding/videos/teaser.mp4", order: 1, isMain: true },
    { path: "/projects/wedding/videos/ceremony.mp4", order: 2 },
    // Остальные видео из папки videosFolder подтянутся автоматически
  ],
  imageUrl: "/projects/wedding/videos/teaser.mp4",
}
```

## API

### Серверная функция (для SSR/SSG)

```typescript
import { getProjectMedia, getProjectGallery } from "@/lib/media-scanner"

const media = await getProjectMedia(project)
// { photos: MediaItem[], videos: MediaItem[], mainImage: string, mainVideo?: string }

const gallery = await getProjectGallery(project)
// string[] - все медиа-файлы в правильном порядке
```

### Клиентская функция (для Client Components)

```typescript
import { getProjectMediaClient, getProjectGalleryClient } from "@/lib/media-utils"

const media = await getProjectMediaClient(project)
const gallery = await getProjectGalleryClient(project)
```

## Миграция существующих проектов

Для миграции существующих проектов:

1. Создайте папки для каждого проекта: `public/projects/{projectId}/photos/`
2. Переместите файлы в соответствующие папки
3. Обновите `lib/data.ts`:
   - Добавьте `photosFolder: "/projects/{projectId}/photos"`
   - Или используйте `manualPhotos` для точного контроля

## Советы

- Используйте автоматическое сканирование для новых проектов - это проще
- Используйте ручное управление, когда важен порядок или нужно выбрать главное фото
- Называйте файлы осмысленно - они будут отсортированы по алфавиту
- Для главного фото используйте `isMain: true` или поместите его первым в папке


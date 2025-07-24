import { ref, computed } from 'vue'

const favorites = ref([])

// Загружаем избранное из localStorage при инициализации
const loadFavoritesFromStorage = () => {
  const stored = localStorage.getItem('favorites')
  if (stored) {
    favorites.value = JSON.parse(stored)
  }
}

// Сохраняем в localStorage
const saveFavoritesToStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

export const useFavorites = () => {
  // Инициализируем данные если еще не загружены
  if (favorites.value.length === 0) {
    loadFavoritesFromStorage()
  }

  // Computed для получения списка избранного
  const favoritesList = computed(() => favorites.value)

  // Computed для подсчета количества
  const favoritesCount = computed(() => favorites.value.length)

  // Проверяем, находится ли товар в избранном
  const isFavorite = (itemId) => {
    return favorites.value.some(fav => fav.id === itemId)
  }

  // Добавляем/удаляем из избранного
  const toggleFavorite = (item) => {
    const index = favorites.value.findIndex(fav => fav.id === item.id)
    
    if (index > -1) {
      // Удаляем из избранного
      favorites.value.splice(index, 1)
    } else {
      // Добавляем в избранное
      favorites.value.push({
        id: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl
      })
    }
    
    saveFavoritesToStorage()
    return !isFavorite(item.id)
  }

  // Очищаем все избранное
  const clearFavorites = () => {
    favorites.value = []
    saveFavoritesToStorage()
  }

  // Удаляем конкретный товар
  const removeFavorite = (itemId) => {
    const index = favorites.value.findIndex(fav => fav.id === itemId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavoritesToStorage()
    }
  }

  return {
    favorites: favoritesList,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    removeFavorite
  }
}
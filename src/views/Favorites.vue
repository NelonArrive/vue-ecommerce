<script setup>
import CardList from '@/components/CardList.vue'
import { computed } from 'vue'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

const { favorites, toggleFavorite } = useFavorites()
const { isInCart, toggleCartItem } = useCart()

// Обогащаем избранные товары информацией о корзине
const favoriteItems = computed(() => {
	return favorites.value.map(item => ({
		...item,
		isFavorite: true,
		isAdded: isInCart(item.id)
	}))
})

const handleFavoriteToggle = item => {
	toggleFavorite(item)
}

const handleCartToggle = item => {
	const newCartState = toggleCartItem(item)
	// Обновляем локальное состояние для UI
	const favoriteItem = favoriteItems.value.find(fav => fav.id === item.id)
	if (favoriteItem) {
		favoriteItem.isAdded = newCartState
	}
}
</script>

<template>
	<div>
		<h2 class="text-3xl font-bold mb-8">
			Избранное
			<span class="text-lg text-gray-500">({{ favorites.length }})</span>
		</h2>

		<div v-if="favorites.length === 0" class="text-center py-8">
			<p class="text-gray-500 text-lg">У вас пока нет избранных товаров</p>
		</div>

		<div v-else class="mt-10">
			<CardList :items="favoriteItems" :add-to-favorite="handleFavoriteToggle" :add-to-cart="handleCartToggle" />
		</div>
	</div>
</template>

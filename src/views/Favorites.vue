<script setup>
import CardList from '@/components/CardList.vue'
import { computed, ref } from 'vue'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

const { favorites, toggleFavorite, clearFavorites } = useFavorites()
const { isInCart, toggleCartItem } = useCart()

// Состояние для модального окна подтверждения
const showClearModal = ref(false)

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

// Функция для показа модального окна
const showClearConfirmation = () => {
	showClearModal.value = true
}

// Функция для подтверждения очистки
const confirmClearFavorites = () => {
	clearFavorites()
	showClearModal.value = false
}

// Функция для отмены очистки
const cancelClearFavorites = () => {
	showClearModal.value = false
}
</script>

<template>
	<div>
		<!-- Заголовок с кнопкой очистки -->
		<div class="flex items-center justify-between mb-8">
			<h2 class="text-3xl font-bold">
				Избранное
				<span class="text-lg text-gray-500">({{ favorites.length }})</span>
			</h2>

			<button
				v-if="favorites.length > 0"
				@click="showClearConfirmation"
				class="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 6h18"></path>
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
					<path d="M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2"></path>
					<line x1="10" y1="11" x2="10" y2="17"></line>
					<line x1="14" y1="11" x2="14" y2="17"></line>
				</svg>
				Очистить все
			</button>
		</div>

		<div v-if="favorites.length === 0" class="text-center py-16">
			<div class="flex justify-center mb-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-gray-300"
				>
					<path
						d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
					></path>
				</svg>
			</div>
			<h3 class="text-xl font-medium text-gray-600 mb-2">Нет избранных товаров</h3>
			<p class="text-gray-500">Добавляйте товары в избранное, чтобы не потерять их</p>
		</div>

		<div v-else class="mt-10">
			<CardList :items="favoriteItems" :add-to-favorite="handleFavoriteToggle" :add-to-cart="handleCartToggle" />
		</div>

		<div v-if="showClearModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
				<div class="flex items-center gap-3 mb-4">
					<div class="flex-shrink-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-red-500"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="9" y1="9" x2="15" y2="15"></line>
							<line x1="15" y1="9" x2="9" y2="15"></line>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900">Очистить избранное?</h3>
				</div>

				<p class="text-gray-600 mb-6">
					Вы уверены, что хотите удалить все товары из избранного? Это действие нельзя отменить.
				</p>

				<div class="flex gap-3 justify-end">
					<button
						@click="cancelClearFavorites"
						class="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
					>
						Отмена
					</button>
					<button
						@click="confirmClearFavorites"
						class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium"
					>
						Удалить все
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

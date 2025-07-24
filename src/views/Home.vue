<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

const { isFavorite, toggleFavorite } = useFavorites()
const { isInCart, toggleCartItem } = useCart()

const items = ref([])
const filters = reactive({
	sortBy: 'title',
	searchQuery: ''
})

const onChangeSelect = e => {
	filters.sortBy = e.target.value
}

const onChangeSearch = e => {
	filters.searchQuery = e.target.value
}

const fetchItems = async () => {
	try {
		const params = { sortBy: filters.sortBy }
		if (filters.searchQuery) params.title = `*${filters.searchQuery}*`

		const { data } = await axios.get('https://d2b7cdd0b7613f66.mokky.dev/items', { params })

		items.value = data.map(item => ({
			...item,
			isFavorite: isFavorite(item.id),
			isAdded: isInCart(item.id)
		}))
	} catch (e) {
		console.log(e)
	}
}

const handleFavoriteToggle = item => {
	const newFavoriteState = toggleFavorite(item)
	item.isFavorite = newFavoriteState
}

const handleCartToggle = item => {
	const newCartState = toggleCartItem(item)
	item.isAdded = newCartState
}

onMounted(() => {
	fetchItems()
})

watch(filters, fetchItems)
</script>

<template>
	<div class="flex justify-between items-center">
		<h2 class="text-3xl font-bold mb-8">Наши товары</h2>
		<div class="flex gap-4">
			<select
				@change="onChangeSelect"
				class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
			>
				<option value="name">По названию</option>
				<option value="price">По цене (дешевые)</option>
				<option value="-price">По цене (дорогие)</option>
			</select>
			<div class="relative">
				<input
					@input="onChangeSearch"
					type="text"
					class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
					placeholder="Поиск..."
				/>
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<img src="/search.svg" />
				</div>
			</div>
		</div>
	</div>
	<div class="mt-10">
		<CardList :items="items" :add-to-favorite="handleFavoriteToggle" :add-to-cart="handleCartToggle" />
	</div>
</template>

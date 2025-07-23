<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

const drawerToggle = ref(false)

const closeDrawer = () => {
	drawerToggle.value = false
}

const openDrawer = () => {
	drawerToggle.value = true
}

const filters = reactive({
	sortBy: 'title',
	searchQuery: ''
})

const getFavorites = () => {
	const favorites = localStorage.getItem('favorites')
	return favorites ? JSON.parse(favorites) : []
}

const getCart = () => {
	const cart = localStorage.getItem('cart')
	return cart ? JSON.parse(cart) : []
}

const saveFavorites = favorites => {
	localStorage.setItem('favorites', JSON.stringify(favorites))
}

const saveCart = cart => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

const onChangeSelect = e => {
	filters.sortBy = e.target.value
}

const onChangeSearch = e => {
	filters.searchQuery = e.target.value
}

const addToFavorite = item => {
	const favorites = getFavorites()
	const itemIndex = favorites.findIndex(fav => fav.id === item.id)

	if (itemIndex > -1) {
		favorites.splice(itemIndex, 1)
		item.isFavorite = false
	} else {
		favorites.push({ id: item.id, title: item.title, price: item.price, imageUrl: item.imageUrl })
		item.isFavorite = true
	}

	saveFavorites(favorites)
}

const addToCart = item => {
	const cart = getCart()
	const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id)

	if (itemIndex > -1) {
		cart.splice(itemIndex, 1)
		item.isAdded = false
	} else {
		cart.push({ id: item.id, title: item.title, price: item.price, imageUrl: item.imageUrl })
		item.isAdded = true
	}

	saveCart(cart)
}

const fetchItems = async () => {
	try {
		const params = { sortBy: filters.sortBy }

		if (filters.searchQuery) params.title = `*${filters.searchQuery}*`

		const { data } = await axios.get('https://d2b7cdd0b7613f66.mokky.dev/items', { params })

		const favorites = getFavorites()
		const cart = getCart()

		items.value = data.map(item => ({
			...item,
			isFavorite: favorites.some(fav => fav.id === item.id),
			isAdded: cart.some(cartItem => cartItem.id === item.id)
		}))
	} catch (e) {
		console.log(e)
	}
}

onMounted(fetchItems)
watch(filters, fetchItems)

provide('cartActions', {
	closeDrawer,
	openDrawer
})
</script>

<template>
	<Drawer v-if="drawerToggle" />

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
		<Header @open-drawer="openDrawer" />

		<div class="p-10">
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
				<CardList :items="items" :add-to-favorite="addToFavorite" :add-to-cart="addToCart" />
			</div>
		</div>
	</div>
</template>

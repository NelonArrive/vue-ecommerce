<script setup>
import axios from 'axios'
import { computed, onMounted, provide, ref, watch } from 'vue'

import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'

const items = ref([])
const cartItems = ref([])
const drawerToggle = ref(false)

const closeDrawer = () => {
	drawerToggle.value = false
}

const openDrawer = () => {
	drawerToggle.value = true
	loadCartItems()
}

const getCart = () => {
	const cart = localStorage.getItem('cart')
	return cart ? JSON.parse(cart) : []
}

const saveCart = cart => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

const loadCartItems = () => {
	cartItems.value = getCart()
}

const removeFromCart = itemId => {
	const cart = getCart()
	const updatedCart = cart.filter(item => item.id !== itemId)
	saveCart(updatedCart)
	cartItems.value = updatedCart

	const itemIndex = items.value.findIndex(item => item.id === itemId)
	if (itemIndex > -1) {
		items.value[itemIndex].isAdded = false
	}
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
	loadCartItems()
}

const totalPrice = computed(() => {
	return cartItems.value.reduce((sum, item) => sum + item.price, 0)
})

const createOrder = async () => {
	const order = {
		items: cartItems.value,
		totalPrice: totalPrice.value
	}

	try {
		await axios.post('https://d2b7cdd0b7613f66.mokky.dev/orders', order)
		alert('Заказ успешно создан!')
		cartItems.value = []
		saveCart([])
	} catch (e) {
		console.error('Ошибка при создании заказа:', e)
		alert('Произошла ошибка при создании заказа')
	}
}

onMounted(() => {
	loadCartItems()
})

provide('cart', {
	cartItems,
	closeDrawer,
	openDrawer,
	items,
	getCart
})
</script>

<template>
	<Drawer
		v-if="drawerToggle"
		:cart-items="cartItems"
		:remove-from-cart="removeFromCart"
		:total-price="totalPrice"
		@create-order="createOrder"
	/>

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
		<Header :total-price="totalPrice" @open-drawer="openDrawer" />

		<div class="p-10">
			<RouterView />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '@/composables/useCart'

import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'

const { cartItems, totalPrice, removeFromCart, createOrder } = useCart()
const drawerToggle = ref(false)

const closeDrawer = () => {
	drawerToggle.value = false
}

const openDrawer = () => {
	drawerToggle.value = true
}

const handleCreateOrder = async () => {
	const result = await createOrder()

	if (result.success) {
		alert(result.message)
		closeDrawer()
	}
	alert(result.message)
}
</script>

<template>
	<Drawer
		v-if="drawerToggle"
		:cart-items="cartItems"
		:remove-from-cart="removeFromCart"
		:total-price="totalPrice"
		@create-order="handleCreateOrder"
		@close-drawer="closeDrawer"
	/>

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
		<Header :total-price="totalPrice" :cart-count="cartItems.length" @open-drawer="openDrawer" />

		<div class="p-10">
			<RouterView />
		</div>
	</div>
</template>

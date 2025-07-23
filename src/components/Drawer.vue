<script setup>
import CartItem from './CartItem.vue'
import DrawerHead from './DrawerHead.vue'
import { computed } from 'vue'

const props = defineProps({
	cartItems: Array,
	removeFromCart: Function,
	totalPrice: Number
})

const taxAmount = computed(() => {
	return Math.round(props.totalPrice * 0.05)
})
</script>

<template>
	<div class="fixed z-10 top-0 h-full w-full bg-black opacity-70" />
	<div class="flex flex-col justify-between fixed z-10 top-0 h-full right-0 w-96 bg-white px-10 py-7">
		<DrawerHead />
		<div class="flex flex-col flex-1 justify-between">
			<div class="flex flex-col gap-5">
				<div v-if="cartItems.length === 0" class="text-center text-gray-500 mt-10 text-2xl">
					<span class="text-5xl">😕</span> Корзина пустая
				</div>
				<CartItem
					v-for="item in cartItems"
					:key="item.id"
					:title="item.title"
					:price="item.price"
					:img="item.imageUrl"
					:on-click-delete="() => removeFromCart(item.id)"
				/>
			</div>

			<div v-if="cartItems.length > 0">
				<div class="flex flex-col gap-5">
					<div class="flex items-end gap-2">
						<span>Итого:</span>
						<div class="flex-1 border-b border-dashed" />
						<span class="font-bold">{{ totalPrice }} руб.</span>
					</div>

					<div class="flex items-end gap-2">
						<span>Налог 5%:</span>
						<div class="flex-1 border-b border-dashed" />
						<span class="font-bold">{{ taxAmount }} руб.</span>
					</div>
				</div>

				<button
					class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
				>
					Оформить заказ
					<img src="/arrow-next.svg" alt="Arrow" />
				</button>
			</div>
		</div>
	</div>
</template>

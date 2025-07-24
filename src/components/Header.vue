<script setup>
import { ShoppingCart, Heart, CircleUserRound } from 'lucide-vue-next'

defineProps({
	totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
	<header class="flex justify-between border-b border-slate-200 px-10 py-8">
		<RouterLink to="/">
			<div class="flex items-center gap-4">
				<img src="/logo.jpg" alt="Logo" class="w-12" />

				<div class="">
					<h2 class="text-xl font-bold uppercase">ИТ-СЕРВИС</h2>
					<p class="text-slate-400">Ремонт оргтехники</p>
				</div>
			</div>
		</RouterLink>

		<ul class="flex items-center gap-10">
			<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-gray-800">
				<ShoppingCart color="#ccc" />
				<span>Корзина ({{ totalPrice }})</span>
			</li>

			<RouterLink to="/favorites">
				<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-gray-800">
					<Heart color="#ccc" />
					<span>Закладки</span>
				</li>
			</RouterLink>
			
			<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-gray-800">
				<CircleUserRound color="#ccc" />
				<span>Профиль</span>
			</li>
		</ul>
	</header>
</template>

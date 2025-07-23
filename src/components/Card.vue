<script setup>
import { Heart } from 'lucide-vue-next'

defineProps({
	id: Number,
	imageUrl: String,
	title: String,
	price: Number,
	isFavorite: Boolean,
	isAdded: Boolean,
	addToCart: Function,
	addToFavorite: Function
})
</script>

<template>
	<div
		class="relative border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-xl"
	>
		<Heart
			@click="addToFavorite"
			:fill="isFavorite ? '#FF8585' : 'transparent'"
			:color="isFavorite ? '#FF8585' : '#eee'"
			class="absolute top-4 left-4 cursor-pointer hover:scale-110 transition-transform"
		/>
		<img class="w-40" :src="imageUrl" alt="Cartridge" />
		<p class="mt-2">{{ title }}</p>

		<div class="flex justify-between mt-5">
			<div class="flex flex-col">
				<span class="text-slate-400">Цена:</span>
				<b>{{ price }} руб.</b>
			</div>

			<img
				@click="addToCart"
				:src="!isAdded ? 'plus.svg' : '/checked.svg'"
				alt="plus"
				class="cursor-pointer hover:scale-110 transition-transform"
			/>
		</div>
	</div>
</template>

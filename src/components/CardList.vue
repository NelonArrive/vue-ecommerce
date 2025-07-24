<script setup>
import CardItem from './Card.vue'

defineProps({
	items: Array,
	addToFavorite: Function,
	addToCart: Function
})
</script>

<template>
	<div class="grid grid-cols-4 gap-4" v-auto-animate>
		<CardItem
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:imageUrl="item.imageUrl"
			:title="item.title"
			:price="item.price"
			:isFavorite="item.isFavorite"
			:isAdded="item.isAdded"
			:addToFavorite="() => addToFavorite(item)"
			:addToCart="() => addToCart(item)"
		/>
	</div>
</template>

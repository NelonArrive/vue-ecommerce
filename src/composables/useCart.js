import { ref, computed } from 'vue'
import axios from 'axios'

const cartItems = ref([])

// Загружаем корзину из localStorage при инициализации
const loadCartFromStorage = () => {
	const stored = localStorage.getItem('cart')
	if (stored) {
		cartItems.value = JSON.parse(stored)
	}
}

// Сохраняем в localStorage
const saveCartToStorage = () => {
	localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

export const useCart = () => {
	// Инициализируем данные если еще не загружены
	if (cartItems.value.length === 0) {
		loadCartFromStorage()
	}

	// Computed для получения списка товаров в корзине
	const cart = computed(() => cartItems.value)

	// Computed для подсчета общей стоимости
	const totalPrice = computed(() => {
		return cartItems.value.reduce((sum, item) => sum + item.price, 0)
	})

	// Computed для подсчета количества товаров
	const cartCount = computed(() => cartItems.value.length)

	// Проверяем, находится ли товар в корзине
	const isInCart = itemId => {
		return cartItems.value.some(cartItem => cartItem.id === itemId)
	}

	// Добавляем товар в корзину
	const addToCart = item => {
		if (!isInCart(item.id)) {
			cartItems.value.push({
				id: item.id,
				title: item.title,
				price: item.price,
				imageUrl: item.imageUrl
			})
			saveCartToStorage()
		}
	}

	// Удаляем товар из корзины
	const removeFromCart = itemId => {
		const index = cartItems.value.findIndex(item => item.id === itemId)
		if (index > -1) {
			cartItems.value.splice(index, 1)
			saveCartToStorage()
		}
	}

	// Переключаем товар в корзине (добавить/удалить)
	const toggleCartItem = item => {
		if (isInCart(item.id)) {
			removeFromCart(item.id)
			return false
		} else {
			addToCart(item)
			return true
		}
	}

	// Очищаем корзину
	const clearCart = () => {
		cartItems.value = []
		saveCartToStorage()
	}

	// Создаем заказ
	const createOrder = async () => {
		const order = {
			items: cartItems.value,
			totalPrice: totalPrice.value
		}

		try {
			await axios.post('https://d2b7cdd0b7613f66.mokky.dev/orders', order)
			clearCart()
			return { success: true, message: 'Заказ успешно создан!' }
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
			return { success: false, message: 'Произошла ошибка при создании заказа' }
		}
	}

	return {
		cartItems: cart,
		totalPrice,
		cartCount,
		isInCart,
		addToCart,
		removeFromCart,
		toggleCartItem,
		clearCart,
		createOrder
	}
}

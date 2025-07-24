import axios from 'axios'
import { ref } from 'vue'

const BASE_URL = 'https://d2b7cdd0b7613f66.mokky.dev'

export const useApi = () => {
	const loading = ref(false)
	const error = ref(null)

	const fetchItems = async (filters = {}) => {
		loading.value = true
		error.value = null

		try {
			const params = { sortBy: filters.sortBy || 'title' }
			if (filters.searchQuery) {
				params.title = `*${filters.searchQuery}*`
			}

			const { data } = await axios.get(`${BASE_URL}/items`, { params })
			return data
		} catch (err) {
			error.value = err.message || 'Ошибка при загрузке товаров'
			throw err
		} finally {
			loading.value = false
		}
	}

	const createOrder = async orderData => {
		loading.value = true
		error.value = null

		try {
			const { data } = await axios.post(`${BASE_URL}/orders`, orderData)
			return data
		} catch (err) {
			error.value = err.message || 'Ошибка при создании заказа'
			throw err
		} finally {
			loading.value = false
		}
	}

	return {
		loading,
		error,
		fetchItems,
		createOrder
	}
}

import { shopItemsData } from '@/services/mockData/shopItems'

// Mock delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getShopItems = async () => {
  await delay(300)
  return shopItemsData.map(item => ({ ...item }))
}

export const getItemsByCategory = async (category) => {
  await delay(300)
  return shopItemsData
    .filter(item => item.category === category)
    .map(item => ({ ...item }))
}
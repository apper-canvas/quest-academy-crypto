import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Avatar from '@/components/atoms/Avatar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { getShopItems } from '@/services/api/shopService'
import { useUserProgress } from '@/hooks/useUserProgress'

const AvatarShop = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { userProgress, updateProgress } = useUserProgress()
  
  useEffect(() => {
    loadItems()
  }, [])
  
  const loadItems = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getShopItems()
      setItems(data)
    } catch (err) {
      setError('Failed to load shop items. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const categories = [
    { id: 'all', name: 'All Items', icon: 'Grid3X3' },
    { id: 'faces', name: 'Faces', icon: 'Smile' },
    { id: 'accessories', name: 'Accessories', icon: 'Crown' },
    { id: 'backgrounds', name: 'Backgrounds', icon: 'Palette' }
  ]
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory)
  
  const handlePurchase = (item) => {
    if (userProgress.coins < item.price) {
      toast.error("Not enough coins! Play more games to earn coins!")
      return
    }
    
    if (userProgress.unlockedItems?.includes(item.id)) {
      toast.info("You already own this item!")
      return
    }
    
    updateProgress({
      coins: -item.price,
      unlockedItem: item.id
    })
    
    toast.success(`${item.name} purchased! 🎉`)
  }
  
  const isItemOwned = (itemId) => {
    return userProgress.unlockedItems?.includes(itemId)
  }
  
  const canAfford = (price) => {
    return userProgress.coins >= price
  }
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadItems} />
  if (!items.length) return <Empty title="Shop is empty" message="No items available right now" />
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-4xl text-gray-800 mb-4">🛍️ Avatar Shop</h1>
        <p className="text-xl text-gray-600">
          Customize your avatar with coins earned from completing games!
        </p>
      </motion.div>
      
      {/* Current Avatar & Coins */}
      <div className="max-w-md mx-auto mb-8">
        <Card className="p-6 text-center">
          <Avatar avatar={userProgress.avatar} size="2xl" animated className="mx-auto mb-4" />
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <ApperIcon name="Coins" size={20} className="text-accent" />
              <span className="font-bold text-xl text-accent">{userProgress.coins}</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'secondary'}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <ApperIcon name={category.icon} size={18} />
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 text-center relative">
              {isItemOwned(item.id) && (
                <div className="absolute top-3 right-3">
                  <Badge variant="success" size="sm">Owned</Badge>
                </div>
              )}
              
              <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {item.preview ? (
                  <span className="text-2xl">{item.preview}</span>
                ) : (
                  <ApperIcon name={item.icon} size={32} className="text-primary" />
                )}
              </div>
              
              <h3 className="font-display text-lg text-gray-800 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" size="sm">{item.category}</Badge>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Coins" size={16} className="text-accent" />
                  <span className="font-bold text-accent">{item.price}</span>
                </div>
              </div>
              
              <Button
                size="sm"
                className="w-full"
                disabled={isItemOwned(item.id) || !canAfford(item.price)}
                onClick={() => handlePurchase(item)}
                variant={isItemOwned(item.id) ? 'secondary' : 'primary'}
              >
                {isItemOwned(item.id) ? (
                  <>
                    <ApperIcon name="Check" size={16} className="mr-2" />
                    Owned
                  </>
                ) : !canAfford(item.price) ? (
                  <>
                    <ApperIcon name="Lock" size={16} className="mr-2" />
                    Need More Coins
                  </>
                ) : (
                  <>
                    <ApperIcon name="ShoppingCart" size={16} className="mr-2" />
                    Buy Now
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredItems.length === 0 && selectedCategory !== 'all' && (
        <Empty 
          title="No items in this category"
          message="Try selecting a different category or check back later!"
          icon="Package"
        />
      )}
    </div>
  )
}

export default AvatarShop
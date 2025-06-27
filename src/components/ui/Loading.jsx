import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'game') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
          />
          <h3 className="font-display text-xl text-gray-700 mb-2">Loading Game...</h3>
          <p className="text-gray-500">Get ready for some fun!</p>
        </div>
      </div>
    )
  }
  
  if (type === 'cards') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-card p-6">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
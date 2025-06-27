import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { useUserProgress } from '@/hooks/useUserProgress'
import { updateUserProfile } from '@/services/api/userService'

const Profile = () => {
  const { userProgress, loading, error, refreshProgress } = useUserProgress()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    avatar: { face: '😊', accessory: null, background: 'default' }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const avatarOptions = {
    faces: ['😊', '😎', '🤓', '😄', '🥰', '🤗', '😇', '🤠', '🤖', '👻'],
    accessories: [null, '🎩', '👑', '🎯', '🏆', '⭐', '🎪', '🎨', '🎭', '🎪'],
    backgrounds: ['default', 'forest', 'ocean', 'space', 'rainbow', 'sunset']
  }

  useEffect(() => {
    if (userProgress && !loading) {
      setFormData({
        username: userProgress.username || '',
        avatar: userProgress.avatar || { face: '😊', accessory: null, background: 'default' }
      })
    }
  }, [userProgress, loading])

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    if (formData.username.length < 2) {
      toast.error('Username must be at least 2 characters long')
      return
    }

    if (formData.username.length > 20) {
      toast.error('Username must be less than 20 characters')
      return
    }

    setIsSubmitting(true)
    
    try {
      await updateUserProfile(userProgress.userId, formData)
      await refreshProgress()
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      username: userProgress.username || '',
      avatar: userProgress.avatar || { face: '😊', accessory: null, background: 'default' }
    })
    setIsEditing(false)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <ApperIcon name="User" size={24} className="text-primary" />
                  Profile Information
                </h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <ApperIcon name="Edit" size={16} />
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your username"
                      maxLength={20}
                    />
                  </div>

                  {/* Avatar Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Avatar
                    </label>
                    
                    {/* Face Selection */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Face</p>
                      <div className="grid grid-cols-5 gap-2">
                        {avatarOptions.faces.map((face) => (
                          <button
                            key={face}
                            type="button"
                            onClick={() => handleInputChange('avatar.face', face)}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              formData.avatar.face === face
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-2xl">{face}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accessory Selection */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Accessory</p>
                      <div className="grid grid-cols-5 gap-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange('avatar.accessory', null)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.avatar.accessory === null
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-sm">None</span>
                        </button>
                        {avatarOptions.accessories.filter(acc => acc !== null).map((accessory) => (
                          <button
                            key={accessory}
                            type="button"
                            onClick={() => handleInputChange('avatar.accessory', accessory)}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              formData.avatar.accessory === accessory
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-2xl">{accessory}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Avatar Preview */}
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                      <Avatar avatar={formData.avatar} size="xl" />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <ApperIcon name="Loader2" size={16} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Check" size={16} />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Current Profile Display */}
                  <div className="flex items-center gap-4">
                    <Avatar avatar={userProgress.avatar} size="xl" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {userProgress.username}
                      </h3>
                      <p className="text-gray-600">Level {userProgress.level} Explorer</p>
                    </div>
                  </div>

                  {/* User Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                      <div className="text-2xl font-bold text-primary">
                        {userProgress.totalXP}
                      </div>
                      <div className="text-sm text-gray-600">Total XP</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">
                        {userProgress.coins}
                      </div>
                      <div className="text-sm text-gray-600">Coins</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Activity Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <ApperIcon name="BarChart3" size={24} className="text-secondary" />
                Activity Summary
              </h2>

              <div className="space-y-4">
                {/* Achievements */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Trophy" size={20} className="text-purple-600" />
                    <span className="font-medium text-gray-800">Achievements</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {userProgress.achievements?.length || 0}
                  </span>
                </div>

                {/* Completed Activities */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="CheckCircle" size={20} className="text-green-600" />
                    <span className="font-medium text-gray-800">Completed Activities</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {userProgress.completedActivities?.length || 0}
                  </span>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Flame" size={20} className="text-orange-600" />
                    <span className="font-medium text-gray-800">Current Streak</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    {userProgress.streakDays || 0} days
                  </span>
                </div>

                {/* Current Level Progress */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Level Progress</span>
                    <span className="text-sm text-gray-600">
                      Level {userProgress.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((userProgress.totalXP % 1000) / 1000) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>{userProgress.totalXP % 1000} XP</span>
                    <span>1000 XP</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
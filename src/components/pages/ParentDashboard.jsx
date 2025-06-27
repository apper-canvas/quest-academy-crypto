import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import {
  getProgressAnalytics,
  getSkillChartsData,
  getLearningGoals,
  createLearningGoal,
  deleteLearningGoal,
  getActivityHistory
} from '@/services/api/progressService'

const ParentDashboard = () => {
  const [analytics, setAnalytics] = useState(null)
  const [chartsData, setChartsData] = useState(null)
  const [goals, setGoals] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState('')
  const [goalTarget, setGoalTarget] = useState(90)
  const [goalDeadline, setGoalDeadline] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [analyticsData, chartsInfo, goalsData, activityHistory] = await Promise.all([
        getProgressAnalytics(),
        getSkillChartsData(),
        getLearningGoals(),
        getActivityHistory()
      ])
      
      setAnalytics(analyticsData)
      setChartsData(chartsInfo)
      setGoals(goalsData)
      setActivities(activityHistory.slice(0, 10))
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGoal = async (e) => {
    e.preventDefault()
    
    if (!selectedSkill || !goalDeadline) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const newGoal = await createLearningGoal({
        skill: selectedSkill,
        target: goalTarget,
        deadline: new Date(goalDeadline).toISOString()
      })
      
      setGoals(prev => [...prev, newGoal])
      setShowGoalForm(false)
      setSelectedSkill('')
      setGoalTarget(90)
      setGoalDeadline('')
      toast.success('Learning goal created successfully!')
    } catch (err) {
      toast.error('Failed to create learning goal')
    }
  }

  const handleDeleteGoal = async (goalId) => {
    if (!confirm('Are you sure you want to delete this goal?')) return

    try {
      await deleteLearningGoal(goalId)
      setGoals(prev => prev.filter(goal => goal.Id !== goalId))
      toast.success('Learning goal deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete learning goal')
    }
  }

  // Chart configurations
  const masteryChartOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    colors: ['#6366f1'],
    plotOptions: {
      bar: { borderRadius: 8, horizontal: false }
    },
    xaxis: {
      categories: chartsData?.masteryLevels.map(skill => skill.skill) || []
    },
    yaxis: { max: 100 },
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 3 }
  }

  const weeklyXPOptions = {
    chart: { type: 'area', toolbar: { show: false } },
    colors: ['#8b5cf6'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
    xaxis: {
      categories: chartsData?.weeklyXP.map(day => day.date) || []
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    grid: { strokeDashArray: 3 }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Parent Dashboard</h1>
          <p className="text-gray-600">Monitor your child's learning progress and set goals</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Activities</p>
                <p className="text-2xl font-bold">{analytics?.totalActivities || 0}</p>
              </div>
              <ApperIcon name="BookOpen" size={32} className="text-blue-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Average Score</p>
                <p className="text-2xl font-bold">{analytics?.averageScore || 0}%</p>
              </div>
              <ApperIcon name="Target" size={32} className="text-green-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Time Spent</p>
                <p className="text-2xl font-bold">{Math.round((analytics?.totalTimeSpent || 0) / 60)}h</p>
              </div>
              <ApperIcon name="Clock" size={32} className="text-purple-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Learning Goals</p>
                <p className="text-2xl font-bold">{goals.length}</p>
              </div>
              <ApperIcon name="Flag" size={32} className="text-orange-200" />
            </div>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skill Mastery Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Skill Mastery Levels</h3>
              {chartsData && (
                <Chart
                  options={masteryChartOptions}
                  series={[{
                    name: 'Mastery %',
                    data: chartsData.masteryLevels.map(skill => skill.mastery)
                  }]}
                  type="bar"
                  height={300}
                />
              )}
            </Card>
          </motion.div>

          {/* Weekly XP Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly XP Progress</h3>
              {chartsData && (
                <Chart
                  options={weeklyXPOptions}
                  series={[{
                    name: 'XP Earned',
                    data: chartsData.weeklyXP.map(day => day.xp)
                  }]}
                  type="area"
                  height={300}
                />
              )}
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Learning Goals</h3>
                <Button
                  onClick={() => setShowGoalForm(true)}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="Plus" size={16} />
                  Add Goal
                </Button>
              </div>

              {showGoalForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateGoal}
                  className="mb-6 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Skill</option>
                      <option value="addition">Addition</option>
                      <option value="subtraction">Subtraction</option>
                      <option value="multiplication">Multiplication</option>
                      <option value="division">Division</option>
                      <option value="comprehension">Reading Comprehension</option>
                    </select>
                    
                    <input
                      type="number"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(parseInt(e.target.value))}
                      min="1"
                      max="100"
                      placeholder="Target %"
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    />
                    
                    <input
                      type="date"
                      value={goalDeadline}
                      onChange={(e) => setGoalDeadline(e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button type="submit" size="sm">Create Goal</Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGoalForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.form>
              )}

              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.Id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 capitalize">{goal.skill}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGoal(goal.Id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress: {goal.current}% / {goal.target}%</span>
                      <span>Due: {format(new Date(goal.deadline), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                
                {goals.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No learning goals set yet. Create one to start tracking progress!</p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity) => (
                  <div key={activity.Id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'math' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      <ApperIcon 
                        name={activity.type === 'math' ? 'Calculator' : 'BookOpen'} 
                        size={20} 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Score: {activity.score}%</span>
                        <span>Time: {Math.round(activity.timeSpent / 60)}m</span>
                        <span>{format(new Date(activity.completedAt), 'MMM dd')}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.score >= 90 
                        ? 'bg-green-100 text-green-700'
                        : activity.score >= 80
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.score >= 90 ? 'Excellent' : activity.score >= 80 ? 'Good' : 'Needs Practice'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard
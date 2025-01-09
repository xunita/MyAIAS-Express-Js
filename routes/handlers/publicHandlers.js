const { askMyAIAS } = require('../../app/controller/myaias')

const askMe = async (req, res) => {
  askMyAIAS(req.body, res)
}

// Home
const homeHandler = (req, res) => {
  return res.status(200).json({ message: 'Welcome to MyAIAS' })
}

module.exports = {
  homeHandler,
  askMe
}

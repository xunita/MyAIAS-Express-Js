const { getMjAi } = require('../../app/controller/mjai')
const { askMyAIAS } = require('../../app/controller/myaias')
const { getNstAi } = require('../../app/controller/nstai')

const askMe = async (req, res) => {
  askMyAIAS(req.body, res)
}

const nstAI = async (req, res) => {
  getNstAi(req.body, res)
}

const mjAI = async (req, res) => {
  getMjAi(req.body, res)
}

// Home
const homeHandler = (req, res) => {
  return res.status(200).json({ message: 'Welcome to MyAIAS 1.0.0' })
}

module.exports = {
  homeHandler,
  askMe,
  nstAI,
  mjAI
}

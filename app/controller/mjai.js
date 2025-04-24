// Azure OpenAI
const { AzureOpenAI } = require('openai')
// logger
const { getLogger } = require('../../logger/config')
const { /* systemPrompt */ TOKEN_LIMIT, mjaiSystemPrompt } = require('../../constants/ai')
const { logger } = getLogger()
//
const getMjAi = async (data, res) => {
  // openai
  const endpoint = process.env.MYAIAS_ENDPOINT_URL
  const apiKey = process.env.MYAIAS_AZURE_OPENAI_API_KEY
  const apiVersion = process.env.MYAIAS_API_VERSION
  const deployment = process.env.MYAIAS_DEPLOYMENT_NAME
  const modelName = process.env.MYAIAS_MODEL_NAME
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment })

  const chatSettings = {
    model: modelName,
    max_tokens: 8000,
    // max_tokens: data.modelSettings.maxTokens || TOKEN_LIMIT,
    messages: [mjaiSystemPrompt, ...data],
    temperature: 0.7,
    stream: false
  }
  // console.log('data', data)
  client.chat.completions
    .create(chatSettings)
    .then(async (response) => {
      try {
        const text = response.choices[0].message.content
        res.status(200).json({ data: JSON.parse(text) })
        // log the full response
        logger.info(`response: ${text}`)
      } catch (error) {
        res.status(500).json({ error: error.message })
        logger.error(`Error parsing response: ${error.message}`)
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
      logger.error(`Error in response: ${error.message}`)
    })
}

module.exports = { getMjAi }

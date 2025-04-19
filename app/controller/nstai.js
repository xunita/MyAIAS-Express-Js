// Azure OpenAI
const { AzureOpenAI } = require('openai')
const ModelClient = require('@azure-rest/ai-inference')
const { AzureKeyCredential } = require('@azure/core-auth')
// logger
const { getLogger } = require('../../logger/config')
const { /* systemPrompt */ TOKEN_LIMIT, nstSystemPrompt } = require('../../constants/ai')
const { logger } = getLogger()
//
const getNstAi = async (data, res) => {
  // openai
  const endpoint = process.env.MYAIAS_ENDPOINT_URL
  const apiKey = process.env.MYAIAS_AZURE_OPENAI_API_KEY
  const apiVersion = process.env.MYAIAS_API_VERSION
  const deployment = process.env.MYAIAS_DEPLOYMENT_NAME
  const modelName = process.env.MYAIAS_MODEL_NAME
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment })

  const chatSettings = {
    model: modelName,
    max_tokens: 4096,
    // max_tokens: data.modelSettings.maxTokens || TOKEN_LIMIT,
    messages: [nstSystemPrompt, ...data],
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

const getNstR1Ai = async (data, res) => {
  const msgs = [nstSystemPrompt, ...data]
  // r1
  const r1Key = process.env.MYAIAS_AZURE_R1_API_KEY
  const r1Model = process.env.MYAIAS_AZURE_R1_MODEL
  const clientR1 = new ModelClient(
    'https://soroy-m5pch29z-westeurope.services.ai.azure.com/models',
    new AzureKeyCredential(r1Key)
  )

  clientR1
    .path('/chat/completions')
    .post({
      body: {
        messages: msgs,
        max_tokens: 4096,
        model: r1Model
      }
    })
    .then((response) => {
      if (response.status !== '200') {
        res.status(500).json({ error: 'Error Internal to R1' })
        logger.error(`Internal Error of R1 in response: ${response.status}`)
      }
      const text = response.body.choices[0].message.content
      res.status(200).json({ data: JSON.parse(text) })
      // log the full response
      logger.info(`response: ${text}`)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
      logger.error(`Error in response: ${error.message}`)
    })
}

module.exports = { getNstAi, getNstR1Ai }

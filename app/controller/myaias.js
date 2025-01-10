// Azure OpenAI
const { AzureOpenAI } = require('openai')
// logger
const { getLogger } = require('../../logger/config')
const { /* systemPrompt */ TOKEN_LIMIT } = require('../../constants/ai')
const { sleepMyAIAS } = require('../../utils/utils')
const { logger } = getLogger()
//
const askMyAIAS = async (data, res) => {
  // Set headers for streaming response to the client
  res.setHeader('Content-Type', 'text/event-stream') // Server-sent events
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  //
  const endpoint = data.modelSettings.endpoint
  const apiKey = data.modelSettings.apiKey
  const apiVersion = data.modelSettings.apiVersion
  const deployment = data.modelSettings.deployment

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment })
  // console.log(data)
  client.chat.completions
    .create(
      {
        model: deployment,
        max_tokens: data.modelSettings.maxTokens || TOKEN_LIMIT,
        messages: [data.systemPrompt, ...data.prompts],
        temperature: 0.7,
        stream: true
      },
      { responseType: 'stream' } //
    )
    .then(async (response) => {
      let fullResponse = '' //

      for await (const chunk of response) {
        //
        const choice = chunk.choices[0] //
        if (choice && choice.delta && choice.delta.content) {
          const assistantText = choice.delta.content
          logger.info(`Received chunk: ${assistantText}`) // Log the chunk
          // Send the chunk to the client
          res.write(`data: [CHUNK]${assistantText}`)
          fullResponse += assistantText //
          await sleepMyAIAS(100) // Simulate processing time
        }
      }
      res.write(`data: [STREAM END]`)
      res.end() //
      // log the full response
      logger.info(`Full response if any: ${fullResponse}`)
    })
    .catch((error) => {
      res.write(`data: [ERROR]${error.message}`)
      res.end() //
      logger.error(`Error in stream: ${error.message}`)
    })
}

module.exports = { askMyAIAS }

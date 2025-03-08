// Azure OpenAI
const { AzureOpenAI } = require('openai')
// logger
const { getLogger } = require('../../logger/config')
const { /* systemPrompt */ TOKEN_LIMIT } = require('../../constants/ai')
const { sleepMyAIAS } = require('../../utils/utils')
const { logger } = getLogger()
//
const askMyAIAS = async (data, res) => {
  //
  const endpoint = data.modelSettings.endpoint
  const apiKey = data.modelSettings.apiKey
  const apiVersion = data.modelSettings.apiVersion
  const deployment = data.modelSettings.deployment

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment })
  // console.log(data)
  client.chat.completions
    .create({
      model: deployment,
      max_tokens: data.modelSettings.maxTokens || TOKEN_LIMIT,
      messages: [data.systemPrompt, ...data.prompts],
      temperature: 0.7,
      stream: data.modelSettings.stream ?? true
    })
    .then(async (response) => {
      let fullResponse = '' //
      // Set headers for streaming response to the client if stream is enabled
      if (data.modelSettings.stream) {
        res.setHeader('Content-Type', 'text/event-stream') // Server-sent events
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        for await (const chunk of response) {
          //
          const choice = chunk.choices[0] //
          if (choice && choice.delta && choice.delta.content) {
            const assistantText = choice.delta.content
            if (data.modelSettings.stream) {
              // Send the chunk to the client
              res.write(`${assistantText}`)
              await sleepMyAIAS(75) // Simulate processing time
            }
            fullResponse += assistantText //
          }
        }
        res.end() // End the stream
      } else {
        // If the stream is not enabled, send the full response to the client
        fullResponse = response.choices[0].message.content
        res.status(200).json({ message: response.choices[0].message.content })
      }
      // log the full response
      logger.info(`Full response if any: ${fullResponse}`)
    })
    .catch((error) => {
      if (data.modelSettings.stream) {
        res.write(`data: [ERROR]${error.message}`)
        res.end() //
      } else {
        res.status(200).json({ error: error.message })
      }
      logger.error(`Error in stream: ${error.message}`)
    })
}

module.exports = { askMyAIAS }

import 'dotenv/config'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { Calculator } from 'langchain/tools/calculator'
import { SerpAPI } from 'langchain/tools'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'

// Compose model and available tools
const model = new ChatOpenAI({ temperature: 0 })
const tools = [
  new Calculator(),
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: 'Austin, Texas, United States',
    hl: 'en',
    gl: 'us'
  })
]

// Create agent as "chat-conversational-react-description", which by default
// already includes a buffer memory to hold the conversation history
const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: 'chat-conversational-react-description',
  verbose: true
})

// Call the agent with a question
const output = await executor.call({ input: 'What is the weather in Florianópolis, Brazil?' })
console.log(output)

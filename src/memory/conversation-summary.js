import 'dotenv/config'

import { OpenAI } from 'langchain/llms/openai'
import { ConversationSummaryMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'

import { callbacks } from '../helpers/llm.js'
import { onMessage, onResponse } from '../helpers/chat.js'
import chalk from 'chalk'

// Build memory with a specialized model to summarize the history. The temperature is zero
// to ensure the model is deterministic
const memoryModel = new OpenAI({ callbacks, temperature: 0 })
const memory = new ConversationSummaryMemory({ memoryKey: 'chat_history', llm: memoryModel })

const model = new OpenAI({ callbacks, temperature: 0.9 })
const prompt =
  PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
  Current conversation:
  {chat_history}
  Human: {input}
  AI:`)
const chain = new ConversationChain({ llm: model, memory, prompt })

onMessage(async message => {
  const { response } = await chain.call({ input: message })
  onResponse(response)
  console.log(chalk.bgBlack('[Memory]'), await memory.loadMemoryVariables({}))
})

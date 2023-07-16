import 'dotenv/config'

import { ConversationChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'

import { onMessage, onResponse } from '../helpers/chat.js'

const model = new OpenAI()
const memory = new BufferMemory()
const chain = new ConversationChain({ llm: model, memory })

onMessage(async message => {
  const { response } = await chain.call({ input: message })
  onResponse(response)
})

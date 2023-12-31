import 'dotenv/config'

import { ConversationChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'

import { onMessage, onResponse } from '../helpers/chat.js'
import { callbacks } from '../helpers/llm.js'

const model = new OpenAI({ callbacks })
const memory = new BufferMemory()
const chain = new ConversationChain({ llm: model, memory })

onMessage(async message => {
  const { response } = await chain.call({ input: message })
  onResponse(response)
})

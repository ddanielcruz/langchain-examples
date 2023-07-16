import 'dotenv/config'

import { OpenAI } from 'langchain/llms/openai'
import { BufferWindowMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'

import { callbacks } from '../helpers/llm.js'
import { onMessage, onResponse } from '../helpers/chat.js'

const model = new OpenAI({ callbacks })
const memory = new BufferWindowMemory({ k: 3 })
const chain = new ConversationChain({ llm: model, memory })

onMessage(async message => {
  const { response } = await chain.call({ input: message })
  onResponse(response)
})

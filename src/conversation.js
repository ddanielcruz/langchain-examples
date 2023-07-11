import 'dotenv/config'

import { ConversationChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'

const model = new OpenAI()
const memory = new BufferMemory()
const chain = new ConversationChain({ llm: model, memory })

const message1 = await chain.call({ input: 'Hi, my name is Daniel! I am a software engineer.' })
console.log(message1)

const message2 = await chain.call({ input: 'What do I do for a living?' })
console.log(message2)

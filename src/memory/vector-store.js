import 'dotenv/config'

import { VectorStoreRetrieverMemory } from 'langchain/memory'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAI } from 'langchain/llms/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'
import { callbacks } from '../helpers/llm.js'
import { onMessage, onResponse } from '../helpers/chat.js'

const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings())
const memory = new VectorStoreRetrieverMemory({
  memoryKey: 'history',
  vectorStoreRetriever: vectorStore.asRetriever(3)
})

// Save example information to the vector
await Promise.all([
  memory.saveContext({ input: 'My favorite food is pizza.' }, { output: 'That is good to know.' }),
  memory.saveContext({ input: 'My favorite sport is football.' }, { output: 'I love football!' }),
  memory.saveContext({ input: 'I am a software developer.' }, { output: 'I am sorry to hear that.' })
])

// Query the vector for similar information
// console.log(await memory.loadMemoryVariables({ prompt: 'What sport should I watch?' }))

const model = new OpenAI({ temperature: 0.9, callbacks })
const prompt =
  PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Relevant pieces of previous conversation:
{history}

(You do not need to use these pieces of information if not relevant)

Current conversation:
Human: {input}
AI:`)
const chain = new LLMChain({ llm: model, prompt, memory })

onMessage(async message => {
  const { text } = await chain.call({ input: message })
  onResponse(text)
})

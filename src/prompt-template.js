import 'dotenv/config'

import { LLMChain } from 'langchain/chains'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'

const model = new OpenAI({ temperature: 0.9 })
const template = 'What is a good name for a company that makes {product}?'
const prompt = new PromptTemplate({ template, inputVariables: ['product'] })
const chain = new LLMChain({ llm: model, prompt })
const result = await chain.call({ product: 'colorful socks' })
console.log(result)

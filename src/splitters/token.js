import { TokenTextSplitter } from 'langchain/text_splitter'

const text = 'My favorite color is blue and my favorite food is pizza. I like to eat pizza with my friends.'
const splitter = new TokenTextSplitter({
  encodingName: 'cl100k_base',
  chunkSize: 10,
  chunkOverlap: 0
})

const output = await splitter.createDocuments([text])
console.log(output)

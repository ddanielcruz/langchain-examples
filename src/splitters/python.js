import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const pythonCode = `def hello_world():
  print("Hello, World!")
# Call the function
hello_world()`

const splitter = RecursiveCharacterTextSplitter.fromLanguage('python', {
  chunkSize: 32,
  chunkOverlap: 0
})

const pythonOutput = await splitter.createDocuments([pythonCode])

console.log(pythonOutput)

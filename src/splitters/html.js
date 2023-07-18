import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const text = `<!DOCTYPE html>
<html>
  <head>
    <title>🦜️🔗 LangChain</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        color: darkblue;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>🦜️🔗 LangChain</h1>
      <p>⚡ Building applications with LLMs through composability ⚡</p>
    </div>
    <div>
      As an open source project in a rapidly developing field, we are extremely open to contributions.
    </div>
  </body>
</html>`

const splitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
  chunkSize: 175,
  chunkOverlap: 20
})
const output = await splitter.createDocuments([text])

console.log(output)

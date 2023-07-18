import { PDFLoader } from 'langchain/document_loaders/fs/pdf'

const loader = new PDFLoader('data/example.pdf', { splitPages: true })
const docs = await loader.load()
console.log(docs)

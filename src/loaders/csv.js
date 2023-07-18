import { CSVLoader } from 'langchain/document_loaders/fs/csv'

const loader = new CSVLoader('data/example.csv', 'text')
const docs = await loader.load()
console.log(docs)

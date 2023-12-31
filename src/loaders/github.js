import { GithubRepoLoader } from 'langchain/document_loaders/web/github'

const loader = new GithubRepoLoader('https://github.com/hwchase17/langchainjs', {
  branch: 'main',
  recursive: false,
  unknown: 'warn'
})

const docs = await loader.load()
console.log(docs)

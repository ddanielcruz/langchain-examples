import chalk from 'chalk'

/**
 * Output log usage in the console
 * @param {import('langchain/schema').LLMResult} output
 */
export function logTokenUsage({ llmOutput }) {
  try {
    if (llmOutput) {
      const usage = llmOutput.tokenUsage.totalTokens.toString()
      console.debug(chalk.magenta('[LLM]'), `Used ${chalk.bold(usage)} tokens in total`)
    }
  } catch (error) {
    console.error(error)
  }
}

export const callbacks = [{ handleLLMEnd: logTokenUsage }]

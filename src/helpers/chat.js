import chalk from 'chalk'
import readline from 'readline'

let isFirstQuestion = true

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Helper function to handle user input
 * @param {(message: string) => Promise<void>} handler
 */
export function onMessage(handler) {
  let prompt = `[User] `
  if (!isFirstQuestion) prompt = `\n${prompt}`
  else isFirstQuestion = false

  rl.question(chalk.blue(prompt), async answer => {
    await handler?.(answer)
    onMessage(handler)
  })
}

export function onResponse(response) {
  console.log(chalk.green('[Bot]'), response.trim())
}

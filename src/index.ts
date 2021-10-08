import { Command, flags } from '@oclif/command'
import { readFileSync, statSync, writeFile, writeFileSync } from 'fs'
import { DotenvParseOutput, parse } from 'dotenv'
class GenEnvExample extends Command {
  static description = 'describe the command here'
  static flags = {
    path: flags.string({
      char: 'p',
      default: '.env',
      description: 'Specify the path of the .env file',
      multiple: false,
    }),
  }
  async run() {
    const { flags } = this.parse(GenEnvExample)
    try {
      const envString = readFileSync(flags.path, {
        encoding: 'utf-8',
      })

      const parsedEnv = parse(envString)

      await this.writeEnvExample(parsedEnv)
    } catch (_err) {
      return this.error(
        'No .env file found in the root specify path using -p flag.\n gen-env-example --help '
      )
    }
  }

  async writeEnvExample(parsedEnv: DotenvParseOutput) {
    const EnvKeys = Object.keys(parsedEnv).map((keys) => `${keys}=\n`)

    writeFileSync('.env.example', `${EnvKeys.join('')}`)
  }
}

export = GenEnvExample

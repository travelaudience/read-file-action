'use strict'

const core = require('@actions/core')
const { promises: fs } = require('fs')

const main = async () => {
  const path = core.getInput('path')
  const trim = core.getBooleanInput('trim')
  const containsOctalEscapes = core.getBooleanInput('containsOctalEscapes')
  let content = await fs.readFile(path, 'utf8')
  if (trim) {
    content = content.trim()
  }
  if (containsOctalEscapes) {
    const regex = /\\[0-7]{1,3}/gm;
    content = content.replace(regex, 'OCTAL_ESCAPE')
  }

  core.setOutput('content', content)
}

main().catch(err => core.setFailed(err.message))

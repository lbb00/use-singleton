const fs = require('fs')
const zlib = require('zlib')
const { rollup } = require('rollup')
const path = require('path')
const del = require('del')
const { getAllConfigs } = require('./config')

const distDir = path.resolve(__dirname, '../dist')
const typesDir = path.resolve(__dirname, '../types')

function main () {
  del.sync(typesDir)

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir)
  }

  build(getAllConfigs())
}

function build (configs) {
  const next = async (count) => {
    if (count >= configs.length) return
    try {
      const res = await buildEntry(configs[count])
      const { code, fileName } = res.output[0]
      await new Promise((resolve, reject) => {
        function report (extra) {
          console.log(blue(fileName) + ' ' + getSize(code) + (extra || ''))
          resolve()
        }
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      })
      next(count + 1)
    } catch (e) {
      logError(e)
    }
  }
  next(0)
}

function buildEntry (config) {
  const output = JSON.parse(JSON.stringify(config.output))
  const { file } = output
  const isProd = /min\.js$/.test(file)
  return rollup(config).then((bundle) => {
    if (isProd) {
      output.banner = ''
    }
    return bundle.write(output)
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.error(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

main()

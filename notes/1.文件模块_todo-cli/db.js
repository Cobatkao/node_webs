const fs = require('fs')
const path = require('path')

const targetHome = process.env.HOME || require('os').homedir()
const todoFilePath = path.join(targetHome, '.todolist')

const db = {
    read(path = todoFilePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (err, data) => {
                if (err) return reject(err)
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (err) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = todoFilePath) {
        return new Promise((resolve, reject) => {
            const str = JSON.stringify(list)
            fs.writeFile(path, str, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
}

module.exports = db
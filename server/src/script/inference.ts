import { spawn } from 'child_process'
import crypto from 'crypto'
import fs from 'fs'


const fsPromises = fs.promises

// spawn new child process to call the python script

const scriptName = 'src/script/predict.py'
const folderName = 'cache/'

const predict = (filename: string) => {
    return new Promise((resolve, reject) => {
        
        const python = spawn('python3', [scriptName, filename]);
        // python.stdout.on('data', (data: any) => {
        //     console.log(`Python output: ${data.toString()}`)
        // })
        python.on('exit', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            if (code !== null) {
                resolve('void')
            } else {
                reject(new Error('Something error happen'))
            }
        })
    })
}

export const inference = async (jsonData: object) => {
    try {

        const jsonStr = JSON.stringify(jsonData)
        const filename = crypto.randomBytes(20).toString('hex')
        await fsPromises.writeFile(`${folderName}${filename}.json`, jsonStr)
        await predict(filename)
        const result = await fsPromises.readFile(`${folderName}${filename}.out.json`)
        const prediction = result.toString()
        return JSON.parse(prediction)
    } catch (error) {
        console.log(error)
    }
}

// const jsonData = ['powernj', 'sdfjkdslf', 'lkaj']

// inference(jsonData).then((pred) => {
//     console.log(pred)
// })


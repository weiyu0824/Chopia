const { spawn } = require('child_process');
const fs = require('fs')
 
// spawn new child process to call the python script

const scriptName = 'test.py'

const test = (filename) => {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', [scriptName, filename]);
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            if (code == 0) {
                resolve()
            } else {
                reject(new Error('Something error happen'))
            }
        })
    })
}


const fsPromises = require('fs').promises;

inference = async (jsonData) => {
    try {
        const jsonStr = JSON.stringify(jsonData)
        filenname = 'data'
        await fsPromises.writeFile(`${filenname}.json`, jsonStr)
        await test(filenname)
        const result = await fsPromises.readFile(`${filenname}.out.json`)

        return JSON.parse(result)
    } catch (error) {
        console.log(error)
    }
}

jsonData = ['powernj', 'sdfjkdslf', 'lkaj']

inference(jsonData).then((pred) => {
    console.log(pred)
})


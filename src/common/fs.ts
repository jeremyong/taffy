import fs = require('fs');
import path = require('path');

// Various node.js fs functions made suitable for async/await usage

export function readFile(file: string) {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(file, { encoding: 'utf8' }, (error, data: string) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    });
}

export function readFiles(files: string[]) {
    return files.map(readFile);
}

export function mkdir(dir: string) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function stat(dir: string) {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    })
}

export function ls(dir: string) {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(dir, { encoding: 'utf8' }, (err, files: string[]) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    })
}

export function writeFile(filepath: string, payload: string) {
    return new Promise(async (resolve, reject) => {
        await mkdir(path.dirname(filepath));
        fs.writeFile(filepath, payload, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}
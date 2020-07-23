import fs from 'fs';
import Jimp = require('jimp');

export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

export async function deleteLocalFiles(files:Array<string>, directoryPath: String){
    for( let file of files) {
        const filePath = directoryPath + '/' + file
        fs.unlinkSync(filePath); 
    }
}
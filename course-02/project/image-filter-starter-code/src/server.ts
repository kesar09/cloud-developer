import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import fs from 'fs';
import path from 'path';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/filteredimage/', async(req, res) =>{

      let {image_url} = req.query

      if(!image_url){
        res.status(404).send({"error": "Inavlid query paramter or Image Url not provided"})
      }

      if(image_url){
        let filteredpath = await filterImageFromURL(image_url)
        res.status(201).sendFile(filteredpath)
      }

      const directoryPath = path.join(__dirname, '/util/tmp')
      
      fs.readdir(directoryPath, function(err, files) {
        if (err) {

          res.status(400).send({"error messag": err})

        } else {
      
          deleteLocalFiles(files, directoryPath)
        
        }
      })
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("Please provide image Url")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
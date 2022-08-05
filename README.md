# Oh for `fs` sake...

## Overview

This is a practice project made with the end goal of posting a `.md` file to a Mongo database, and then fetch that document and display as `html` on the front end.

<br>

Topics covered include:

- Local disc storage with [Multer](https://www.npmjs.com/package/multer)
- Save large files in MongoDB as Buffers with [Mongoose](https://www.npmjs.com/package/mongoose)
- Using Node `fs` to read files and parse back to a markdown string
- Use [ShowdownJS](https://github.com/showdownjs) to convert markdown string into html string and display template in app.

### Stack

<br>

#### **Vue**

I decided to use Vue for this app because I find the templating and styling incredibly intuitional to use. It's easy to mock up a few components just to test what I was trying to accomplish on the back end.

#### **MongoDB**

Mongo has been my first database choice since the first time I tried it. I also used [Mongo Atlas](https://www.mongodb.com/atlas/database), as I have found it an incredibly easy platform to view and transform test data, as well as set up environment variables in my app.

#### **Express / Multer**

Multer is used for handling `mulitipart/form-data` in requests to the server. It adds a 'body' and 'file' or 'files' object to the request object you send to Express.

#### **ShowdownJS**

Showdown is a very cool bidirectional `markdown` to `html` converter. For the purposes of this project I only convert one way, md --> html. The server returns a markdown string of the requested file, and on the front end we display the file as html by converting with Showdown and implementing the `v-html` template syntax in Vue.

<br>

### Pain Points

When beginning this project I assumed the crux of the app would be showing a file as html in my app. However, Showdown made this incredibly easy once I was able to return a markdown string to my front end.

Instead I would say that the most difficult problem I ran into was parsing the both the data stored in my database, and the uploads that Multer stored to disk storage. In order to fetch the correct file and read, parse, and send the data I needed, it took a good amount of playing with Node's `fs.XXXX()` function, hence the name of this project, for fs sake!

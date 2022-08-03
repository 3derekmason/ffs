# Profile Avatar with Cloudinary and NodeJS

<img src="./screenshots/profile.jpg" width="600">

When building many web apps today, it has become nearly imperative to have some sort of image upload and transformation feature. The most common example I can think of is a user setting a profile picture, so today we’re going to learn the most basic method to store an image in a Cloudinary database, and retrieve that image in the form of a profile avatar ready to go.

In this mini-project, we’re going to get more familiar with:

1. Configuring Cloudinary
2. Uploading an image
3. Getting and using details of the image
4. Transforming the image

---

We’re going to be using a NodeJS server so make sure you have a recent version installed

```
npm install n
```

Now let's get started! Create the project directory and navigate inside…

```
mkdir cloudinary_node_app

cd cloudinary_node_app
```

It isn’t necessary to use Git for this project, but if you do want to, let’s initialize our repo and create a basic `.gitignore` file.

```
git init

touch .gitignore
```

<br>

##### .gitignore

```
node_modules
.env
.DS_Store
```

Before even installing cloudinary, lets hop over and [create a free account](https://cloudinary.com/users/register/free) and grab the unique API Environment Variable we’ll use to connect to our new database. Cloudinary's free tier comes with plenty of storage and transformation options for a simple app like ours.

<img src="./screenshots/freeTier.png" width="600">

When creating your account you will be able to name your cloud whatever you want.

Navigate to your new dashboard and you’ll see your cloud name, API key, and API secret. Underneath is the API Environment Variable string.

Now we can install cloudinary as well as dotenv and create a `.env` file to keep these secrets safe.

```
npm install cloudinary dotenv

touch .env
```

<br>

Lets add each of these account details to our .env file. It will look something like this, with your unique variables in place:

<br>

```
CLOUD_NAME=YOUR_CLOUD_NAME

API_KEY=YOUR_API_KEY

API_SECRET=YOUR_API_SECRET
```

<br>

Now we’re all ready to configure the connection to our cloud. Create an `index.js` file and using our .env variables we’ll set our configuration parameters.

<br>

##### index.js

```js
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Log the configuration
console.log(cloudinary.config());
```

Now try running `node index.js` and you should see your environment variables.

---

Next let’s make a function to upload an image to our cloud.

<br>

##### index.js

```js
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // return the created id of image in cloud
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
```

> In this function Cloudinary is using it’s own [method to upload assets to the cloud](https://cloudinary.com/documentation/image_upload_api_reference).

<br>

Next we can write a function that will transform our uploaded image into an html `<img>` tag. We’ll also implement some of Cloudinary’s really cool built in options to change our image into a circular thumbnail crop of the image focused on the faces

<br>

##### index.js

```js
// takes in id of image/asset
const createImageTag = (publicId) => {
  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
    ],
  });

  return imageTag;
};
```

> To return only the image URL, not as an image tag, replace `cloudinary.image` with `cloudinary.url`

---

And now we’ll write an anonymous function to bring it all together; upload an image, get info from that image, transform the image, and return an html tag we can use. For this example, I'm just using a random photo from [Unsplash](https://unsplash.com).

The entire `index.js` file now looks like this:

```js
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const createImageTag = (publicId, ...colors) => {
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
    ],
  });

  return imageTag;
};

(async () => {
  // Set the image to upload
  const imagePath = "https://source.unsplash.com/QDq3YliZg48";
  // Upload the image
  const publicId = await uploadImage(imagePath);
  // Create an image tag, using transformation
  const imageTag = await createImageTag(publicId);
  // Log the image tag to the console
  console.log(imageTag);
})();
```

Now run `node index.js` again and we should get an image tag logged in return!

```
<img src='https://res.cloudinary.com/sadies-gym/image/upload/c_thumb,g_faces,h_250,w_250/r_max/aeinwvr5ds2zthl0xysr' />
```

---

To check our image tag let’s create a bare bones index.html to show a before and after with our returned string included with the original:

<br>

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cloudinary Image Avatar</title>
  </head>
  <body>
    <header><h2>Before and after:</h2></header>
    <main>
      <img src="https://source.unsplash.com/QDq3YliZg48" width="250" />
      <img
        src="https://res.cloudinary.com/sadies-gym/image/upload/c_thumb,g_faces,h_250,w_250/r_max/aeinwvr5ds2zthl0xysr"
      />
    </main>
  </body>
</html>
```

Open in the browser...

<img src="./screenshots/beforeAndAfter.png" width="600">

And viola! We have successfully retrieved our image trimmed and ready to be used as an avatar.

---

I hope that this mini project has given you a bit of an understanding of how to get started with cloudinary, as well as given you ideas of how you can implement the features we used today in your own exciting applications. Thank you for reading!

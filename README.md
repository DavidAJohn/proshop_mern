# ProShop eCommerce Platform

![proshop_mern_screenshot](https://user-images.githubusercontent.com/1767554/108134407-14c4e300-70ae-11eb-9b4b-da05c6a5d09c.png)


## Origins

The core of this application was built while completing the [Udemy](https://www.udemy.com) course [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) by Brad Traversy.

As the course name indicates, it was built using a **M**ongoDB database, **E**xpress as the API, using the **R**eact framework and **N**odeJS.

A live version of the application incorporating my additional features and fixes (listed below) can be seen running [here](https://proshop-daj.herokuapp.com/).

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with order history
- Admin product management
- Admin user management
- Admin order details page
- Checkout process (shipping, payment method, etc)
- PayPal payment integration
- Database seeder (products & users)

## Additional Features/Fixes

I have also made a number of improvements/fixes to the base application:

- Optional product image upload to Cloudinary ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/88290276f903513b4bdf5c89354db3de7b9f3b0b) and [this commit](https://github.com/DavidAJohn/proshop_mern/commit/a5d3e954bb872a9e545143ec7969c963f103dbc8))
- Improved search functionality also allows searching in the product description, rather than just the name ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/c53cca8131b96bf1ef8055233df36affa31d5bc8))
- Products are no longer completely deleted, but de-activated/re-activated to preserve order integrity ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/006cc80a3d0b6b0d800778814509f4f39fb1eb3f))
- Modal dialogs from react-bootstrap are used instead of vanilla JavaScript alerts ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/cd86261a24e6d02dd225f7e16644de14ac7bb2a7) and [this commit](https://github.com/DavidAJohn/proshop_mern/commit/f8e9cb7eaba586cb24eb3115ce6b7cdaeda92922))
- Improved pagination with details of total items ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/4fb1ed02e0001fc81ab68f576adc5f36c573abea))
- The user's cart is correctly emptied after placing an order ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/93fad4d725214df611d2605cea7137f9fcdf09e0))
- Improved initial data seeding options - admin password is now seeded from your .env file ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/ad56da3d8e7ea4e80f9fdd6d4d274aacbdb79ce1))
- Improved the cost calculations and currency formatting on the order screen ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/bdea58ec5c1ed86b8b30158a29a166e3a75fa0a7))
- All dates are formatted correctly based on a specified region ([View this commit](https://github.com/DavidAJohn/proshop_mern/commit/d764ae6ca49ea201509d807f44e21de4bdb8817e))

## Usage

### MongoDb database

You will (of course) need a MongoDb database. I would strongly recommend creating an Atlas database at [mongodb.com](https://www.mongodb.com/cloud/atlas), but you could also install MongoDb locally.

### ES Modules in Node

ES Modules are used in the backend of this project. Be sure to have at least Node v14.6+ installed


### Environment Variables

Either rename the 'env.example' file to '.env' or create a new .env file in the root directory and add the following:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://username:password@cluster0-jtpxd.mongodb.net/dbname
JWT_SECRET_KEY = your_jwt_secret_key
PAYPAL_CLIENT_ID = your_paypal_client_id
ADMIN_PASSWORD = your_admin_password
```

To enable image uploads to Cloudinary, you should also add:

```
CLOUD_NAME = your_cloudinary_cloud_name
CLOUD_API_KEY = your_cloudinary_api_key
CLOUD_API_SECRET = your_cloudinary_api_secret
```

If the Cloudinary variables are omitted, files will just be uploaded to a local 'uploads' folder instead.


### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed or reset the database with some sample users and products as well as destroy all data

```
# Creates sample data with users and products, to start your development work
npm run data:import

# Deletes all data
npm run data:destroy

# Set up a fresh production database, with no orders, just products and an admin user
npm run data:production

# Removes users and orders, but leaves products in tact and creates new admin user
npm run data:production-user
```
For further explanation, see the backend/seeder.js file

### Sample user logins for development created by running 'npm run data:import':

```
username: admin@example.com (Admin)
password: (from your .env file)

username: david@example.com (Customer)
password: 123456

username: mark@example.com (Customer)
password: 123456
```

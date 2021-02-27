# ProShop eCommerce Platform

![proshop_mern_screenshot](https://user-images.githubusercontent.com/1767554/108134407-14c4e300-70ae-11eb-9b4b-da05c6a5d09c.png)


## Origins

The core of this application was built while completing the [Udemy](https://www.udemy.com) course [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) by Brad Traversy.

As the course name indicates, it was built using a **M**ongoDB database, **E**xpress as the API, using the **R**eact framework and **N**odeJS.

A live version of the application (with my additional features and fixes) can be seen running [here](https://proshop-daj.herokuapp.com/)

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

- Optional product image upload to Cloudinary
- Improved search functionality also allows searching in the product description, rather than just the name
- Products are no longer completely deleted, but de-activated/re-activated to preserve order integrity
- Modal dialogs from react-bootstrap are used instead of vanilla JavaScript alerts
- Improved pagination with details of total items
- The user's cart is correctly emptied after placing an order
- Improved initial data seeding options - admin password is seeded from your .env file
- Additional details are displayed on the order screen
- All dates are formatted correctly based on a specified region

## Usage

### MongoDb database

You will (of course) need a MongoDb database. I would strongly recommend creating an Atlas database at mongodb.com, but you could also install MongoDb locally.

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

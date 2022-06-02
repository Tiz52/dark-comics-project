<h1 align="center">Ecommerce made with Next.js</h1>

<br />
<p align="center">
  <a href="https://github.com/Tiz52/Dark-Comics-Project">
    <img src="https://res.cloudinary.com/tiz52/image/upload/v1654130212/z9z2b6kf5bseqacjg2ei.jpg" alt="Header photo" >
  </a>
  <h3 align="center">E-Commerce Website</h3>
</p>

> This project was made to show a full ecommerce plataform using Next.js and Nextjs Serverless functions to build the backend and Mongo DB for the database.

---
# :eyes: Demo Website
👉  demo: https://quantum-ecommerce.now.sh/

# :computer: Technologies
This project was made using the follow technologies:

* [Next.js](https://nextjs.org/) - To SSR and routes control     
* [Tailwind](https://tailwindcss.com/) - To style the website   
* [React-Hook-Form](https://react-hook-form.com/) - To handle forms   
* [Context-Api](https://es.reactjs.org/docs/context.html) - To handle context 
* [MongoDB](https://www.mongodb.com/) - To store the data 
* [Mongoose](https://mongoosejs.com/) - To object modeling and validation
* [SWR](https://swr.vercel.app/es-ES) - To fetch the data from the API 
* [NextAuth](https://next-auth.js.org/) - To authentication and authorization   
* [Vercel](https://vercel.com/) - To deploy website     

# :rocket: Features

- Authentication with Cookies Sessions.
- List Comics and Comics Details.
- Filter Comics by Publisher and Character.
- Sort list of Comics by Title, Price and Date.
- Live search
- Add Comics to Cart
- Checkout page
- Payment with Paypal
- Role-based Permission (only administrators can add and edit new comics).
- Authentication service using Next Auth and Next js middleware.
- Serverless functions to build the backend and database.
- Manage Comics
- Manage Users
- Manage Publishers
- Manage Characters
- Deployed on Vercel.
  
# :construction_worker: How to run
**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then:**

### Rename env file
Rename __.env.template__ a __.env__
### Install Dependencies
```bash
yarn install
```
### Set up database
For running locally, you will need a database
```
docker-compose up -d
```

* Use -d, to __detached__

* MongoDB URL:
```
mongodb://localhost:27017/darkcomicsdb
```
## For running locally, you will need to execute database

Call the following command:
```
		https://localhost:3000/api/seed
```

### Run Aplication
```bash 
yarn dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
<br>
<br>
---

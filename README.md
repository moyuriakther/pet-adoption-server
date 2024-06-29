npx tsc --init# l2-b2-fullstack-track-assignment-8-moyuriakther

## Pet Adoption Platform

## live URL: https://pet-adoption-three.vercel.app

## Github Link: https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-moyuriakther

## Demo Video Link: https://drive.google.com/file/d/1rZhOTudq9LL1FGeR0NJ32-5tUicmwPp9/view?usp=sharing

## Postman api documentation: https://documenter.getpostman.com/view/25490019/2sA35G4NLC

## Features:

### User Registration and Authentication:

- Users can register with their name, email, and password.
- Users can log in using their email and password Upon successful login, users receive a JWT token for authentication.
- Users can view their profile information, including name, email, creation date, and last update date.
- Users can update their profile information, including name and email.

### Pet Management:

- Authenticated users can add new pets with details such as name, species, breed, age, size, location, description, temperament, medical history, and adoption requirements.
- Users can update pet profiles, including details like location, description, and adoption requirements.

### Adoption Requests:

- Authenticated users can submit adoption requests for pets.
- Each adoption request includes the user's pet ownership experience.
- Users can view all adoption requests they've submitted.
- Users(because there is no other role) can update the status of adoption requests Approved or Rejected

## Technology Used:

- Programming Language: TypeScript
- Web Framework: Express.js
- Object Relational Mapping (ORM): Prisma with PostgreSQL
- Authentication: JWT (JSON Web Tokens)

## To Run Locally

- git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-moyuriakther
- cd pet-adoption-platform
- yarn add
- Set DATABASE_URL, JWT_SECRET and Others env information
- yarn dev
- npx prisma studio for prisma studio

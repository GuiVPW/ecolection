<h1 align="center">
    <img alt="Ecoleta" title="Ecoleta" src="doc/ecoleta.svg" width="220px" />
</h1>

## 🚀 Technologies

This project was developed using the following technologies:
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [Prisma Io](https://www.prisma.io/)

## 💻 Project

The Ecollection is a marketplace that helps people to find wast collection points in a very intuitive and efficient way.

## 🤔 How to execute

- Clone this Repository
- Run `yarn install` in frontend & backend directories

**Backend**:
- In the backend directory, run the *docker-compose* file
- Create a .env file inside prisma directory, add the key DATABASE_URL with the url of your database
  - Ex: `DATABASE_URL="postgresql://postgres:postgres@localhost:5434/ecolection?schema=public"`
- Run `yarn migrate:generate` to create the database and create migrations and seeds
  - Optional: Run `yarn studio` to open a *GUI* of the database you just created

- Run `yarn dev` or `yarn start` to run the Express and GraphQL servers ✔️
- Optional: Run `yarn test:unit` to run all the .spec tests

**Frontend:**
- In the frontend directory, change the [constants variables if needed](frontend/src/constants)
- Run the project with `yarn start` ✔️

## 👀Mobile to come soon 

Based on [Rocketseat](https://rocketseat.com.br/) project: **Ecoleta** ♻️

Made by [Guilherme Vieira](https://github.com/GuiVPW) ❤️

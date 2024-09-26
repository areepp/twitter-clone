Basically twitter, but way worse. Unfinished, a lot of room for improvement.

### Tech Stack
Frontend
- Nextjs

Backend
- Expressjs
- PostreSQL with Prisma ORM
- Passportjs for authentication


<div align="center">
  <kbd>
    <img src="https://github.com/user-attachments/assets/a7b21b28-cfc4-48cf-9cd0-c4d8020533b7" />
  </kbd>
  <kbd>
    <img src="https://github.com/user-attachments/assets/0429f755-8642-4d82-8568-a809c5788f50" />
  </kbd>
  <kbd>
    <img src="https://github.com/user-attachments/assets/86cd53f1-6c25-41b9-8bef-bd0429a9b403" />
  </kbd>
  <kbd>
    <img src="https://github.com/user-attachments/assets/779ad385-e64a-4ef9-a45d-ff85ea68f54b" />
  </kbd>
</div>

### How to run this project locally
Frontend
- cd into frontend folder and run `yarn install`
- run `yarn dev`

Backend
- cd into backend folder and run `yarn install`
- run  `docker-compose up` (make sure you have docker installed on your computer)
- make sure you've already set the env variables to the correct value. Please refer to the .env.example in the backend folder
- run `npx prisma generate`
- run `npx prisma db push`
- run `yarn dev`

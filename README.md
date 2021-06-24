# Messenger

A one-to-one realtime chat app.

## Running Application Locally

```
psql
CREATE  DATABASE messenger;
\q

cd server
npm install

// seed the database
npm run seed

npm run dev
```

Create a .env file in the server directory and add your session secret

```
SESSION_SECRET = "your session secret"
```

# Screenshot for Issue 5

new signin page

![Sign in full size](./screenshot/LoginFull.jpg)

mobile display

![Sign in Mob](screenshot/LoginMob.jpg)

signup page

![Sign up full size](./screenshot/SignupFull.jpg)

![Sign up full size](./screenshot/SignupMob.jpg)

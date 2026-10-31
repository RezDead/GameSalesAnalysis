# Game Sales Analysis Tool
## Description
This repository is for a video game sales analysis tool comprising of information from 3 static databases.

It was created for CSCI 370: Introduction to Databases as a group project.

## Needed Software
- Postgres SQL
- pgAdmin 4
- Docker

## How to use

### For DB:

Create/Load into DB in pgAdmin 4

- DB Name: course_db
- User: course_user
- Pass: course_password
- Port: "5432:5432" (if needed to change, change in docker compose and reload)

### For Container:

Ensure the docker container is built and running.

From root all you need to do is:

`docker compose up -d --build`

Once it has been built all that needs to be done in the future is:

`docker compose up -d`

or

`docker compose down -d`

### To Upload DB State:

Ensure Docker container is running

`docker compose up -d`

Run the export script then add DB dump (from root)

```
docker compose exec postgres bash /internal-scripts/export-db.sh
git add .\database\current.dump
```

### To Import DB State:

Ensure Docker container is running

`docker compose up -d`

Run the import script (from root)

`docker compose exec -it postgres bash /internal-scripts/import-db.sh`

## Credits

- Julian Kroeger-Miller
- Kaiya Hatashita
- Uriel Gonzalez

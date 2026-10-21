# Game Sales Analysis Tool
## Description
This repository is for a video game sales analysis tool comprising of information from 3 static databases.

It was created for CSCI 370: Introduction to Databases as a group project.

## Needed Software
- Postgres SQL
- pgAdmin 4
- Docker

## How to use

### To Load:

```
docker compose down -v
docker compose up -d
```

### For DB:

Create/Load into DB in pgAdmin 4

DB Name: course_db
User: course_user
Pass: course_password
Port: "5432:5432" (if needed to change, change in docker compose and reload)

### To Upload DB State:

```
docker exec -t course-postgres pg_dump -U course_user course_db > ./db-init/latest_state.sql
git add db-init/latest_state.sql
```

This converts DB State to an SQL file and adds it to the commit.

## Credits

- Julian Kroeger-Miller
- Kaiya Hatashita
- Uriel Gonzalez

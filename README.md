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

### To Upload DB State:

Ensure Docker container is running

```
docker compose up -d
````

Run the export script then add DB dump (from root)

```
.\database\export-dn.ps1
git add .\database\current.dump
```

### To Import DB State:

Ensure Docker container is running

```
docker compose up -d
```

Run the import script (from root)

```
.\database\export-dn.ps1
```

## Credits

- Julian Kroeger-Miller
- Kaiya Hatashita
- Uriel Gonzalez

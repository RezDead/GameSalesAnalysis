Write-Host "Copying database dump into PostgreSQL container..."

docker compose cp `
    database/current.dump `
    postgres:/tmp/current.dump

Write-Host "Dropping existing database..."

docker compose exec postgres `
    dropdb `
    -U course_user `
    --if-exists `
    course_db

Write-Host "Creating clean database..."

docker compose exec postgres `
    createdb `
    -U course_user `
    course_db

Write-Host "Restoring database..."

docker compose exec postgres `
    pg_restore `
    -U course_user `
    -d course_db `
    /tmp/current.dump

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database restore complete."
}
else {
    Write-Host "Database restore failed."
    exit 1
}
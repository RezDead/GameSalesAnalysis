Write-Host "Exporting PostgreSQL database..."

docker compose exec -T postgres pg_dump `
    -U course_user `
    -d course_db `
    -F c `
    > database/current.dump

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database exported to database/current.dump"
}
else {
    Write-Host "Database export failed."
    exit 1
}
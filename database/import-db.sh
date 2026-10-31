#!/bin/bash
echo "WARNING: This will drop and reconstruct the course_db database!"
read -p "Are you sure you want to proceed? (y/N): " confirm

confirm=$(echo "$confirm" | tr '[:upper:]' '[:lower:]')

if [[ "$confirm" == "y" || "$confirm" == "yes" ]]; then
    echo "Proceeding with database import"
    
    echo "Dropping existing database..."
    dropdb -U course_user --if-exists course_db
    
    echo "Creating clean database..."
    createdb -U course_user course_db
    
    echo "Restoring database..."
    pg_restore -U course_user -d course_db -F c -v /backups/latest_state.dump

    if [ $? -eq 0 ]; then
        echo "Database restore complete. Status: SUCCESS"
    else
        echo "Database restore encountered an error. Status: FAILED"
        exit 1
    fi
else
    echo "Import aborted by user."
fi

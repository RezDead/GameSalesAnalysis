#!/bin/bash
echo "Exporting database snapshot inside container..."
pg_dump -U course_user -d course_db -F c -f /backups/latest_state.dump

if [ $? -eq 0 ]; then
    echo "Success: Saved locally to database/latest_state.dump"
else
    echo "Database export failed."
    exit 1
fi
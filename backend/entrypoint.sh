#!/bin/sh
# entrypoint.sh
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for PostgreSQL..."
  sleep 1
done
echo "PostgreSQL is up - executing commands"
npm run migrate
npm run seed
exec npm start
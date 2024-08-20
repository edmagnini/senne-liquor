#!/bin/sh
# entrypoint.sh

db_initialized() {

  knex migrate:currentVersion --knexfile /usr/app/knexfile.js 2>/dev/null
}

until nc -z -v -w30 postgres 5432
do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

echo "PostgreSQL is up - checking if database is initialized"

if ! db_initialized; then
  echo "Database not initialized - running migrations and seeding"
  npm run migrate
  npm run seed
else
  echo "Database already initialized - skipping migrations and seeding"
fi

exec npm start

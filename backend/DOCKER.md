# Running with Docker

docker compose up --build
docker compose exec app php artisan migrate

When using Docker, set DB_HOST=db and DB_PASSWORD=secret in .env.
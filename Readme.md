TO run the app

1. Install docker
2. Run 'docker-compose up --build'
3. On the backend folder, create an .env file and set the database credential stated on docker-compose.yml and run 'php artisan serve'
    3.a Database Crendentials
        DB_CONNECTION=pgsql
        DB_HOST=127.0.0.1
        DB_PORT=5432
        DB_DATABASE=postgres
        DB_USERNAME=root
        DB_PASSWORD=S3cret
4. On the frontend folder, create an .env file and set the the NEXT_PUBLIC_API_URL to http://localhost:8080. Run npm run dev
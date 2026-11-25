# server container creation.
docker run -p 5050:5050 --env-file config.env --name server server:v1
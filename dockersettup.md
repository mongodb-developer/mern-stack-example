# server container creation.
docker run -p 5050:5050 --env-file config.env --name opt-server multistage_server:v1
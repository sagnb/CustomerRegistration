docker stop api-customer
docker stop nginx-customer
docker stop mongo-customer

docker rm api-customer
docker rm nginx-customer
docker rm mongo-customer
docker rm spa-customer

docker rmi customerregistration-nginx-customer
docker rmi customerregistration-api-customer
docker rmi customerregistration-spa-customer
docker rmi mongo:latest

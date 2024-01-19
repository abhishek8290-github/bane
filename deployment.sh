
docker build --platform linux/amd64 -t baneapp . 

docker tag baneapp asia-south1-docker.pkg.dev/elevated-dynamo-2024/bane-prod/bane

docker push asia-south1-docker.pkg.dev/elevated-dynamo-2024/bane-prod/bane

cd deployment 

helm delete my-release

helm install my-release bane-1.0.0.tgz

# kubectl port-forward services/bane 3000:3000 

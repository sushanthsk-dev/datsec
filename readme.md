# Get the pods
kubectl get pods

# Get the services
kubectl get services

# KUBECTL DELETE DEPLOYMENTS
kubectl delete deployments datsec-app
kubectl delete services datsec-service

# To apply config related to deplyoment and service
kubectl apply -f deployment.yaml

# To start the dashboard
minikube dashboard

# To start the service 
minikube service datsec-service

# To get the logs of application
kubectl logs podName

# https://kubernetes.io/docs/reference/kubectl/cheatsheet/


https://medium.com/swlh/how-to-run-locally-built-docker-images-in-kubernetes-b28fbc32cc1d


To get the port 
minikube service datsec-service --url
# Build

    export VIEW_VERSION=1
    docker build -t houseofmoran/baton-view:$VIEW_VERSION .
    docker push houseofmoran/baton-view:$VIEW_VERSION
    
# Deploy (to existing kubernetes cluster)

## One-off

    kubectl apply -f ../k8s/namespace.yaml
    kubectl apply -f ../k8s/ingress.yaml
    kubectl apply -f k8s/service.yaml

## Each time

    kubectl apply -f k8s/deployment.yaml
    
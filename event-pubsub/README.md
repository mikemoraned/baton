# Build

    export PUBSUB_VERSION=1
    docker build -t houseofmoran/event-pubsub:$PUBSUB_VERSION .
    docker push houseofmoran/event-pubsub:$PUBSUB_VERSION
    
# Deploy (to existing kubernetes cluster)

## One-off

    kubectl apply -f ../k8s/namespace.yaml
    kubectl apply -f ../k8s/ingress.yaml
    kubectl apply -f k8s/service.yaml

## Each time

    kubectl apply -f k8s/deployment.yaml
    
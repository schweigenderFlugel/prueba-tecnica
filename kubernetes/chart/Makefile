.PHONY create_minikube_cluster install_app delete_minikube_cluster

create_docker_registry:
  if docker ps | grep -q 'local-registry'; \
  then echo "---> local-registry already created; skipping"; \
  else docker run --name local-registry -d --restart=always -p 5000:5000 registry:2; \
  fi

run_website:
  docker run --name csvtopdf.com -p 3000:3000 -d schweigenderflugel/csv-to-pdf

stop_website:
  docker stop csvtopdf.com && \
    docker 

create_minikube_cluster:
  minikube start --driver=docker

delete_minikube_cluster:
  minikube delete

install_app:
  helm upgrade --atomic --install csv-to-pdf-website ./chart
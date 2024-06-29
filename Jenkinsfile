pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    HEROKU_API_KEY = credentials('heroku-api-key')
    APP_NAME = 'jenkins-example-react'
    DOCKER_HUB_TOKEN = credentials('docker-token')
    DOCKER_REPO = 'sagar2233/docker-repo'
    DOCKER_TAG = 'tagname'
  }
  stages {
    stage('Build and Push Docker Image') {
      steps {
        script {
          // Authenticate with Docker Hub
          sh "echo ${DOCKER_HUB_TOKEN} | docker login -u sagar2233 --password-stdin"

          // Build and tag Docker image
          sh "docker build -t ${DOCKER_REPO}:${DOCKER_TAG} ."

          // Push Docker image to Docker Hub
          sh "docker push ${DOCKER_REPO}:${DOCKER_TAG}"
        }
      }
    }
    stage('Push to Heroku registry') {
      steps {
        sh '''
          docker tag $DOCKER_REPO:$DOCKER_TAG registry.heroku.com/$APP_NAME/web
          docker push registry.heroku.com/$APP_NAME/web
        '''
      }
    }
    stage('Release the image') {
      steps {
        sh '''
          heroku container:release web --app=$APP_NAME
        '''
      }
    }
  }
  post {
    always {
      // Logout from Docker Hub
      sh 'docker logout'
    }
  }
}
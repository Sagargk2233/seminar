pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    HEROKU_API_KEY = credentials('heroku-api-key')
    IMAGE_NAME = 'darinpope/jenkins-example-react'
    IMAGE_TAG = 'latest'
    APP_NAME = 'jenkins-example-react'
  }
  stages {
    stage('Build') {
      steps {
        echo 'Building Docker Image...'
        powershell '''docker build -t $IMAGE_NAME:$IMAGE_TAG .'''
      }
    }
    stage('Login') {
      steps {
        echo 'Logging in to Heroku Docker registry...'
        powershell '''echo $HEROKU_API_KEY | docker login --username=_ --password-stdin registry.heroku.com'''
      }
    }
    stage('Push to Heroku registry') {
      steps {
        echo 'Tagging and pushing Docker image to Heroku registry...'
        powershell '''
          docker tag $IMAGE_NAME:$IMAGE_TAG registry.heroku.com/$APP_NAME/web
          docker push registry.heroku.com/$APP_NAME/web
        '''
      }
    }
    stage('Release the image') {
      steps {
        echo 'Releasing the Docker image on Heroku...'
        powershell '''
          heroku container:release web --app=$APP_NAME
        '''
      }
    }
  }
  post {
    always {
      echo 'Logging out from Docker registry...'
      powershell 'docker logout'
    }
  }
}
pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    HEROKU_API_KEY = credentials('heroku-api-key')
    APP_NAME = 'react-new-portfolio'
  }
  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install'
      }
    }
    stage('Build') {
      steps {
        echo 'Building the application...'
        bat 'npm run build'
      }
    }
    stage('Deploy to Heroku') {
      steps {
        echo 'Deploying to Heroku...'
        withCredentials([string(credentialsId: 'heroku-api-key', variable: 'HEROKU_API_KEY')]) {
           script {
            bat """
              heroku login --credentials $HEROKU_API_KEY
              heroku buildpack:set https://github.com/Sagargk2233/seminar.git
              heroku deploy --app $APP_NAME
              @echo off
              echo $HEROKU_API_KEY | heroku auth:token --interactive
              heroku git:remote -a $APP_NAME
              git init
              git config user.email "chauhansagargk@gmail.com"
              git config user.name "Sagargk2233"
              git add .
              git commit -m "Deploy to Heroku" || echo "No changes to commit"
              git push -f heroku HEAD:main
            """
          }
        }
      }
    }
  }
  post {
    always {
      echo 'Cleaning up workspace...'
      deleteDir()
    }
  }
}
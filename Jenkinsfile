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
            def branch = bat(script: 'git symbolic-ref --short HEAD', returnStdout: true).trim()
            bat """
              git init
              git config user.email "chauhansagargk@gmail.com"
              git config user.name "Sagargk2233"
              git remote add heroku https://github.com/Sagargk2233/seminar.git
              git add .
              git commit -m "Deploy to Heroku"
              git push -f heroku $branch:main
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
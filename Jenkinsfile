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
              echo '// apiKey: (redacted)' > credentials/api_key
              sh 'heroku login --credentials $HEROKU_API_KEY'
              sh 'heroku buildpack:set https://github.com/Sagargk2233/seminar.git'
              sh 'heroku deploy --app $APP_NAME'
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
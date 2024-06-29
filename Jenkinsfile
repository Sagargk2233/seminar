pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
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
        bat """
          heroku login
          heroku buildpacks:set https://github.com/Sagargk2233/seminar.git
          git init
          git add .
          git commit -m "Deploy to Heroku"
          heroku git:remote -a $HEROKU_APP_NAME
          git push heroku HEAD:main
        """
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
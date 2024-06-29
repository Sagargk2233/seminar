pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    HEROKU_API_KEY = credentials('heroku-api-key')
    HEROKU_EMAIL = 'chauhansagargk@gmail.com'
    APP_NAME = 'react-new-portfolio'
  }
  stages {
    stage('Checkout') {
      steps {
        echo 'Checking out the code...'
        checkout scm
      }
    }
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
            // bat "echo $HEROKU_API_KEY | heroku auth:token"

            bat """
              echo machine api.heroku.com > "%USERPROFILE%\\.netrc"
              echo login %HEROKU_EMAIL% >> "%USERPROFILE%\\.netrc"
              echo password %HEROKU_API_KEY% >> "%USERPROFILE%\\.netrc"
              echo machine git.heroku.com >> "%USERPROFILE%\\.netrc"
              echo login %HEROKU_EMAIL% >> "%USERPROFILE%\\.netrc"
              echo password %HEROKU_API_KEY% >> "%USERPROFILE%\\.netrc"

              git init
              git config user.email "chauhansagargk@gmail.com"
              git config user.name "Sagargk2233"
              git add .
              git commit -m "Deploy to Heroku" || echo "No changes to commit"
              heroku buildpacks:set heroku/nodejs
              heroku git:remote -a $APP_NAME
              git push heroku main
            """
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
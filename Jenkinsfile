pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token') 
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Sagargk2233/seminar.git' 
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to Netlify') {
            steps {
                sh 'npm install -g netlify-cli'
                sh 'netlify deploy --prod --dir=build'
            }
        }
    }
}

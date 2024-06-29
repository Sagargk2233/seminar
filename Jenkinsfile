pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token') 
        PATH = "C:\\Users\\Asus\\AppData\\Roaming\\npm;${env.PATH}"
        NETLIFY_SITE_ID = 'ad389229-c18b-446c-b8ac-8e9a33d79092' // Replace 'your-site-id' with the actual site ID from Netlify
    }

    stages {
        stage('Checkout') {
            steps {
                 git branch: 'main', url: 'https://github.com/Sagargk2233/seminar.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy to Netlify') {
            steps {
                bat 'netlify deploy --prod --dir=build --site=$NETLIFY_SITE_ID'
            }
        }
    }
}

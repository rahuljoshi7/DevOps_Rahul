pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t devops-app .'
                    } else {
                        bat 'docker build -t devops-app .'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        docker-compose -p devops-app down || true
                        docker-compose -p devops-app up -d --build
                        '''
                    } else {
                        bat '''
                        docker-compose -p devops-app down || exit 0
                        docker-compose -p devops-app up -d --build
                        '''
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker ps'
                    } else {
                        bat 'docker ps'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS ✅'
        }
        failure {
            echo 'FAILED ❌'
        }
        always {
            cleanWs()
        }
    }
}

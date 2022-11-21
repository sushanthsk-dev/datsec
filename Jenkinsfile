pipeline {
    agent any
    stages{
        stage('Build NPM'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/sushanthsk-dev/datsec']]])
                sh 'npm install'
            }
        }
        stage('Build docker image'){
            steps{
                    sh 'docker build -t sushanthsk/datsec-webapp .'
            }
        }
        stage('Push image to Hub'){
            steps{
                script {
                   withCredentials([string(credentialsId: 'dockerpwd', variable: 'docker_pwd')]) {
                   sh 'docker login -u sushanthsk -p ${docker_pwd}'
                    }
                   sh 'docker push sushanthsk/datsec-webapp'
                }
            }
        }
        stage('Deploy to K8') {
            steps{
                script {
                    kubernetesDeploy (configs: 'deployment.yaml', kubeconfigId: 'k8configpwd')
                }
            }
        }
    }
}
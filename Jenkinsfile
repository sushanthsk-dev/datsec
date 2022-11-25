pipeline {
    agent any
    stages{
        stage('Init'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/sushanthsk-dev/datsec']]])
            }
        }
        stage("Build") {
            steps{
                sh "echo '--- Installing node modules ----'"
                sh "npm install"
                sh "echo '--- Sonarcube Analysis --------'"
                withSonarQubeEnv("SonarScanner"){
                    sh "npm install sonar-scanner"
                    sh "npm run sonar"
                }
            }
        }
        stage('Build docker image'){
            steps{
                    sh 'docker build -t sushanthsk/datsec-app:v1 .'
            }

            post{
                success{
                    script{
                        env.build = "success"
                    }
                }
            }
        }
        stage('Push image to docker Hub'){
            when{
                expression{
                    env.build == "success"
                }
            }
            steps{
                script {
                  withCredentials([string(credentialsId: 'dockerpwd', variable: 'docker_pwd')]) {
                  sh 'docker login -u sushanthsk -p ${docker_pwd}'
                    }
                  sh 'docker push sushanthsk/datsec-app:v1'
                }
            }
        }
        stage('Deploy to K8') {
            when{
                expression{
                    env.build == "success"
                }
            }
            input{
                message "Do you want to proceed for production deployment?"
            }
            steps{
                script {
                    kubernetesDeploy (configs: 'deployment.yaml', kubeconfigId: 'k8configpwd')
                    sh 'kubectl rollout restart deployment datsec-app'
                }
            }
        }
    }
        post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
            }
        }
}
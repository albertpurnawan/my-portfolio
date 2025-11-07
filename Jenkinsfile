pipeline {
  agent {
    docker {
      image 'node:20'
      // Mount host Docker socket to build and run Docker from within the agent container
      args '-v /var/run/docker.sock:/var/run/docker.sock'
      reuseNode true
    }
  }
  options {
    timestamps()
    ansiColor('xterm')
  }
  parameters {
    string(name: 'REGISTRY_REPO', defaultValue: 'my-portfolio', description: 'Docker registry repo, e.g. username/my-portfolio')
    string(name: 'DOCKER_CREDENTIALS_ID', defaultValue: 'dockerhub-credentials', description: 'Jenkins credentials ID for Docker registry')
    choice(name: 'TARGET_ENV', choices: ['auto', 'staging', 'production', 'none'], description: 'Deployment environment selection')
    // Staging deployment
    string(name: 'DEPLOY_HOST_STAGING', defaultValue: '', description: 'Staging host (SSH reachable)')
    string(name: 'STAGING_DOCKER_PORT', defaultValue: '8081', description: 'Staging host port (maps to container 80)')
    // Production deployment
    string(name: 'DEPLOY_HOST_PROD', defaultValue: '', description: 'Production host (SSH reachable)')
    string(name: 'PROD_DOCKER_PORT', defaultValue: '8080', description: 'Production host port (maps to container 80)')
    // Common SSH
    string(name: 'DEPLOY_USER', defaultValue: 'root', description: 'SSH user on target host(s)')
    string(name: 'SSH_CREDENTIALS_ID', defaultValue: 'deploy-ssh-key', description: 'Jenkins SSH credentials ID for deployment')
  }
  environment {
    IMAGE = "${REGISTRY_REPO}"
    COMMIT = "${env.GIT_COMMIT}"
  }
  stages {
    stage('Prepare tools') {
      steps {
        sh '''
          set -euxo pipefail
          apt-get update
          apt-get install -y --no-install-recommends docker.io openssh-client ca-certificates
          docker version
          ssh -V || true
          node -v && npm -v
        '''
      }
    }
    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.SHORT_SHA = env.GIT_COMMIT ? env.GIT_COMMIT.take(7) : 'dev'
          env.BRANCH = env.BRANCH_NAME ?: sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
          echo "Branch: ${env.BRANCH}, Commit: ${env.SHORT_SHA}"
        }
      }
    }
    stage('Install deps') {
      steps {
        sh 'npm ci --no-audit --no-fund'
      }
    }
    stage('Build app') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Build Docker image') {
      steps {
        script {
          // Decide environment tag
          def envTag = 'dev'
          if (params.TARGET_ENV == 'staging' || (params.TARGET_ENV == 'auto' && env.BRANCH == 'develop')) envTag = 'staging'
          if (params.TARGET_ENV == 'production' || (params.TARGET_ENV == 'auto' && env.BRANCH == 'main')) envTag = 'latest'
          env.ENV_TAG = envTag
        }
        sh 'docker build -t $IMAGE:${COMMIT} -t $IMAGE:${SHORT_SHA} -t $IMAGE:${ENV_TAG} .'
      }
    }
    stage('Push Docker image') {
      when { expression { return params.REGISTRY_REPO?.trim() } }
      steps {
        withCredentials([usernamePassword(credentialsId: params.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
          sh 'docker push $IMAGE:${COMMIT} && docker push $IMAGE:${SHORT_SHA} && docker push $IMAGE:${ENV_TAG}'
        }
      }
    }
    stage('Deploy Staging') {
      when {
        allOf {
          anyOf {
            expression { return params.TARGET_ENV == 'staging' }
            expression { return (params.TARGET_ENV == 'auto' && (env.BRANCH == 'develop' || env.ENV_TAG == 'staging')) }
          }
          expression { return params.DEPLOY_HOST_STAGING?.trim() }
          expression { return params.SSH_CREDENTIALS_ID?.trim() }
        }
      }
      steps {
        sshagent(credentials: [params.SSH_CREDENTIALS_ID]) {
          sh '''
            ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST_STAGING} \
              "docker pull ${IMAGE}:staging && \
               (docker rm -f my-portfolio-staging || true) && \
               docker run -d --name my-portfolio-staging --restart unless-stopped -p ${STAGING_DOCKER_PORT}:80 ${IMAGE}:staging"
          '''
        }
      }
    }
    stage('Deploy Production') {
      when {
        allOf {
          anyOf {
            expression { return params.TARGET_ENV == 'production' }
            expression { return (params.TARGET_ENV == 'auto' && (env.BRANCH == 'main' || env.ENV_TAG == 'latest')) }
          }
          expression { return params.DEPLOY_HOST_PROD?.trim() }
          expression { return params.SSH_CREDENTIALS_ID?.trim() }
        }
      }
      steps {
        sshagent(credentials: [params.SSH_CREDENTIALS_ID]) {
          sh '''
            ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST_PROD} \
              "docker pull ${IMAGE}:latest && \
               (docker rm -f my-portfolio || true) && \
               docker run -d --name my-portfolio --restart unless-stopped -p ${PROD_DOCKER_PORT}:80 ${IMAGE}:latest"
          '''
        }
      }
    }
  }
  post {
    always { echo 'Pipeline finished.' }
  }
}

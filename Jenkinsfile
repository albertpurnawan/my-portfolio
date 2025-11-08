pipeline {
  agent {
    docker {
      image 'node:20'
      args '-u 0:0 -v /var/run/docker.sock:/var/run/docker.sock'
      reuseNode true
    }
  }

  options {
    timestamps()
    ansiColor('xterm')
  }

  parameters {
    choice(name: 'TARGET_ENV', choices: ['auto', 'staging', 'production'], description: 'Deployment target')
  }

  environment {
    APP_NAME = "my-portfolio"
    IMAGE_NAME = "my-portfolio:latest"
    HOST_PORT = "32000"
    CONTAINER_PORT = "80"
    PROJECT_PATH = "/srv/apps/my-portfolio"
  }

  stages {
    stage('Prepare tools') {
      steps {
        sh 'bash -lc "set -euxo pipefail; apt-get update; apt-get install -y --no-install-recommends docker.io ca-certificates; docker version; node -v && npm -v"'
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
        script {
          // Trust mounted workspace directory for Git (fixes 'dubious ownership')
          sh "git config --global --add safe.directory '${WORKSPACE}' || true"
          env.BRANCH = env.BRANCH_NAME ?: sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
          env.SHORT_SHA = env.GIT_COMMIT.take(7)
          echo "Branch: ${env.BRANCH}, Commit: ${env.SHORT_SHA}"
        }
      }
    }

    stage('Install dependencies') {
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
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Deploy locally') {
      steps {
        script {
          echo "🚀 Deploying ${IMAGE_NAME} on this server..."
          sh '''
            docker rm -f ${APP_NAME} || true
            docker run -d \
              -p ${HOST_PORT}:${CONTAINER_PORT} \
              --name ${APP_NAME} \
              --restart unless-stopped \
              --env-file ${PROJECT_PATH}/.env \
              ${IMAGE_NAME}
          '''
        }
      }
    }

    stage('Cleanup old images') {
      steps {
        sh 'docker image prune -f || true'
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed!'
    }
  }
}

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
    string(name: 'APP_NAME', description: 'Container name (e.g. my-portfolio)')
    string(name: 'IMAGE_NAME', description: 'Docker image:tag to build/run (e.g. my-portfolio:latest or username/my-portfolio:latest)')
    string(name: 'HOST_PORT', description: 'Host port to expose (e.g. 32000)')
    string(name: 'CONTAINER_PORT', description: 'Container port (e.g. 80)')
    string(name: 'ENV_FILE', description: 'Optional: absolute path to .env on host; leave blank to skip')
  }

  environment {
    APP_NAME = "${params.APP_NAME}"
    IMAGE_NAME = "${params.IMAGE_NAME}"
    HOST_PORT = "${params.HOST_PORT}"
    CONTAINER_PORT = "${params.CONTAINER_PORT}"
    ENV_FILE = "${params.ENV_FILE}"
  }

  stages {
    stage('Validate params') {
      steps {
        script {
          sh '''
            set -eu
            [ -n "${APP_NAME}" ] || { echo "APP_NAME is required" >&2; exit 1; }
            [ -n "${IMAGE_NAME}" ] || { echo "IMAGE_NAME is required" >&2; exit 1; }
            [ -n "${HOST_PORT}" ] || { echo "HOST_PORT is required" >&2; exit 1; }
            [ -n "${CONTAINER_PORT}" ] || { echo "CONTAINER_PORT is required" >&2; exit 1; }
            if [ -n "${ENV_FILE}" ] && [ ! -f "${ENV_FILE}" ]; then
              echo "ENV_FILE not found: ${ENV_FILE}" >&2
              exit 1
            fi
          '''
        }
      }
    }
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
          def envArg = params.ENV_FILE?.trim() ? "--env-file ${params.ENV_FILE}" : ""
          sh """
            docker rm -f ${APP_NAME} || true
            docker run -d \
              -p ${HOST_PORT}:${CONTAINER_PORT} \
              --name ${APP_NAME} \
              --restart unless-stopped \
              ${envArg} \
              ${IMAGE_NAME}
          """
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

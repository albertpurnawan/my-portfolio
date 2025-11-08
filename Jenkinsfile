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
    string(name: 'APP_NAME_PORTFOLIO', description: 'Container name (e.g. my-portfolio)')
    string(name: 'IMAGE_NAME_PORTFOLIO', description: 'Docker image:tag to build/run (e.g. my-portfolio:latest or username/my-portfolio:latest)')
    string(name: 'HOST_PORT_PORTFOLIO', description: 'Host port to expose (e.g. 32000)')
    string(name: 'CONTAINER_PORT_PORTFOLIO', description: 'Container port (e.g. 80)')
    string(name: 'ENV_FILE_PORTFOLIO', defaultValue: '', description: 'Optional: absolute path to .env on host; leave blank to skip')
    password(name: 'ADMIN_PASSWORD_PORTFOLIO', defaultValue: '', description: 'Admin password SHA-256 hash (64 hex). Passed as VITE_ADMIN_PASSWORD_HASH.')
    string(name: 'ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO', defaultValue: '', description: 'Optional: Jenkins Secret Text ID containing SHA-256 hash')
  }

  environment {
    APP_NAME_PORTFOLIO = "${params.APP_NAME_PORTFOLIO}"
    IMAGE_NAME_PORTFOLIO = "${params.IMAGE_NAME_PORTFOLIO}"
    HOST_PORT_PORTFOLIO = "${params.HOST_PORT_PORTFOLIO}"
    CONTAINER_PORT_PORTFOLIO = "${params.CONTAINER_PORT_PORTFOLIO}"
    ENV_FILE_PORTFOLIO = "${params.ENV_FILE_PORTFOLIO}"
    ADMIN_PASSWORD_PORTFOLIO = "${params.ADMIN_PASSWORD_PORTFOLIO}"
    ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO = "${params.ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO}"
  }

  stages {
    stage('Resolve config') {
      steps {
        script {
          if (!env.ADMIN_PASSWORD_PORTFOLIO?.trim() && params.ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO?.trim()) {
            withCredentials([string(credentialsId: params.ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO, variable: 'ADMIN_HASH_SECRET')]) {
              env.ADMIN_PASSWORD_PORTFOLIO = ADMIN_HASH_SECRET
            }
          }
        }
      }
    }
    stage('Validate params') {
      steps {
        script {
          sh '''
            set -eu
            [ -n "${APP_NAME_PORTFOLIO}" ] || { echo "APP_NAME_PORTFOLIO is required (param or env)" >&2; exit 1; }
            [ -n "${IMAGE_NAME_PORTFOLIO}" ] || { echo "IMAGE_NAME_PORTFOLIO is required (param or env)" >&2; exit 1; }
            [ -n "${HOST_PORT_PORTFOLIO}" ] || { echo "HOST_PORT_PORTFOLIO is required (param or env)" >&2; exit 1; }
            [ -n "${CONTAINER_PORT_PORTFOLIO}" ] || { echo "CONTAINER_PORT_PORTFOLIO is required (param or env)" >&2; exit 1; }
            if [ -n "${ENV_FILE_PORTFOLIO}" ] && [ ! -f "${ENV_FILE_PORTFOLIO}" ]; then
              echo "ENV_FILE_PORTFOLIO not found: ${ENV_FILE_PORTFOLIO}" >&2
              exit 1
            fi
            if [ -n "${ADMIN_PASSWORD_PORTFOLIO}" ]; then
              case "${ADMIN_PASSWORD_PORTFOLIO}" in
                (*[!0-9A-Fa-f]*) echo "ADMIN_PASSWORD_PORTFOLIO must be SHA-256 hex (64 chars)" >&2; exit 1 ;;
                (*) [ ${#ADMIN_PASSWORD_PORTFOLIO} -eq 64 ] || { echo "ADMIN_PASSWORD_PORTFOLIO must be 64 hex chars" >&2; exit 1; } ;;
              esac
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
        sh 'docker build --build-arg VITE_ADMIN_PASSWORD_HASH=${ADMIN_PASSWORD_PORTFOLIO} -t ${IMAGE_NAME_PORTFOLIO} .'
      }
    }

    stage('Deploy locally') {
      steps {
        script {
          echo "🚀 Deploying ${IMAGE_NAME_PORTFOLIO} on this server..."
          def envArg = env.ENV_FILE_PORTFOLIO?.trim() ? "--env-file ${env.ENV_FILE_PORTFOLIO}" : ""
          sh """
            docker rm -f ${APP_NAME_PORTFOLIO} || true
            docker run -d \
              -p ${HOST_PORT_PORTFOLIO}:${CONTAINER_PORT_PORTFOLIO} \
              --name ${APP_NAME_PORTFOLIO} \
              --restart unless-stopped \
              ${envArg} \
              ${IMAGE_NAME_PORTFOLIO}
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

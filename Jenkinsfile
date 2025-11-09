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

  environment {
    // Fallback defaults; override via Jenkins Global/Node env
    // Web image kept for backward compat, but we now use docker-compose to run all services.
    IMAGE_NAME_PORTFOLIO = "${env.IMAGE_NAME_PORTFOLIO ?: 'my-portfolio:latest'}"
    CONTAINER_NAME_PORTFOLIO = "${env.CONTAINER_NAME_PORTFOLIO ?: 'my-portfolio'}"
    PORT_HOST = "${env.PORT_HOST ?: '32000'}" // legacy var, not used with compose
    PORT_CONTAINER = "${env.PORT_CONTAINER ?: '80'}" // legacy var, not used with compose
    ENV_FILE_PORTFOLIO = "${env.ENV_FILE_PORTFOLIO ?: ''}"
    ADMIN_PASSWORD_PORTFOLIO = "${env.ADMIN_PASSWORD_PORTFOLIO ?: ''}"
    ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO = "${env.ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO ?: ''}"
    // Compose env overrides
    WEB_PORT = "${env.WEB_PORT ?: '32000'}"
    API_PORT = "${env.API_PORT ?: '8080'}"
    DB_PORT = "${env.DB_PORT ?: '5432'}"
  }

  stages {
    stage('Resolve config') {
      steps {
        script {
          if (!env.ADMIN_PASSWORD_PORTFOLIO?.trim() && env.ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO?.trim()) {
            withCredentials([string(credentialsId: env.ADMIN_PASSWORD_CREDENTIALS_ID_PORTFOLIO, variable: 'ADMIN_HASH_SECRET')]) {
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
            set -e
            [ -n "${CONTAINER_NAME_PORTFOLIO:-}" ] || { echo "CONTAINER_NAME_PORTFOLIO is required (env)" >&2; exit 1; }
            [ -n "${IMAGE_NAME_PORTFOLIO:-}" ] || { echo "IMAGE_NAME_PORTFOLIO is required (env)" >&2; exit 1; }
            [ -n "${PORT_HOST:-}" ] || { echo "PORT_HOST is required (env)" >&2; exit 1; }
            [ -n "${PORT_CONTAINER:-}" ] || { echo "PORT_CONTAINER is required (env)" >&2; exit 1; }
            if [ -n "${ENV_FILE_PORTFOLIO:-}" ] && [ ! -f "${ENV_FILE_PORTFOLIO}" ]; then
              echo "ENV_FILE_PORTFOLIO not found: ${ENV_FILE_PORTFOLIO}" >&2
              exit 1
            fi
            if [ -n "${ADMIN_PASSWORD_PORTFOLIO:-}" ]; then
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
        sh '''
          bash -lc 'set -euxo pipefail;
            apt-get update;
            apt-get install -y --no-install-recommends docker.io ca-certificates;
            (apt-get install -y --no-install-recommends docker-compose-plugin \
              || apt-get install -y --no-install-recommends docker-compose \
              || true);
            docker version;
            if docker compose version >/dev/null 2>&1; then docker compose version; \
            elif command -v docker-compose >/dev/null 2>&1; then docker-compose version; \
            else echo "docker compose/docker-compose not available" >&2; exit 1; fi;
            node -v && npm -v'
        '''
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

    stage('Build & Deploy (docker-compose)') {
      steps {
        script {
          echo "🧱 Building and deploying with docker-compose..."
          sh '''
            bash -lc 'set -euxo pipefail;
              if docker compose version >/dev/null 2>&1; then
                COMPOSE="docker compose";
              elif command -v docker-compose >/dev/null 2>&1; then
                COMPOSE="docker-compose";
              else
                echo "docker compose/docker-compose not available" >&2; exit 1;
              fi;
              # Stop legacy single-container deployment if exists to free WEB_PORT
              docker rm -f ${CONTAINER_NAME_PORTFOLIO} || true;
              # Stop any containers currently binding WEB_PORT on host
              ids=$(docker ps --format "{{.ID}} {{.Ports}}" | grep -E ":${WEB_PORT}->" | awk "{print \\$1}");
              if [ -n "$ids" ]; then
                echo "Stopping containers using port ${WEB_PORT}: $ids";
                docker rm -f $ids || true;
              fi;
              if [ -n "${ENV_FILE_PORTFOLIO:-}" ]; then ENV_FILE_ARG="--env-file ${ENV_FILE_PORTFOLIO}"; else ENV_FILE_ARG=""; fi;
              $COMPOSE $ENV_FILE_ARG down || true;
              WEB_PORT=${WEB_PORT} API_PORT=${API_PORT} DB_PORT=${DB_PORT} VITE_ADMIN_PASSWORD_HASH=${ADMIN_PASSWORD_PORTFOLIO:-} $COMPOSE $ENV_FILE_ARG up -d --build'
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

pipeline {
    agent any

    parameters {
        choice(
            name: 'ENV_NAME',
            choices: ['QA', 'DEV', 'DEVAT', 'QA2', 'CLOUDQA', 'UAT'],
            description: 'Target Application Environment'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['@smoke', '@regression', '@upgrade', '@baseCapability', '@baseDefect', 'all'],
            description: 'Select Test Suite Tag to Execute'
        )
    }

    environment {
        ENV = "${params.ENV_NAME}"
        SUITE = "${params.TEST_SUITE}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Cleaning up previous execution artifacts...'
                bat 'npm run clean'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
                echo 'Installing Playwright browser engines...'
                bat 'npx playwright install'
            }
        }

        stage('Execute Tests') {
            steps {
                script {
                    echo "Running ${env.SUITE} tests on environment ${env.ENV}..."
                    if (env.SUITE == 'all') {
                        bat "npx cross-env ENV=${env.ENV} npx playwright test"
                    } else {
                        bat "npx cross-env ENV=${env.ENV} npx playwright test --grep ${env.SUITE}"
                    }
                }
            }
        }

        stage('Generate Dashboard') {
            steps {
                echo 'Aggregating dashboard JSON files...'
                bat 'npm run report:dashboard'
            }
        }
    }

    post {
        always {
            echo 'Generating and archiving reports...'
            // Generate Allure static reports
            bat 'npm run allure:generate'
            
            // Publish Allure Report using Jenkins Allure Plugin
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            
            // Archive Playwright html-report and dashboard artifacts
            archiveArtifacts artifacts: 'reports/**, allure-results/**, logs/**', allowEmptyArchive: true
        }
    }
}

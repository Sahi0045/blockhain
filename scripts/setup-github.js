const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'Sahi0045';
const GITHUB_EMAIL = 'sahi0045@hotmail.com';
const REPO_NAME = 'commeme-blockchain';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('Please set GITHUB_TOKEN environment variable');
  process.exit(1);
}

async function createGitHubRepo() {
  try {
    console.log('Creating GitHub repository...');
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: REPO_NAME,
        description: 'Blockchain Meme Tokenization Platform with UBI',
        private: false,
        auto_init: false
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    console.log('Repository created successfully!');
    return response.data.clone_url;
  } catch (error) {
    console.error('Error creating repository:', error.response?.data || error.message);
    process.exit(1);
  }
}

async function setupGitAndPush(repoUrl) {
  try {
    // Initialize git
    execSync('git init', { stdio: 'inherit' });
    
    // Set git config
    execSync(`git config user.email "${GITHUB_EMAIL}"`, { stdio: 'inherit' });
    execSync(`git config user.name "${GITHUB_USERNAME}"`, { stdio: 'inherit' });
    
    // Add all files
    execSync('git add .', { stdio: 'inherit' });
    
    // Create initial commit
    execSync('git commit -m "Initial commit: ComMeme blockchain platform"', { stdio: 'inherit' });
    
    // Add remote and push
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
    execSync('git branch -M main', { stdio: 'inherit' });
    execSync(`git push -u origin main`, { stdio: 'inherit' });
    
    console.log('Repository pushed successfully!');
  } catch (error) {
    console.error('Error setting up git:', error.message);
    process.exit(1);
  }
}

async function main() {
  try {
    const repoUrl = await createGitHubRepo();
    await setupGitAndPush(repoUrl);
    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

main(); 
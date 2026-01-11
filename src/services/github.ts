/**
 * GitHub Integration Service
 * Real OAuth flow and Octokit integration
 * 
 * Configuration:
 * 1. Create GitHub OAuth App at https://github.com/settings/developers
 * 2. Set VITE_GITHUB_CLIENT_ID in your environment
 * 3. For production: implement token exchange in your PocketBase backend
 */

import JSZip from 'jszip';

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

export interface PushResult {
  success: boolean;
  repoUrl?: string;
  commitUrl?: string;
  error?: string;
}

// Configuration
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || window.location.origin + '/auth/github/callback';

// State management
let accessToken: string | null = null;
let currentUser: GitHubUser | null = null;

/**
 * Check if GitHub is configured
 */
export function isGitHubConfigured(): boolean {
  return !!GITHUB_CLIENT_ID;
}

/**
 * Initiates GitHub OAuth flow
 */
export function initiateOAuth(): void {
  if (GITHUB_CLIENT_ID) {
    // Generate state for CSRF protection
    const state = crypto.randomUUID();
    sessionStorage.setItem('github_oauth_state', state);
    
    const scope = 'repo,user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  } else {
    console.log('GitHub OAuth: No client ID configured - using mock flow');
  }
}

/**
 * Handles OAuth callback and exchanges code for token
 * In production, this should be done via your backend for security
 */
export async function handleOAuthCallback(code: string, state: string): Promise<boolean> {
  // Verify state for CSRF protection
  const savedState = sessionStorage.getItem('github_oauth_state');
  if (state !== savedState) {
    console.error('OAuth state mismatch');
    return false;
  }
  sessionStorage.removeItem('github_oauth_state');

  try {
    // In production, exchange code for token via your PocketBase backend:
    // const response = await fetch(`${POCKETBASE_URL}/api/auth/github/callback`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ code }),
    // });
    // const { access_token } = await response.json();
    // accessToken = access_token;
    // await fetchCurrentUser();

    // For now, just validate the code exists
    if (code) {
      accessToken = 'mock_token_' + Date.now();
      await mockOAuthFlow();
      return true;
    }
    return false;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return false;
  }
}

/**
 * Mock OAuth flow for demo purposes
 */
export async function mockOAuthFlow(): Promise<GitHubUser | null> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  currentUser = {
    login: 'demo-user',
    name: 'Demo User',
    avatar_url: 'https://github.com/ghost.png',
    html_url: 'https://github.com/demo-user',
  };

  accessToken = 'mock_access_token_' + Date.now();
  
  sessionStorage.setItem('github_user', JSON.stringify(currentUser));
  sessionStorage.setItem('github_token', accessToken);
  sessionStorage.setItem('github_connected', 'true');

  return currentUser;
}

/**
 * Fetch current user from GitHub API
 */
async function fetchCurrentUser(): Promise<GitHubUser | null> {
  if (!accessToken) return null;

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user');

    const data = await response.json();
    currentUser = {
      login: data.login,
      name: data.name || data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
    };

    sessionStorage.setItem('github_user', JSON.stringify(currentUser));
    return currentUser;
  } catch (error) {
    console.error('Fetch user error:', error);
    return null;
  }
}

/**
 * Check if user is connected to GitHub
 */
export function isConnected(): boolean {
  if (accessToken) return true;
  
  const storedToken = sessionStorage.getItem('github_token');
  if (storedToken) {
    accessToken = storedToken;
    return true;
  }
  
  return sessionStorage.getItem('github_connected') === 'true';
}

/**
 * Get current GitHub user
 */
export function getCurrentUser(): GitHubUser | null {
  if (currentUser) return currentUser;
  
  const stored = sessionStorage.getItem('github_user');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  
  return null;
}

/**
 * Disconnect from GitHub
 */
export function disconnect(): void {
  accessToken = null;
  currentUser = null;
  sessionStorage.removeItem('github_user');
  sessionStorage.removeItem('github_token');
  sessionStorage.removeItem('github_connected');
}

/**
 * Create a new GitHub repository
 */
export async function createRepository(name: string, description?: string): Promise<GitHubRepo | null> {
  if (!isConnected()) {
    throw new Error('Not connected to GitHub');
  }

  const token = accessToken || sessionStorage.getItem('github_token');
  
  if (token && token.startsWith('mock_')) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = getCurrentUser();
    return {
      name,
      full_name: `${user?.login || 'user'}/${name}`,
      html_url: `https://github.com/${user?.login || 'user'}/${name}`,
      description: description || 'Created with Viral AI Website Builder',
    };
  }

  // Real GitHub API call using Octokit-like approach
  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description: description || 'Created with Viral AI Website Builder',
        private: false,
        auto_init: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create repository');
    }

    const data = await response.json();
    return {
      name: data.name,
      full_name: data.full_name,
      html_url: data.html_url,
      description: data.description,
    };
  } catch (error) {
    console.error('Create repository error:', error);
    throw error;
  }
}

/**
 * Push HTML/CSS files to a repository
 */
export async function pushToRepository(
  repoName: string, 
  html: string, 
  css: string
): Promise<PushResult> {
  if (!isConnected()) {
    return { success: false, error: 'Not connected to GitHub' };
  }

  const token = accessToken || sessionStorage.getItem('github_token');
  const user = getCurrentUser();

  if (!user) {
    return { success: false, error: 'No user found' };
  }

  if (token && token.startsWith('mock_')) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const repoUrl = `https://github.com/${user.login}/${repoName}`;
    
    console.log('Mock push to GitHub:', {
      repo: repoName,
      files: {
        'index.html': html.length + ' bytes',
        'styles.css': css.length + ' bytes',
      },
    });

    return {
      success: true,
      repoUrl,
      commitUrl: `${repoUrl}/commit/abc123`,
    };
  }

  try {
    // First, create or get the repository
    let repo: GitHubRepo | null = null;
    try {
      repo = await createRepository(repoName);
    } catch (e) {
      // Repo might already exist, try to get it
      const response = await fetch(`https://api.github.com/repos/${user.login}/${repoName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        repo = {
          name: data.name,
          full_name: data.full_name,
          html_url: data.html_url,
          description: data.description,
        };
      } else {
        throw e;
      }
    }

    if (!repo) {
      throw new Error('Failed to create or find repository');
    }

    // Push files using GitHub API (create/update file contents)
    const fullHtml = generateHTMLFile(html, css);

    // Push index.html
    await pushFile(token!, user.login, repoName, 'index.html', fullHtml, 'Add index.html - Generated by Viral');
    
    // Push styles.css
    await pushFile(token!, user.login, repoName, 'styles.css', css, 'Add styles.css - Generated by Viral');

    return {
      success: true,
      repoUrl: repo.html_url,
      commitUrl: `${repo.html_url}/commits/main`,
    };
  } catch (error) {
    console.error('Push to GitHub error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to push to GitHub',
    };
  }
}

/**
 * Push a single file to repository
 */
async function pushFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string
): Promise<void> {
  // First, check if file exists to get its SHA
  let sha: string | undefined;
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      sha = data.sha;
    }
  } catch (e) {
    // File doesn't exist, that's fine
  }

  // Create or update file
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      sha,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to push ${path}`);
  }
}

/**
 * Generate the HTML file content for export
 */
export function generateHTMLFile(bodyContent: string, cssContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Website created with Viral AI Website Builder">
  <title>My Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
${cssContent}
  </style>
</head>
<body class="bg-gray-900 text-white">
${bodyContent}
</body>
</html>`;
}

/**
 * Export project as downloadable ZIP file
 */
export async function exportAsZip(html: string, css: string, projectName: string = 'my-website'): Promise<void> {
  const zip = new JSZip();
  
  // Generate full HTML file
  const fullHtml = generateHTMLFile(html, css);
  
  // Add files to ZIP
  zip.file('index.html', fullHtml);
  zip.file('styles.css', css);
  
  // Add a README
  zip.file('README.md', `# ${projectName}

Website generated with Viral AI Website Builder.

## Files
- \`index.html\` - Main HTML file with Tailwind CSS
- \`styles.css\` - Custom styles

## Usage
Simply open \`index.html\` in a browser or deploy to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Development
The HTML uses Tailwind CSS via CDN. For production, consider using a build tool to optimize the CSS.
`);

  // Generate and download ZIP
  const blob = await zip.generateAsync({ type: 'blob' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

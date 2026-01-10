/**
 * GitHub Integration Service
 * Mock implementation ready for GitHub OAuth and Octokit integration
 * 
 * To integrate with your backend:
 * 1. Set up GitHub OAuth App at https://github.com/settings/developers
 * 2. Implement OAuth flow in your backend
 * 3. Set VITE_GITHUB_CLIENT_ID in your environment
 * 4. The backend should handle token exchange and provide access token
 */

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

// State management for OAuth
let accessToken: string | null = null;
let currentUser: GitHubUser | null = null;

/**
 * Initiates GitHub OAuth flow
 * In production, this redirects to GitHub for authentication
 */
export function initiateOAuth(): void {
  if (GITHUB_CLIENT_ID) {
    // Real OAuth flow
    const scope = 'repo,user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=${scope}`;
    window.location.href = authUrl;
  } else {
    // Mock OAuth - opens a popup that simulates the flow
    console.log('GitHub OAuth: No client ID configured - using mock flow');
  }
}

/**
 * Handles OAuth callback and exchanges code for token
 * Your backend should handle the actual token exchange
 */
export async function handleOAuthCallback(code: string): Promise<boolean> {
  try {
    // In production, exchange code for token via your backend
    // const response = await fetch('/api/auth/github/callback', {
    //   method: 'POST',
    //   body: JSON.stringify({ code }),
    // });
    // const { access_token } = await response.json();
    // accessToken = access_token;

    // For now, just validate the code exists
    if (code) {
      accessToken = 'mock_token';
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
 * Simulates the authentication process
 */
export async function mockOAuthFlow(): Promise<GitHubUser | null> {
  // Simulate OAuth delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock user data
  currentUser = {
    login: 'demo-user',
    name: 'Demo User',
    avatar_url: 'https://github.com/ghost.png',
    html_url: 'https://github.com/demo-user',
  };

  accessToken = 'mock_access_token_' + Date.now();
  
  // Store in session for persistence
  sessionStorage.setItem('github_user', JSON.stringify(currentUser));
  sessionStorage.setItem('github_connected', 'true');

  return currentUser;
}

/**
 * Check if user is connected to GitHub
 */
export function isConnected(): boolean {
  if (accessToken) return true;
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
  sessionStorage.removeItem('github_connected');
}

/**
 * Create a new GitHub repository
 * Uses Octokit under the hood when connected to real backend
 */
export async function createRepository(name: string, description?: string): Promise<GitHubRepo | null> {
  if (!isConnected()) {
    throw new Error('Not connected to GitHub');
  }

  // In production with Octokit:
  // const octokit = new Octokit({ auth: accessToken });
  // const { data } = await octokit.repos.createForAuthenticatedUser({
  //   name,
  //   description,
  //   private: false,
  //   auto_init: true,
  // });

  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = getCurrentUser();
  const repo: GitHubRepo = {
    name,
    full_name: `${user?.login || 'user'}/${name}`,
    html_url: `https://github.com/${user?.login || 'user'}/${name}`,
    description: description || 'Created with Viral AI Website Builder',
  };

  return repo;
}

/**
 * Push HTML/CSS files to a repository
 * Creates the necessary file structure for a static website
 */
export async function pushToRepository(
  repoName: string, 
  html: string, 
  css: string
): Promise<PushResult> {
  if (!isConnected()) {
    return { success: false, error: 'Not connected to GitHub' };
  }

  try {
    // In production with Octokit:
    // const octokit = new Octokit({ auth: accessToken });
    // 
    // // Create or get repo
    // const repo = await createRepository(repoName);
    // 
    // // Create index.html
    // await octokit.repos.createOrUpdateFileContents({
    //   owner: user.login,
    //   repo: repoName,
    //   path: 'index.html',
    //   message: 'Add index.html - Generated by Viral',
    //   content: btoa(html),
    // });
    // 
    // // Create styles.css
    // await octokit.repos.createOrUpdateFileContents({
    //   owner: user.login,
    //   repo: repoName,
    //   path: 'styles.css',
    //   message: 'Add styles.css - Generated by Viral',
    //   content: btoa(css),
    // });

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const user = getCurrentUser();
    const repoUrl = `https://github.com/${user?.login || 'user'}/${repoName}`;

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
  } catch (error) {
    console.error('Push to GitHub error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to push to GitHub',
    };
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
 * Export project as downloadable ZIP
 * Alternative to GitHub push
 */
export async function exportAsZip(html: string, css: string): Promise<Blob> {
  // For a real implementation, use JSZip:
  // const zip = new JSZip();
  // zip.file('index.html', generateHTMLFile(html, css));
  // zip.file('styles.css', css);
  // return await zip.generateAsync({ type: 'blob' });

  // Simple mock - just return the HTML as a blob
  const fullHtml = generateHTMLFile(html, css);
  return new Blob([fullHtml], { type: 'text/html' });
}

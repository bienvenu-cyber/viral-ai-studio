/**
 * PocketBase Integration Service
 * Ready for your Railway-deployed PocketBase backend
 * 
 * Configuration:
 * 1. Set VITE_POCKETBASE_URL in your environment (e.g., https://your-app.railway.app)
 * 2. Projects are stored in the 'projects' collection
 * 
 * PocketBase Collections to create:
 * - users (built-in)
 * - projects: { name, description, html, css, user, published, github_repo }
 */

import PocketBase, { RecordModel } from 'pocketbase';

// Configuration - set VITE_POCKETBASE_URL in your environment
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || '';

// Initialize PocketBase client
export const pb = new PocketBase(POCKETBASE_URL);

// Enable auto-cancellation for duplicate requests
pb.autoCancellation(false);

// Types
export interface Project extends RecordModel {
  name: string;
  description: string;
  html: string;
  css: string;
  user: string;
  published: boolean;
  github_repo?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Check if PocketBase is configured
export function isConfigured(): boolean {
  return !!POCKETBASE_URL;
}

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Register a new user
 */
export async function register(email: string, password: string, name: string): Promise<User | null> {
  if (!isConfigured()) {
    console.warn('PocketBase not configured - using mock registration');
    return mockUser(email, name);
  }

  try {
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      name,
    });

    // Auto login after registration
    await pb.collection('users').authWithPassword(email, password);

    return {
      id: user.id,
      email: user.email,
      name: user.name || name,
      avatar: user.avatar ? pb.files.getUrl(user, user.avatar) : undefined,
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<User | null> {
  if (!isConfigured()) {
    console.warn('PocketBase not configured - using mock login');
    return mockUser(email, 'Demo User');
  }

  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    
    return {
      id: authData.record.id,
      email: authData.record.email,
      name: authData.record.name || email.split('@')[0],
      avatar: authData.record.avatar ? pb.files.getUrl(authData.record, authData.record.avatar) : undefined,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Login with OAuth2 provider (e.g., 'github', 'google')
 */
export async function loginWithOAuth(provider: string): Promise<User | null> {
  if (!isConfigured()) {
    console.warn('PocketBase not configured - using mock OAuth');
    return mockUser('oauth@demo.com', 'OAuth User');
  }

  try {
    const authData = await pb.collection('users').authWithOAuth2({ provider });
    
    return {
      id: authData.record.id,
      email: authData.record.email,
      name: authData.record.name || authData.record.email.split('@')[0],
      avatar: authData.record.avatar ? pb.files.getUrl(authData.record, authData.record.avatar) : undefined,
    };
  } catch (error) {
    console.error('OAuth error:', error);
    throw error;
  }
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<boolean> {
  if (!isConfigured()) {
    console.warn('PocketBase not configured - mock password reset');
    return true;
  }

  try {
    await pb.collection('users').requestPasswordReset(email);
    return true;
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error;
  }
}

/**
 * Confirm password reset with token
 */
export async function confirmPasswordReset(
  token: string,
  password: string,
  passwordConfirm: string
): Promise<boolean> {
  if (!isConfigured()) {
    console.warn('PocketBase not configured - mock password reset confirm');
    return true;
  }

  try {
    await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
    return true;
  } catch (error) {
    console.error('Password reset confirm error:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateProfile(data: { name?: string; avatar?: File }): Promise<User | null> {
  if (!isConfigured()) {
    const user = getCurrentUser();
    if (user && data.name) {
      user.name = data.name;
      sessionStorage.setItem('mock_user', JSON.stringify(user));
    }
    return user;
  }

  const user = pb.authStore.model;
  if (!user) {
    throw new Error('Not authenticated');
  }

  try {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.avatar) formData.append('avatar', data.avatar);

    const updated = await pb.collection('users').update(user.id, formData);
    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      avatar: updated.avatar ? pb.files.getUrl(updated, updated.avatar) : undefined,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
}

/**
 * Logout current user
 */
export function logout(): void {
  pb.authStore.clear();
  sessionStorage.removeItem('mock_user');
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
  if (!isConfigured()) {
    const stored = sessionStorage.getItem('mock_user');
    return stored ? JSON.parse(stored) : null;
  }

  if (!pb.authStore.isValid || !pb.authStore.model) {
    return null;
  }

  const user = pb.authStore.model;
  return {
    id: user.id,
    email: user.email,
    name: user.name || user.email.split('@')[0],
    avatar: user.avatar ? pb.files.getUrl(user, user.avatar) : undefined,
  };
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (!isConfigured()) {
    return !!sessionStorage.getItem('mock_user');
  }
  return pb.authStore.isValid;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  const unsubscribe = pb.authStore.onChange(() => {
    callback(getCurrentUser());
  });
  return unsubscribe;
}

// ============================================
// PROJECTS CRUD
// ============================================

/**
 * Get all projects for current user
 */
export async function getProjects(): Promise<Project[]> {
  if (!isConfigured()) {
    return getMockProjects();
  }

  const user = getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  try {
    const records = await pb.collection('projects').getFullList<Project>({
      filter: `user = "${user.id}"`,
      sort: '-updated',
    });
    return records;
  } catch (error) {
    console.error('Get projects error:', error);
    throw error;
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(id: string): Promise<Project | null> {
  if (!isConfigured()) {
    const projects = getMockProjects();
    return projects.find(p => p.id === id) || null;
  }

  try {
    const record = await pb.collection('projects').getOne<Project>(id);
    return record;
  } catch (error) {
    console.error('Get project error:', error);
    return null;
  }
}

/**
 * Create a new project
 */
export async function createProject(data: {
  name: string;
  description?: string;
  html?: string;
  css?: string;
}): Promise<Project> {
  if (!isConfigured()) {
    return createMockProject(data);
  }

  const user = getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  try {
    const record = await pb.collection('projects').create<Project>({
      ...data,
      user: user.id,
      published: false,
    });
    return record;
  } catch (error) {
    console.error('Create project error:', error);
    throw error;
  }
}

/**
 * Update a project
 */
export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  if (!isConfigured()) {
    return updateMockProject(id, data);
  }

  try {
    const record = await pb.collection('projects').update<Project>(id, data);
    return record;
  } catch (error) {
    console.error('Update project error:', error);
    throw error;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<boolean> {
  if (!isConfigured()) {
    return deleteMockProject(id);
  }

  try {
    await pb.collection('projects').delete(id);
    return true;
  } catch (error) {
    console.error('Delete project error:', error);
    return false;
  }
}

/**
 * Save project content (HTML/CSS)
 */
export async function saveProjectContent(id: string, html: string, css: string): Promise<Project> {
  return updateProject(id, { html, css });
}

/**
 * Mark project as published
 */
export async function publishProject(id: string, githubRepo?: string): Promise<Project> {
  return updateProject(id, { published: true, github_repo: githubRepo });
}

// ============================================
// MOCK IMPLEMENTATIONS (when PocketBase not configured)
// ============================================

function mockUser(email: string, name: string): User {
  const user = {
    id: 'mock_' + Date.now(),
    email,
    name,
  };
  sessionStorage.setItem('mock_user', JSON.stringify(user));
  return user;
}

function getMockProjects(): Project[] {
  const stored = localStorage.getItem('mock_projects');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default mock projects
  const projects: Project[] = [
    {
      id: '1',
      name: 'Landing Page',
      description: 'A beautiful landing page for my startup',
      html: '',
      css: '',
      user: 'mock_user',
      published: true,
      collectionId: '',
      collectionName: 'projects',
      created: new Date(Date.now() - 86400000).toISOString(),
      updated: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '2',
      name: 'Portfolio Site',
      description: 'Personal portfolio to showcase my work',
      html: '',
      css: '',
      user: 'mock_user',
      published: false,
      collectionId: '',
      collectionName: 'projects',
      created: new Date(Date.now() - 172800000).toISOString(),
      updated: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: '3',
      name: 'Blog Template',
      description: 'Clean blog template with modern design',
      html: '',
      css: '',
      user: 'mock_user',
      published: false,
      collectionId: '',
      collectionName: 'projects',
      created: new Date(Date.now() - 259200000).toISOString(),
      updated: new Date(Date.now() - 259200000).toISOString(),
    },
  ];
  
  localStorage.setItem('mock_projects', JSON.stringify(projects));
  return projects;
}

function createMockProject(data: { name: string; description?: string; html?: string; css?: string }): Project {
  const projects = getMockProjects();
  const newProject: Project = {
    id: 'project_' + Date.now(),
    name: data.name,
    description: data.description || '',
    html: data.html || '',
    css: data.css || '',
    user: 'mock_user',
    published: false,
    collectionId: '',
    collectionName: 'projects',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  projects.unshift(newProject);
  localStorage.setItem('mock_projects', JSON.stringify(projects));
  return newProject;
}

function updateMockProject(id: string, data: Partial<Project>): Project {
  const projects = getMockProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Project not found');
  }
  projects[index] = { ...projects[index], ...data, updated: new Date().toISOString() };
  localStorage.setItem('mock_projects', JSON.stringify(projects));
  return projects[index];
}

function deleteMockProject(id: string): boolean {
  const projects = getMockProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem('mock_projects', JSON.stringify(filtered));
  return true;
}

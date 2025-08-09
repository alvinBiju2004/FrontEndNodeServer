// services/userService.ts
const API_BASE_URL = 'http://localhost:3000/api';

export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
}

class UserService {
  private async request(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    
    return response.json();
  }

  async getUsers(): Promise<User[]> {
    return this.request('/users');
  }

  async createUser(userData: CreateUserData): Promise<User> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: CreateUserData): Promise<User> {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const userService = new UserService();
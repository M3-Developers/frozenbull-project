import apiClient from './httpClient';
import mockApiService from './mockApiService';

// Detectar se deve usar Mock API ou API real
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK === 'true' || 
                     process.env.REACT_APP_API_URL === 'https://your-api-id.execute-api.region.amazonaws.com/prod' ||
                     !process.env.REACT_APP_API_URL;

console.log('🔧 API Mode:', USE_MOCK_API ? 'MOCK API' : 'REAL API');

// Example API service
export const userService = {
  // GET /users
  getUsers: async () => {
    try {
      if (USE_MOCK_API) {
        console.log('📡 Using Mock API for getUsers');
        return await mockApiService.getUsers();
      }
      
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      
      // Fallback para Mock API em caso de erro de rede
      if (!USE_MOCK_API && error.message.includes('Network Error')) {
        console.log('🔄 Fallback to Mock API due to network error');
        return await mockApiService.getUsers();
      }
      
      throw error;
    }
  },

  // GET /users/:id
  getUserById: async (id) => {
    try {
      if (USE_MOCK_API) {
        console.log(`📡 Using Mock API for getUserById(${id})`);
        return await mockApiService.getUserById(id);
      }
      
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching user ${id}:`, error);
      
      // Fallback para Mock API
      if (!USE_MOCK_API && error.message.includes('Network Error')) {
        console.log(`🔄 Fallback to Mock API for user ${id}`);
        return await mockApiService.getUserById(id);
      }
      
      throw error;
    }
  },

  // POST /users
  createUser: async (userData) => {
    try {
      if (USE_MOCK_API) {
        console.log('📡 Using Mock API for createUser');
        return await mockApiService.createUser(userData);
      }
      
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      
      // Fallback para Mock API
      if (!USE_MOCK_API && error.message.includes('Network Error')) {
        console.log('🔄 Fallback to Mock API for createUser');
        return await mockApiService.createUser(userData);
      }
      
      throw error;
    }
  },

  // PUT /users/:id
  updateUser: async (id, userData) => {
    try {
      if (USE_MOCK_API) {
        console.log(`📡 Using Mock API for updateUser(${id})`);
        return await mockApiService.updateUser(id, userData);
      }
      
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`❌ Error updating user ${id}:`, error);
      
      // Fallback para Mock API
      if (!USE_MOCK_API && error.message.includes('Network Error')) {
        console.log(`🔄 Fallback to Mock API for updateUser ${id}`);
        return await mockApiService.updateUser(id, userData);
      }
      
      throw error;
    }
  },

  // DELETE /users/:id
  deleteUser: async (id) => {
    try {
      if (USE_MOCK_API) {
        console.log(`📡 Using Mock API for deleteUser(${id})`);
        return await mockApiService.deleteUser(id);
      }
      
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error deleting user ${id}:`, error);
      
      // Fallback para Mock API
      if (!USE_MOCK_API && error.message.includes('Network Error')) {
        console.log(`🔄 Fallback to Mock API for deleteUser ${id}`);
        return await mockApiService.deleteUser(id);
      }
      
      throw error;
    }
  }
};

export default userService;

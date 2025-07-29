// Mock API Service - Simula uma API real para desenvolvimento/teste
class MockApiService {
  constructor() {
    this.users = [
      { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Admin' },
      { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'User' },
      { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'User' },
      { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', role: 'Manager' },
    ];
  }

  // Simula delay de rede
  delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // GET /users
  async getUsers() {
    await this.delay(800);
    console.log('Mock API: Retornando lista de usuários');
    return {
      data: this.users,
      status: 200,
      message: 'Usuários carregados com sucesso'
    };
  }

  // GET /users/:id
  async getUserById(id) {
    await this.delay(500);
    const user = this.users.find(u => u.id === parseInt(id));
    
    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    
    console.log(`Mock API: Retornando usuário ${id}`);
    return {
      data: user,
      status: 200,
      message: 'Usuário encontrado'
    };
  }

  // POST /users
  async createUser(userData) {
    await this.delay(1000);
    const newUser = {
      id: Math.max(...this.users.map(u => u.id)) + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    console.log('Mock API: Usuário criado', newUser);
    
    return {
      data: newUser,
      status: 201,
      message: 'Usuário criado com sucesso'
    };
  }

  // PUT /users/:id
  async updateUser(id, userData) {
    await this.delay(800);
    const userIndex = this.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    console.log(`Mock API: Usuário ${id} atualizado`, this.users[userIndex]);
    
    return {
      data: this.users[userIndex],
      status: 200,
      message: 'Usuário atualizado com sucesso'
    };
  }

  // DELETE /users/:id
  async deleteUser(id) {
    await this.delay(600);
    const userIndex = this.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    
    const deletedUser = this.users.splice(userIndex, 1)[0];
    console.log(`Mock API: Usuário ${id} deletado`, deletedUser);
    
    return {
      data: deletedUser,
      status: 200,
      message: 'Usuário deletado com sucesso'
    };
  }

  // Simular erro de rede (para testes)
  async simulateNetworkError() {
    await this.delay(2000);
    throw new Error('Network Error: Falha na conexão com o servidor');
  }
}

// Singleton instance
const mockApiService = new MockApiService();

export default mockApiService;

import React from 'react';
import { useApiCall } from '../hooks/useApiCall';
import { userService } from '../services/userService';
import Loading from '../components/Loading/Loading';
import './Home.css';

const Home = () => {
  const { data: apiResponse, loading, error, refetch } = useApiCall(
    userService.getUsers,
    [],
    true
  );

  // Extrair dados da resposta da API
  const users = apiResponse?.data || [];
  const apiMessage = apiResponse?.message;

  if (loading) return <Loading message="Carregando usuários..." />;
  
  if (error) {
    return (
      <div className="error-container">
        <h3>Erro ao carregar dados</h3>
        <p>{error.message}</p>
        <button onClick={refetch}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>FrozenBull Project</h1>
        <p>Bem-vindo ao seu projeto React hospedado no S3!</p>
        {apiMessage && <p className="api-status">📡 {apiMessage}</p>}
      </header>

      <main className="home-content">
        <section className="users-section">
          <h2>Usuários ({users.length})</h2>
          {users && users.length > 0 ? (
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>📧 {user.email}</p>
                  <p>👤 {user.role}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-users">
              <p>Nenhum usuário encontrado.</p>
              <button onClick={refetch}>🔄 Recarregar</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;

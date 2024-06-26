export const sendRegisterCommand = (values) => {
    return fetch('/register_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
    });
};

export const fetchFriendHistory = (email, code) => {
    return fetch(`/friend_history?email=${email}&code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
};

export const testFriendHistory = async () => {
    const email = 't4@t.com';
    const code = '6795';

    try {
      const response = await fetchFriendHistory(email, code);

      if (response.ok) {
        const data = await response.json();
        console.log('Histórico do amigo:', data.history); 
      } else {
        const errorData = await response.json();
        console.error('Erro ao buscar histórico:', errorData.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      // Lide com o erro de rede
    }
  };
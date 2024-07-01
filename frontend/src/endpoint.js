export const sendLoginCommand = (values) => {
  return fetch('/login_user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
  });
};


export const sendRegisterCommand = (values) => {
    return fetch('/register_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
    });
};

export const fetchUserData = async (token) => {

  if (!token) {
    console.error('Usuário não autenticado!');
    return Promise.reject('Usuário não autenticado'); 
  }

  try {
    const response = await fetch('/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      const errorData = await response.json();
      console.error('Erro ao buscar dados do usuário:', errorData.message);
      return Promise.reject(errorData.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return Promise.reject('Erro na requisição');
  }
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
    }
  };

  export const updateUser = async (userData, token) => {
    return fetch('/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const testUpdateUser = async (token) => {
    const updatedData = {
      name: 'novissimo gt',
      email: 'newg@t.com',
      currentPassword: '123', // Replace with actual old password
      newPassword: '1234', // Replace with actual new password
    };
  
    try {
      const response = await updateUser(updatedData, token);
  
      if (response.ok) {
        console.log('Dados do usuário atualizados com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar dados do usuário:', errorData.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };
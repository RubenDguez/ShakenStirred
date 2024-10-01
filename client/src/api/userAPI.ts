const getUser = async (username: string, token: string) => {
  try {
    const response = await fetch(`/api/user/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data: IUser = await response.json();
    return data;
  } catch (error) {
    const ERROR = error as Error;
    return Promise.reject(ERROR.message);
  }
};

const updateUser = async (user: Omit<IUser, 'id' | 'role' | 'createdAt'>, token: string) => {
  try {
    const response = await fetch(`/api/user/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data: IUser = await response.json();
    return data;
  } catch (error) {
    const ERROR = error as Error;
    return Promise.reject(ERROR.message);
  }
};

export { getUser, updateUser };

interface IUser {
  email: string;
  username: string;
  password: string;
}

const login = async (userInfo: Omit<IUser, 'email'>) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    const ERROR = error as Error;
    return Promise.reject(ERROR.message);
  }
}

const signUp = async (userInfo: IUser) => {
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    const ERROR = error as Error;
    return Promise.reject(ERROR.message);
  }
}

export { login, signUp };

interface IData {
  user: number | undefined;
  name: string;
  category: string;
  instructions: string;
  ingredients: {
    amount: number;
    unit: string;
    name: string;
  }[];
  img: string;
}

const createDrink = async (data: IData, token: string) => {
  try {
    const response = await fetch('/api/drink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const responseData: IData = await response.json();

    return responseData;
  } catch (error) {
    const ERROR = error as Error;
    return Promise.reject(ERROR.message);
  }
};

export { createDrink };

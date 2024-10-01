const getCloudinaryInfo = async (token: string) => {
  try {
    const response = await fetch('/api/cloudinary', {
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

    const data: {
      cloudName: string;
      uploadPreset: string;
    } = await response.json();
    return data;
  } catch (error) {
    const ERROR = error as Error;
    return Promise.reject(ERROR.message);
  }
};

export { getCloudinaryInfo }

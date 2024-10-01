import { Request, Response } from "express";

export const getCloudinaryInfo = async (_req: Request, res: Response) => {
    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;
      return res.status(200).json({ cloudName, uploadPreset });
    } catch (error) {
      const ERROR = error as Error;
      return res.status(500).json({ message: ERROR.message });
    }
  };

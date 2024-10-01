/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import useAuthorization from '../hooks/useAuthorization';
import { getCloudinaryInfo } from '../api/cloudinaryAPI';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function UploadWidget({ children, setImage }: { children: string; setImage: React.Dispatch<React.SetStateAction<string>> }) {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const { getJwt } = useAuthorization({ secure: false });

  const [cloudinary, setCloudinary] = useState({ cloudName: '', uploadPreset: '' });

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getCloudinaryInfo(getJwt()!);
        setCloudinary(data);
      } catch (error) {
        const ERROR = error as Error;
        console.error(ERROR.message);
      }
    }
    fetch();
  }, [getJwt]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current!.createUploadWidget(
      {
        cloudName: cloudinary.cloudName,
        uploadPreset: cloudinary.uploadPreset,
        width: 250,
        height: 250,
        cropping: true,
      },
      function (error: Error, result: any) {
        if (error) return error;

        if (result.info.secure_url) {
          setImage(result.info.secure_url);
        }
      },
    );
  }, [setImage, cloudinary]);

  return <button onClick={() => widgetRef.current.open()}>{children}</button>;
}

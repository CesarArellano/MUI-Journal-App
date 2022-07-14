import { CloudinaryResp } from "../interfaces/cloudinary";

export const fileUpload = async( file: File ):Promise<string> => {
  if( !file ) throw new Error('No tenemos ningún archivo a subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dpvsseupu/image/upload';
  
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    });

    if( !resp.ok ) throw new Error('No se pudo subir imagen');
    
    const cloudResp = await resp.json() as CloudinaryResp;

    return cloudResp.secure_url;
    
  } catch (error: any) {
    console.log(error);
    return '';
  }
}
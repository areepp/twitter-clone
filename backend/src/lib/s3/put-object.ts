import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import s3 from '@/lib/aws'
import { v4 as uuidv4 } from 'uuid'

export const sendPutObjectCommand = async (file: Express.Multer.File) => {
  const uniqueFileName = uuidv4()

  const params: PutObjectCommandInput = {
    Bucket: process.env.BUCKET_NAME,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  }

  const command = new PutObjectCommand(params)

  await s3.send(command)

  return (
    'https://my-twitter-clone.s3.ap-southeast-1.amazonaws.com/' + uniqueFileName
  )
}

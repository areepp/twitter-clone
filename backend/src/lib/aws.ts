import { S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
  region: process.env.BUCKET_REGION,
})

export default s3

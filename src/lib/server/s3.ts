import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.AWS_REGION;
const client = new S3Client({ region: REGION });
export const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`;

/**
 * S3에 파일을 업로드한다.
 *
 * @param {File} file 파일
 * @returns {Promise<string>} 업로드된 파일 키
 */
export const upload = async (file: File, directory: string): Promise<string> => {
  const body = Buffer.from(await file.arrayBuffer());
  const extend = file.name.split('.').pop();
  const key = `${directory}/${uuidv4()}.${extend}`;
  const contentType = file.type || 'image/jpg';

  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return key;
};

/**
 * S3에 파일을 업로드한다.
 *
 * @param {File[]} files 파일 목록
 * @returns {Promise<string[]>} 업로드된 파일 키 목록
 */
export const uploadBulk = async (files: File[], directory: string): Promise<string[]> => {
  return await Promise.all(
    files.map(async (file: File) => {
      const body = Buffer.from(await file.arrayBuffer());
      const extend = file.name.split('.').pop();
      const key = `${directory}/${uuidv4()}.${extend}`;
      const contentType = file.type || 'image/jpg';

      await client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: body,
          ContentType: contentType,
        }),
      );

      return key;
    }),
  );
};

/**
 * S3에 파일을 삭제한다.
 *
 * @param {string} key 파일 키
 */
export const remove = async (key: string, retries: number = 1) => {
  if (!key) {
    return;
  }

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
    );
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await remove(key, retries - 1);
    } else {
      // TODO: 별도의 커스텀 에러를 만들어준다.
      throw error;
    }
  }
};

/**
 * S3에 파일을 여러 개 삭제한다.
 *
 * @param {string[]} keys 파일 키 목록
 */
export const removeBulk = async (keys: string[]) => {
  await client.send(
    new DeleteObjectsCommand({
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    }),
  );
};

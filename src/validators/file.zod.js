import { z } from "zod";
import { fileNameSchema, objectIdSchema } from "./common.zod";

export const uploadInitiateSchema = z.object({
  name: fileNameSchema,
  size: z.number().positive("File size must be a positive number"),
  contentType: z.string().nonempty("Content type is required"),
  parentFolderId: objectIdSchema.nullable().optional(),
});

export const uploadCompleteSchema = z.object({
  uploadId: objectIdSchema,
});

export const getFileSchema = z.object({
  fileId: objectIdSchema,
});

export const updateFileSchema = z.object({
  fileId: objectIdSchema,
  body: z.object({
    name: fileNameSchema.optional(),
    isTrashed: z.boolean().optional(),
    isStarred: z.boolean().optional(),
  }),
});

export const deleteFileSchema = getFileSchema;

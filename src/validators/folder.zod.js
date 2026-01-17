import { z } from "zod";
import { folderNameSchema, objectIdSchema } from "./common.zod";

export const getFolderContentsSchema = z.object({
  folderId: objectIdSchema.nullable().optional(),
});

export const createFolderSchema = z.object({
  name: folderNameSchema,
  parentFolderId: objectIdSchema.nullable().optional(),
});

export const updateFolderSchema = z.object({
  body: z.object({
    name: folderNameSchema.optional(),
    isTrashed: z.boolean().optional(),
    isStarred: z.boolean().optional(),
  }),
  folderId: objectIdSchema,
});

export const deleteFolderSchema = z.object({
  folderId: objectIdSchema,
});

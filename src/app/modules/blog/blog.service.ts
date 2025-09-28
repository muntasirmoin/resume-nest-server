import { PrismaClient } from "@prisma/client";
import { IBlog } from "./blog.interface";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

const generateUniqueSlug = async (title: string): Promise<string> => {
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

  let slug = baseSlug;
  let count = 1;

  // Check if slug exists
  while (await prisma.blog.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};
// create blog
const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const slug = await generateUniqueSlug(payload.title);
  const blog = await prisma.blog.create({
    data: {
      ...payload,
      slug,
    },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      published: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return blog;
};

// get all blog

interface IGetAllBlogsOptions {
  page?: number;
  limit?: number;
}

const getAllBlog = async ({
  page = 1,
  limit = 10,
}: IGetAllBlogsOptions = {}): Promise<{ blogs: IBlog[]; meta: any }> => {
  const skip = (page - 1) * limit;

  const total = await prisma.blog.count();

  const blogs = await prisma.blog.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      published: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const totalPage = Math.ceil(total / limit);

  const meta = {
    page,
    limit,
    totalPage,
    total,
  };

  return { blogs, meta };
};

// get single blog by id
const getBlogById = async (id: string): Promise<IBlog | null> => {
  const blog = await prisma.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      published: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return blog;
};

// delete blog by id

const deleteBlog = async (id: string) => {
  const existingBlog = await prisma.blog.findUnique({ where: { id } });
  if (!existingBlog) {
    throw new AppError(404, "Blog not found");
  }

  await prisma.blog.delete({
    where: { id },
  });

  return {
    message: "Blog deleted successfully",
  };
};

// update blog by id
const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const blog = await prisma.blog.findUnique({ where: { id } });

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  let updatedData: any = { ...payload };

  // Update slug if title is updated
  if (payload.title && payload.title !== blog.title) {
    updatedData.slug = await generateUniqueSlug(payload.title);
  }

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: updatedData,
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      published: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedBlog;
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
};

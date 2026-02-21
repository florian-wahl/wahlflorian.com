import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    coverImage: string;
}

export interface Post extends PostMeta {
    contentHtml: string;
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
    return getAllPostSlugs().map((slug) => getPostMeta(slug));
}

export function getPostMeta(slug: string): PostMeta {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        coverImage: data.coverImage ?? "",
    };
}

export function getPostBySlug(slug: string): Post {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const contentHtml = marked(content) as string;
    return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        coverImage: data.coverImage ?? "",
        contentHtml,
    };
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const servicesDirectory = path.join(process.cwd(), 'src', 'app', 'services', 'projects');

export function loadServices() {
  const files = fs.readdirSync(servicesDirectory);
  const allServicesData = files
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(servicesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title,
        description: data.description,
      };
    });
  return allServicesData;
}

export function loadService(slug) {
  const fullPath = path.join(servicesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title,
    description: data.description,
    content,
  };
} 
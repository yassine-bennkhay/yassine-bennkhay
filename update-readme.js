const fetch = require('node-fetch');
const fs = require('fs');

async function getBlogPosts() {
  const url = `http://yassinebenkhay.com/wp-json/wp/v2/posts?_embed&per_page=3`;
  const response = await fetch(url);
  const data = await response.json();
  const posts = data.map(post => `- [${post.title.rendered}](${post.link})`);
  return posts;
}

async function updateReadme() {
  const blogPosts = await getBlogPosts();
  const readme = fs.readFileSync('README.md', 'utf8');
  const startTag = '<!-- BLOG-POST-LIST:START -->';
  const endTag = '<!-- BLOG-POST-LIST:END -->';
  const startIndex = readme.indexOf(startTag) + startTag.length;
  const endIndex = readme.indexOf(endTag);
  const newReadme = readme.slice(0, startIndex) + '\n' + blogPosts.join('\n') + '\n' + readme.slice(endIndex);
  fs.writeFileSync('README.md', newReadme)
}

updateReadme();

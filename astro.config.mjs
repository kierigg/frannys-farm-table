// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://frannysfarmtable.co',
  redirects: {
    '/reserve': '/visit',
  },
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === 'https://frannysfarmtable.co/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (/\/(menu|visit)\/?$/.test(item.url)) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        return item;
      },
    }),
  ],
});

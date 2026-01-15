import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import type { APIRoute } from 'astro';

// Google Fontsからフォントを取得
async function loadFont(): Promise<ArrayBuffer> {
  const fontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap';
  const css = await (await fetch(fontUrl)).text();
  const fontUrlMatch = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!fontUrlMatch) {
    throw new Error('Font URL not found');
  }
  const response = await fetch(fontUrlMatch[1]);
  return response.arrayBuffer();
}

let fontData: ArrayBuffer | null = null;

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id.replace('.md', '') },
    props: { title: post.data.title },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title } = props;

  if (!fontData) {
    fontData = await loadFont();
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white',
                borderRadius: '24px',
                padding: '48px',
                width: '100%',
                height: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      textAlign: 'center',
                      lineHeight: 1.4,
                      maxWidth: '90%',
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginTop: '32px',
                      fontSize: '24px',
                      color: '#6b7280',
                    },
                    children: 'diary-astro',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};

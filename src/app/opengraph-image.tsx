import { ImageResponse } from 'next/server';
 
export const runtime = 'edge';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 80,
          letterSpacing: -2,
          fontWeight: 900,
          textAlign: 'center',
        }}
        >
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(255, 0, 128), rgb(121, 40, 202))',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          CineFlix | Onde o Cinema Ganha Vida
        </div>
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Explorar
        </div>
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Maratonar
        </div>
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Desfrutar
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
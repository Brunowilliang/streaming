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
          backgroundColor: '#6D38E0',
          letterSpacing: -2,
          fontWeight: 900,
          textAlign: 'center',
        }}
        >
        <div style={{ fontSize: 80, fontWeight: 'bold', color: '#FFFFFF' }}>
          CineFlix
        </div>
        <div style={{ fontSize: 60, fontWeight: 'normal', color: '#FFFFFF' }}>
          Onde o Cinema Ganha Vida
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
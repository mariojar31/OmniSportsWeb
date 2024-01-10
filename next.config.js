/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.asmedia.epimg.net',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'dimayor.com.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'a2.espncdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.infobae.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.elpais.com.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'caracoltv.brightspotcdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'a3.espncdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'api.fifa.com',
            port: '',
            pathname: '/**',
          },    
          {
            protocol: 'http',
            hostname: 'localhost:3000',
            port: '',
            pathname: '/**',
          },        
        ],
      },
    
}



module.exports = nextConfig
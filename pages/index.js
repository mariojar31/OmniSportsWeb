"use client";
import Image from 'next/image';
import Layout from '@/components/layout';
import News from '../components/news';


export default function Home() {
  return (
    <>
    <Layout>
    <News></News>
    </Layout>
    </>
  )
}

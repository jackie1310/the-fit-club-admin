import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { VideoData } from '@/data/VideoData';
import SearchInput from "react-search-input";
import Layout from '@/components/Layout';
import Data from '@/components/Data';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleChange = (term) => {
    setSearchTerm(term);
  };

  const filteredData = VideoData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Data/>
    </Layout>
  )
}

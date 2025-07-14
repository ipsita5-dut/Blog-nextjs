import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import BlogSection from "./components/BlogSection";
import BlogPosts from "./dashboard/BlogPost";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <BlogSection/>
      <BlogPosts/>
      <About/>
      <Footer/>
    </main>  
  );
}

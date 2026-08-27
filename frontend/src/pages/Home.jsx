import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.badgePill}>
          <span className={styles.badgeDot}></span>
          <span>Level 5 Cloud Modernized Platform</span>
        </div>
        <h1 className={styles.heroTitle}>
          Next-Gen Commerce, <br/>
          <span className={styles.gradientText}>Cloud-Native Performance</span>
        </h1>
        <p className={styles.heroSubtitle}>
          ShopSphere brings enterprise-grade reliability, real-time inventory management, 
          microservices architecture, and instant global CDN delivery built for speed.
        </p>
        <div className={styles.ctaGroup}>
          <button className={styles.primaryBtn} onClick={() => navigate("/products")}>
            Explore Products Catalog →
          </button>
          <a href="https://github.com/Younes-235/EYOUTH-31007200201119-ShopSphere-fullstack-ecommerce-cloud-younes-aly" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
            View GitHub Architecture
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionHeading}>Engineered with Cloud-Native Standards</h2>
        <div className={styles.featuresGrid}>
          
          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>⚡</div>
            <h3>Vercel Edge PaaS</h3>
            <p>Sub-millisecond global CDN caching and serverless execution for high-speed dynamic routes.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>🗄️</div>
            <h3>Supabase PostgreSQL</h3>
            <p>ACID-compliant relational database handling orders, transactions, and product inventories.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>🧩</div>
            <h3>Microservices & Serverless</h3>
            <p>Decoupled review microservice and background welcome email worker running independently.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>🛡️</div>
            <h3>24/7 Observability</h3>
            <p>Automated health probes, structured JSON logging, and instant zero-downtime rollback capabilities.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
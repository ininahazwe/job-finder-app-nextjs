import Head from "next/head";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
import PlantesTable from "../components/PlantesTable/PlantesTable";

export default function Home({ jobs }) {
    console.log(jobs)

    const [keyword, setKeyword] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(keyword) || job.title.toLowerCase().includes(keyword) || job.location.toLowerCase().includes(keyword) || job.type.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
      e.preventDefault();
      setKeyword(e.target.value.toLowerCase());
  }

  return (
      <Layout>
          <div className={styles.counts}>Found {jobs.length} jobs</div>
          <SearchInput placeholder="Filter by title, company, location or type" onChange={onInputChange}/>
          <PlantesTable jobs={filteredJobs} />
      </Layout>
  );
}

export const getStaticProps = async () => {
    const res = await fetch("https://jobs.github.com/positions.json");
    const jobs = await res.json();

    return {
        props: {
            jobs
        },
    };
};

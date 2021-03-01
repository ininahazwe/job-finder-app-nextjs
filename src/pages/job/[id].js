import Layout from "../../components/Layout/Layout";
import styles from "./Job.module.css"

const getJob = async (id) => {
    const res = await fetch(`https://jobs.github.com/positions/${params.id}`);
    const job = await res.json();
    return job;
};

const Job = ({job}) => {
    console.log(job);

    const borders = job.borderSpacing.map()
    return (
        <Layout title={job.company}>
            <div>
                <div className={styles.overview_panel}>
                    <img src={job.company_logo} alt={job.company}></img>
                    <h1>{job.company}</h1>
                </div>
            </div>
        </Layout>
    );
};

export default Job;

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`https://jobs.github.com/positions/${params.id}`);

    const job = await getJob(params.id);
    return {
        props: {
            job,
        },
    }
}
import styles from "./CountriesTable.module.css"
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded, LocationCity} from "@material-ui/icons";
import {useState} from "react";

const orderBy = (jobs, value, direction) => {
    if (direction === "asc") {
        return [...jobs].sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }

    if (direction === "desc") {
        return [...jobs].sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }

    return jobs;
};
const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }
    if (direction === "desc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        );
    }
};

const JobsTable = ({ jobs }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedJobs = orderBy(jobs, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    };

    return (
        <div>
            <div className={styles.heading}>
                <button
                    className={styles.heading_name}
                    onClick={() => setValueAndDirection("company")}
                >
                    <div>Company</div>

                    {value === "company" && <SortArrow direction={direction} />}
                </button>

                <button
                    className={styles.heading_population}
                    onClick={() => setValueAndDirection("title")}
                >
                    <div>Title</div>

                    {value === "title" && <SortArrow direction={direction} />}
                </button>
            </div>
            <div className={styles.joblist}>
            {orderedJobs.map((job) =>(
                    <div className={styles.unjob}>
                        <div className={styles.company}>
                            <img className={styles.logo} src={job.company_logo} alt={job.company}></img>
                            <a target="_blank" href={job.company_url}>{job.company}</a>
                        </div>
                        <div className={styles.title}>{job.title}</div>
                        <div className={styles.type}>{job.type}</div>
                        <div className={styles.location}>
                            <LocationCity color="inherit" />
                            {job.location}
                        </div>
                    </div>
            ))}
            </div>
        </div>
    );
};

export default JobsTable;
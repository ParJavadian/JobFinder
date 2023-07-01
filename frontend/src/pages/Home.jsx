import MyNavbar from "../components/MyNavBar";
import SearchInput from "../components/SearchInput";
import PrimaryJobCard from "../components/PrimaryJobCard";
import Container from "../components/Container";
import HorizContainer from "../components/HorizContainer";
import { Typography } from "@material-tailwind/react";

const SampleImgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMGuOzi8xiMxTHT0Oj1UQygOfwvkENepvfov3kZ45RQ&s";
export default function Home() {
  const myJob = {
    Title: "Manager",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
    Logosrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    Time: "Full-time",
    Remote: "In-person",
  };
  const myJobs = [
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
  ];
  return (
    <>
      <MyNavbar />

      <Container>
        <img class="w-full h-64" src={SampleImgUrl} alt="sample" />
        <SearchInput />
        {myJobs?.length > 0 ? (
          <HorizContainer>
            {myJobs.map((myJob) => (
              <PrimaryJobCard job={myJob} />
            ))}
          </HorizContainer>
        ) : (
          <Typography>No jobs found</Typography>
        )}
        {/* <HorizContainer>
          <PrimaryJobCard job={myJob} />
          <PrimaryJobCard job={myJob} />
          <PrimaryJobCard job={myJob} />
        </HorizContainer>
        <PrimaryJobCard job={myJob} /> */}
      </Container>
    </>
  );
}

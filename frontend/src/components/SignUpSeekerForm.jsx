import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import React from "react";

export default function SignUpSeekerForm() {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Create a job seeker account.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" required />
          <Input type="email" size="lg" label="Last Name" required />
          <Input size="lg" label="Email" required />
          <Input type="tel" size="lg" label="Phone number" required />
          <Input size="lg" label="Username" required />
          <Input type="password" size="lg" label="Password" required />
          <Input size="lg" label="What is your profession field?" />
          <Input size="lg" label="What is your last degree?" />
          <Input size="lg" label="Location" />
          <Input size="lg" label="What languages can you speak?" />
          <Textarea size="lg" label="Add any more details here" />
        </div>
        <Button className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}

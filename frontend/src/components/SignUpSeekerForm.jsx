import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export default function SignUpSeekerForm() {
  return (
    <Card color="transparent" shadow={false} className="w-96">
      <Typography variant="h4" color="blue-gray">
        Sign Up as a Job Seeker
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Create a job seeker account.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" required />
          <Input size="lg" label="Last Name" required />
          <Input type="email" size="lg" label="Email" required />
          <Input type="tel" size="lg" label="Phone number" required />
          <Input type="password" size="lg" label="Password" required />
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

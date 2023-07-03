import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export default function SignUpManagerForm() {
  return (
    <Card color="transparent" shadow={false} className="w-96">
      <Typography variant="h4" color="blue-gray">
        Sign Up as a Company
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Create a company account.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Company Name" required />
          <Input type="email" size="lg" label="Email" required />
          <Input type="tel" size="lg" label="Phone number" required />
          <Input type="password" size="lg" label="Password" required />
          <Input size="lg" label="What is your company's field?" />
          <Input size="lg" label="Where is the company located?" />
        </div>
        <Button className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="/Login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}

import React from "react";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SuccessAlert({ title, text, openIn }) {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <Alert
        open={open && openIn}
        color="green"
        className="max-w-screen-md"
        icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
        onClose={() => setOpen(false)}
      >
        <Typography variant="h5" color="white">
          {title}
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          {text}
        </Typography>
      </Alert>
    </React.Fragment>
  );
}

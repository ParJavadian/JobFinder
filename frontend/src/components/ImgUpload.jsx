import { Avatar, Input, Typography } from "@material-tailwind/react";
export default function ImgUpload({ onChange, src }) {
  return (
    <>
      <label className="flex flex-col gap-2">
        <Typography className="font-normal text-blue-gray-500 text-sm">
          Profile Picture
        </Typography>
        <Avatar size="lg" for="photo-upload" src={src} alt="avatar" />
        <input
          // variant="static"
          id="photo-upload"
          type="file"
          onChange={onChange}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            display: "inline-block",
            padding: "6px 6px",
          }}
          className="text-blue-gray-500 text-sm max-w-sm"
        />
      </label>
    </>
  );
}

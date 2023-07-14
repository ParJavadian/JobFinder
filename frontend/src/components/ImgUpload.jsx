import { Avatar, Input } from "@material-tailwind/react";
export default function ImgUpload({ onChange, src }) {
  return (
    <>
      {/* <label htmlFor="photo-upload"> */}
      <Avatar size="lg" for="photo-upload" src={src} alt="avatar" />
      <Input
        variant="static"
        id="photo-upload"
        type="file"
        onChange={onChange}
      />
      {/* </label> */}
    </>
  );
}

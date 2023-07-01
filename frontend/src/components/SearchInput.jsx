import { Button, Input } from "@material-tailwind/react";
import SearchIcon from "../images/search.png";
export default function SearchInput() {
  return (
    <div className="relative flex w-full gap-2 md:w-max">
      <Input
        type="search"
        label="Search for jobs"
        className="pr-20"
        containerProps={{
          className: "min-w-[288px]",
        }}
      />
      <Button size="sm" className="!absolute right-1 top-1 rounded">
        Search
      </Button>
    </div>
  );
}

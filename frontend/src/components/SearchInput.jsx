import { Button, Input } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
function handleKeyDown(e) {
  if (e.key === "Enter") {
    //TODO : implement do search
    doSearch();
    console.log("do validate");
  }
}
//TODO
function doSearch() {}
export default function SearchInput() {
  return (
    <div className="relative flex w-full gap-2 md:w-max">
      <Input
        onKeyDown={handleKeyDown}
        variant="oulined"
        // placeholder="Search for jobs"
        label="Search for jobs"
        type="search"
        icon={<Unicons.UilSearch onClick={doSearch} />}
      />
      {/* <Input
        type="search"
        label="Search for jobs"
        className="pr-20"
        containerProps={{
          className: "min-w-[288px]",
        }}
      />
      <Button size="sm" className="!absolute right-1 top-1 rounded">
        Search
      </Button> */}
    </div>
  );
}

import { IconButton, Input } from "@material-tailwind/react";
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
    <>
      <div className="flex items-center justify-center">
        <div className="flex bg-blue-50	flex-row gap-2 w-5/6 rounded-lg border-blue-300 border p-4">
          <Input
            variant="oulined"
            // placeholder="Search for jobs"
            label="Job Title"
            type="search"
            className="bg-white"
          />
          <Input
            variant="oulined"
            // placeholder="Search for jobs"
            label="Location"
            type="search"
            className="bg-white"
          />
          <Input
            onKeyDown={handleKeyDown}
            variant="oulined"
            // placeholder="Search for jobs"
            label="Category"
            type="search"
            className="bg-white"
          />
          <IconButton onClick={doSearch} className="w-24 h-24 flex-none">
            <Unicons.UilSearch />{" "}
          </IconButton>
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
      </div>
    </>
  );
}

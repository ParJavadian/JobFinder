const jobCategories = [
  { value: "0", label: "Tech" },
  { value: "1", label: "Manager" },
  { value: "2", label: "Counseling" },
  { value: "3", label: "Healthcare" },
];

function getCategoryById(id) {
  for (let index = 0; index < jobCategories.length; index++) {
    const element = jobCategories[index];
    if (element.value == id) {
      return element.label;
    }
  }
  return null;
}
// const jobCategories = ["Tech", "Manager", "Counseling", "Healthcare"];
export { getCategoryById, jobCategories };

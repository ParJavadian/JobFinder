const jobCategories = [
  { value: "0", label: "All" },

  { value: "1", label: "Tech" },
  { value: "2", label: "Manager" },
  { value: "3", label: "Counseling" },
  { value: "4", label: "Healthcare" },
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

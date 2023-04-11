// *Importing all the CO images to variable cos*
// resources:
// https://stackoverflow.com/questions/54059179/what-is-require-context
// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
// example use:
// <img src={cos["Adder-Full.png"]} />;
export function importAll(r) {
  let images = {};
  // For every image:
  // item = "./Adder-Full.png" => "Adder-Full.png"
  // r(item) = "/cc17d941af409f6fabd1.png"
  // images["Adder-Full.png"] == "/cc17d941af409f6fabd1.png"
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    console.log(fileInfo);
    reader.onload = () => {
      baseURL = reader
        .result!.toString()
        .replace("data:", "")
        .replace(/^.+,/, "");

      resolve(baseURL);
    };
  });
}

export function getExtension(file: File): string {
  let parts = file.name.split(".");
  return "." + parts[parts.length - 1];
}

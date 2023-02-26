export const userImage = (
  name: string | null | undefined,
  width: number,
  height: number
) => {
  if (name)
    return `${process.env.REACT_APP_SERVER}account/image?name=${name}&width=${width}&height=${height}`;

  return "assets/images/icons8-male-user-96.png";
};

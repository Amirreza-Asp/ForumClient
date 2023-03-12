export const userImage = (
  name: string | null | undefined,
  width: number,
  height: number
) => {
  if (name)
    return `${process.env.REACT_APP_SERVER}account/image?name=${name}&width=${width}&height=${height}`;

  return "assets/images/icons8-male-user-96.png";
};

export const communityImage = (
  name: string | null | undefined,
  width: number,
  height: number
) => {
  if (name)
    return `${process.env.REACT_APP_SERVER}community/image?name=${name}&width=${width}&height=${height}`;

  return "assets/images/icons8-male-user-96.png";
};

export const communityIcon = (name: string, width: number, height: number) =>
  `${process.env.REACT_APP_SERVER}community/icon?name=${name}&width=${width}&height=${height}`;

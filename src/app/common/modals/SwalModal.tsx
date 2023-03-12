import Swal from "sweetalert2";
import { colors } from "../../utility/SD";

export function RemoveSwal(
  item: string,
  removeHandler: (id: string) => Promise<void>,
  id: string,
  preRemove: () => void
) {
  return Swal.fire({
    title: `Remove the desired ${item}?`,
    text: "Do you want to continue",
    icon: "warning",
    confirmButtonText: "Remove",
    confirmButtonColor: `${colors.delete}`,
    background: "rgba(255,255,255,.09)",
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: () =>
      removeHandler(id)
        .then(() => {
          Swal.fire({
            title: "success",
            text: "",
            icon: "success",
            showLoaderOnConfirm: true,
            preConfirm: preRemove,
          });
        })
        .catch((error) => {
          console.log(error);
        }),
  });
}

export function SuccessSwal(title: string, preConfirm: () => void) {
  Swal.fire({
    title: title,
    icon: "success",
    confirmButtonText: "Ok",
    timer: 3000,
    timerProgressBar: true,
    preConfirm: preConfirm,
  });
}

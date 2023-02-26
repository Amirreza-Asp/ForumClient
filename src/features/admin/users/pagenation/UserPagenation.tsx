import React from "react";
import LineButton from "../../../../app/common/buttons/LineButton";
import "./pagenation.css";
import BorderButton from "../../../../app/common/buttons/BorderButton";
import { useStore } from "../../../../app/stores/store";
import { GridQuery } from "../../../../app/models/Queries";
import Loading from "../../../../app/common/loading/Loading";
import { observer } from "mobx-react-lite";
import UpsertUser from "../upsert/UpsertUserPage";
import { colors } from "../../../../app/utility/SD";
import Swal from "sweetalert2";

const pads = [1, 2, 3, 4];

export default observer(function UserPagenation() {
  const { userStore, modalStore } = useStore();
  const { fetchUsers, loadingUsers, users, removeUser } = userStore;
  const [query, setQuery] = React.useState<GridQuery>(new GridQuery());

  React.useEffect(() => {
    fetchUsers(new GridQuery());
  }, [fetchUsers]);

  function remove(userName: string) {
    Swal.fire({
      title: "Remove the desired user?",
      text: "Do you want to continue",
      icon: "warning",
      confirmButtonText: "Remove",
      confirmButtonColor: `${colors.delete}`,
      showCancelButton: true,
      showLoaderOnConfirm: true,

      preConfirm: function (e) {
        return removeUser(userName)
          .then(() => {
            Swal.fire("remove!", "", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  }

  if (loadingUsers) return <Loading width={80} />;

  return (
    <section className="pagenation">
      <div className="pagenation-header">
        <h2>Users</h2>
        <LineButton
          color={colors.add}
          value="  Add  "
          icon="fa fa-plus"
          size="lg"
          onClick={() => modalStore.openModal(<UpsertUser query={query} />)}
        />
      </div>
      <div className="bg-item">
        <div className="content">
          <div className="table-overflow">
            <table>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Name</th>
                  <th>Family</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>UserName</th>
                  <th>Role</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {users?.data.map((item, index) => (
                  <tr key={index}>
                    <td width={"5%"}>{index + 1}</td>
                    <td width={"20%"}>{item.name}</td>
                    <td width={"20%"}>{item.family}</td>
                    <td width={"5%"}>{item.age}</td>
                    <td width={"10%"}>{item.gender}</td>
                    <td width={"20%"}>{item.userName}</td>
                    <td width={"20%"}>{item.role}</td>
                    <td width={"20%"}>
                      <div style={{ width: "max-content" }}>
                        <BorderButton
                          icon="fa fa-eye"
                          color={colors.info}
                          className="mx-2"
                        />
                        <BorderButton
                          icon="fa fa-edit"
                          color={colors.edit}
                          className="mx-2"
                          onClick={() =>
                            modalStore.openModal(
                              <UpsertUser
                                userName={item.userName}
                                query={query}
                              />
                            )
                          }
                        />
                        <BorderButton
                          icon="fa fa-trash"
                          color={colors.delete}
                          className="mx-2"
                          onClick={() => remove(item.userName)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="num-pad">
          <ul>
            <li key="prev" className="disable">
              prev
            </li>
            {pads.map((item) => (
              <li key={item} className={`${item === 1 ? "active" : ""}`}>
                {item}
              </li>
            ))}
            <li key="next">next</li>
          </ul>
        </div>
      </div>
    </section>
  );
});

import { fetchUsers, updateUser, deleteUser } from "../api/api.js";
import {
  fillEditUserForm,
  SuccessMessage,
  closeEditUserModal,
} from "../utils/utilsAdmin.js";
import { getDataForEditedUser } from "../utils/getDataUtils.js";
function displayUserAdminHTML(user, index) {
  return `
    <div class="user-row" ">
      <div class="product-cell email">
        <span>${user.email}</span>
      </div>
      <div class="product-cell username">
        <span>${user.username}</span>
      </div>
      <div class="product-cell role">
        <span class="cell-label">Role:</span>${user.role}
      </div>
      <div class="product-cell status-cell">
        <span class="status ${
          user.status === "Active"
            ? "active"
            : user.status === "Block"
            ? "disabled"
            : ""
        }">${user.status}</span>
      </div>
      <div class="product-cell function">
      <button class="change-btn-user" data-index="${index}">Chỉnh sửa</button>
        <button class="delete-btn-user" data-index="${index}">Xóa</button>
      </div>
    </div>
  `;
}

function displayUsers() {
  const userContainer = document.getElementById("UserContainerAdminVip");
  userContainer.innerHTML = "";

  fetchUsers()
    .then((users) => {
      users.forEach((user, index) => {
        const userHtml = displayUserAdminHTML(user, index);
        userContainer.insertAdjacentHTML("beforeend", userHtml);
      });

      const changeButtons = document.querySelectorAll(".change-btn-user");
      const deleteButtons = document.querySelectorAll(".delete-btn-user");

      changeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = event.target.dataset.index;
          editUser(index);
        });
      });

      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = event.target.dataset.index;
          deleteUserFunc(index);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

async function editUser(index) {
  try {
    const users = await fetchUsers();
    const user = users[index];
    fillEditUserForm(user);

    const submitButton = document.querySelector(".form-submit-btn");

    async function onSubmitButtonClick(event) {
      event.preventDefault();

      const editedUserData = getDataForEditedUser();

      submitButton.removeEventListener("click", onSubmitButtonClick);

      try {
        await updateUser(user.id, editedUserData);
        SuccessMessage("Chỉnh sửa thông tin người dùng thành công!");
        closeEditUserModal();
        displayUsers();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }

    submitButton.addEventListener("click", onSubmitButtonClick);
  } catch (error) {
    console.error(error);
  }
}

async function deleteUserFunc(index) {
  try {
    const users = await fetchUsers();
    const userId = users[index].id;

    await deleteUser(userId);

    SuccessMessage("Đã xóa người dùng có ID: ");

    displayUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export { displayUsers };

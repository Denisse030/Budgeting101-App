import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem } from "../helpers";

export async function logoutAction() {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  if (!user) return redirect("/");

  // Delete data for this user
  localStorage.removeItem(`budgets-${user}`);
  localStorage.removeItem(`expenses-${user}`);
  localStorage.removeItem(`userName-${user}`); // just in case

  // Remove user from allUsers
  const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
  const updatedUsers = allUsers.filter(u => u !== user);
  localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

  // Clear activeUser
  localStorage.removeItem("activeUser");

  toast.success(`Deleted user "${user}" and all their data.`);
  return redirect("/"); // ✅ sends you to intro page
}

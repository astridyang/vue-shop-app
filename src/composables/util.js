import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from "nprogress";
export function toast(
  message,
  type = "success",
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    message,
    type,
    duration: 2500,
    dangerouslyUseHTMLString,
  });
}

export function showModel(content = "content", type = "warning", title) {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type,
  });
}

export function showFullLoading() {
  nprogress.start();
}
export function hideFullLoading() {
  nprogress.done();
}

export function showPrompt(tip, value = "") {
  return ElMessageBox.prompt(tip, "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    inputValue: value,
  });
}

import {ElNotification, ElMessageBox} from "element-plus";
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

export function queryFormat(query) {
    let q = [];
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`);
        }
    }
    let str = q.join("&");
    if (str.length > 0) {
        str = "?" + str;
    }
    return str;
}

export function useArrayMoveUp(array, index) {
    swap(array, index, index - 1)
}

export function useArrayMoveDown(array, index) {
    swap(array, index, index + 1)
}

function swap(array, index1, index2) {
    array[index1] = array.splice(index2, 1, array[index1])[0]
    return array
}
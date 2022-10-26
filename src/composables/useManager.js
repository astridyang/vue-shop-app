import {reactive, ref} from "vue";
import {logout, updatePassword} from "~/api/manager";
import {showModel, toast} from "./util";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export function useRePassword() {
    const form = reactive({
        oldpassword: "admin",
        password: "1",
        repassword: "1",
    });
    const rules = {
        oldpassword: [
            {
                required: true,
                message: "oldpassword can't be empty",
                trigger: "blur",
            },
        ],
        password: [
            {
                required: true,
                message: "password can't be empty",
                trigger: "blur",
            },
        ],
        repassword: [
            {
                required: true,
                message: "repassword can't be empty",
                trigger: "blur",
            },
        ]
    };
    const formDrawerRef = ref(null)

    const formRef = ref(null);
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formDrawerRef.value.showLoading()

            updatePassword(form).then(res => {
                toast("update success, please login again")

            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })

        });
    };

    const showRePasswordForm = () => formDrawerRef.value.open()


    return {
        form,
        formRef,
        formDrawerRef,
        rules,
        onSubmit,
        showRePasswordForm
    }
}

export function useLogout(){
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModel("Logout?").then(() => {
            logout().finally(() => {
                store.dispatch("logout")
                toast("Logout success")
                router.push("/login")
            })
        })
    }
    return {
        handleLogout
    }
}
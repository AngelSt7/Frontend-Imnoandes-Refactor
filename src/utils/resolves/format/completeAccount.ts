import { AuthCompleteAccount, User } from "@/src/types";

export const formatCompleteAccount = (user: User): AuthCompleteAccount => {
    return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        phone: "",
        birthDate: ""
    }
}
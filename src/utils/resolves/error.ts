import { isAxiosError } from "axios";

export const errorHttp = (error: unknown) => {
    if (isAxiosError(error) && error.response) {
        console.log(error.response.data);
        console.log(error);
        const message = error.response.data.message;
        throw new Error(Array.isArray(message) ? message.join(', ') : message);
    }
    console.log(error);
    throw new Error('Unexpected error');
}

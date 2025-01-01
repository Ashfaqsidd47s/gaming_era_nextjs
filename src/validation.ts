import { z } from "zod"

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
    email: requiredString.email("Invalid email address"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, - and _ are allowed"
    ),
    password: requiredString.min(6, "Must be at least 8 characters"),
    name: requiredString,
})

export type SignUpValues = z.infer<typeof signUpSchema>;
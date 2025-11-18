import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
  "La password deve contenere almeno una maiuscola, una minuscola e un numero.";

export const FormSchema = z.object({
  email: z.string().email("Email non valida"),
  firstName: z.string().min(1, "Campo obbligatorio"),
  lastName: z.string().min(1, "Campo obbligatorio"),
  username: z.string().min(3, "Minimo 3 caratteri"),
  password: z
    .string()
    .min(8, "Minimo 8 caratteri")
    .regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema.refine((data) => data);

export function getFieldError(property, value) {
  const { error } = FormSchema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getErrors = (error) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = issue.message;
    all[path] = message;
    return all;
  }, {});

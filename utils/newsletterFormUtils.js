import * as Yup from "yup";

export const newsletterValidationSchema = t => {
  const requiredMsg = t("form_field_required");
  const invalidEmail = t("form_field_email_invalid");
  return Yup.object().shape({
    name: Yup.string().required(requiredMsg),
    nickname: Yup.string().required(requiredMsg),
    email: Yup.string().email(invalidEmail).required(requiredMsg),
  });
}

export const newsletterInitialValues = { name: "", nickname: "", email: "" }


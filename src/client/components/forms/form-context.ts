import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { FormInput } from "@client/components/forms/form-input";
import { FormPassword } from "@client/components/forms/form-password";
import { SubscribeButton } from "@client/components/forms/form-subscribe-button";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Password: FormPassword,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };

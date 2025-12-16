import type { HTMLInputAutoCompleteAttribute } from "react";

import { Field, FieldError, FieldLabel } from "@/client/components/ui/field";
import { Input } from "@/client/components/ui/input";

import { useFieldContext } from "./form-context";


export type FormInputProps = {
  label: string;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

export function FormInput({
  label,
  placeholder,
  autoComplete,
}: FormInputProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

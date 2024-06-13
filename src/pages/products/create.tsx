import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete, SaveButton } from "@refinedev/mui";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";
import { Typography } from "@mui/material";

export const CreateProduct = () => {
  const {
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={<Typography>{errors.name?.message?.toString()}</Typography>}
      />
      <TextField
        {...register("description")}
        multiline
        label="Description"
        error={!!errors.description}
        helperText={
          <Typography>{errors.description?.message?.toString()}</Typography>
        }
      />
      <TextField
        {...register("material")}
        label="Material"
        error={!!errors.material}
        helperText={
          <Typography>{errors.material?.message?.toString()}</Typography>
        }
      />
      {/* We're using Controller to wrap the Autocomplete component and pass the control from useForm */}
      <Controller
        control={control}
        name="category"
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            id="category"
            {...autocompleteProps}
            {...field}
            onChange={(_, value) => field.onChange(value)}
            getOptionLabel={(item) => {
              return (
                autocompleteProps?.options?.find(
                  (option) => option?.id == item?.id
                )?.title ?? ""
              );
            }}
            isOptionEqualToValue={(option, value) => {
              return value === undefined || option?.id == (value?.id ?? value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                margin="normal"
                error={!!errors.category}
                helperText={
                  <Typography>
                    {errors.category?.message?.toString()}
                  </Typography>
                }
              />
            )}
          />
        )}
      />

      <TextField
        {...register("price")}
        label="Price"
        error={!!errors.price}
        helperText={
          <Typography>{errors.category?.message?.toString()}</Typography>
        }
      />

      {/* SaveButton renders a submit button to submit our form */}
      <SaveButton {...saveButtonProps} />
    </Box>
  );
};

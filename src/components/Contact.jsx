import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setOpen(true);
  };

  return (
    <div
      id="contact"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-16 p-8 bg-white"
    >
      <h1 className="text-center text-6xl font-light text-sky-950">Get in Touch</h1>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: "500px",
          bgcolor: "transparent",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          variant="standard"
          InputProps={{
            disableUnderline: false,
          }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          variant="standard"
          InputProps={{
            disableUnderline: false,
          }}
        />

        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          variant="standard"
          InputProps={{
            disableUnderline: false,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          fullWidth
          sx={{
            bgcolor: "#0369a1", // Tailwind sky-700
            "&:hover": { bgcolor: "#075985" }, // sky-800
            py: 1.5,
            mt: 1,
          }}
        >
          Send
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;

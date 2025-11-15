import { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!captchaToken) {
    setOpenError(true);
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        captchaToken,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setOpenSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
    } else {
      setOpenError(true);
    }
  } catch (error) {
    console.error(error);
    setOpenError(true);
  }
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
        />

        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
        />

        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          fullWidth
          sx={{
            bgcolor: "#0369a1",
            "&:hover": { bgcolor: "#075985" },
            py: 1.5,
            mt: 1,
          }}
        >
          Send
        </Button>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Got your message 👍️ I'll reply back ASAP
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenError(false)} severity="warning" sx={{ width: "100%" }}>
          Please complete the CAPTCHA before sending.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Logout } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function LoginForm() {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    userId: "",
    password: "",
    captchaValue: "",
  });
  const [userIdHelperText, setUserIdHelperText] =
    React.useState("Enter UserID");
  const [passwordHelperText, setPasswordHelperText] =
    React.useState("Enter password");
  const [captchaHelperText, setCaptchaHelperText] = React.useState(
    "Enter captcha value"
  );
  const [captchaText, setCaptchaText] = React.useState(generateCaptcha());

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsAccepted) {
      console.log("Form submitted");
      console.log("Form values:", formValues);
    } else {
      alert("Please accept the Terms and Conditions to proceed.");
    }
  };

  const handleChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleInputFocus = (field) => {
    switch (field) {
      case "userId":
        setUserIdHelperText("Please enter user ID");
        break;
      case "password":
        setPasswordHelperText("Please enter password");
        break;
      case "captchaValue":
        setCaptchaHelperText("Please enter captcha value");
        break;
      default:
        break;
    }
  };

  const handleInputBlur = (field) => {
    switch (field) {
      case "userId":
        if (!formValues.userId) {
          setUserIdHelperText("Enter UserID");
        }
        break;
      case "password":
        if (!formValues.password) {
          setPasswordHelperText("Enter password");
        }
        break;
      case "captchaValue":
        if (!formValues.captchaValue) {
          setCaptchaHelperText("Enter captcha value");
        }
        break;
      default:
        break;
    }
  };

  const handleRefreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
  };

  return (
    <Box
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      p={2}
      mr={4}
    >
      <div className="header">
        <img
          src="/images/tata_logo.png"
          className="logo"
          alt="Tata Steel Logo"
        />
        <p className="subtitle">Health Checkup System, Sonari (PHC)</p>
      </div>
      <div className="login_card">
        <Card
          className="card"
          sx={{
            maxWidth: 400,
            position: "relative",
            boxShadow: 4,
            overflow: "visible",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "1rem",
                marginBottom: "2rem",
              }}
            >
              Login
              <IconButton
                sx={{
                  position: "absolute",
                  left: "-24px",
                  background: "#215eb2",
                  borderRadius: "50%",
                  color: "white",

                  boxShadow: 1,
                  border: "none", // Remove border
                  zIndex: 1, // Ensure the icon is above other content
                }}
              >
                <Logout sx={{ fontSize: 28 }} /> {/* Increase icon size */}
              </IconButton>
            </Typography>

            <form
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <TextField
                error={!formValues.userId}
                id="userId"
                label="User ID"
                value={formValues.userId}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("userId")}
                onBlur={() => handleInputBlur("userId")}
                helperText="Enter UserID"
                variant="standard"
                fullWidth
                required
                InputProps={{
                  endAdornment: formValues.userId && (
                    <InputAdornment position="end">
                      <ErrorOutlineIcon color="error" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={!formValues.password}
                id="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("password")}
                onBlur={() => handleInputBlur("password")}
                helperText={passwordHelperText}
                variant="standard"
                fullWidth
                required
                InputProps={{
                  endAdornment: formValues.password && (
                    <InputAdornment position="end">
                      <ErrorOutlineIcon color="error" />
                    </InputAdornment>
                  ),
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <TextField
                  error={!formValues.captchaValue}
                  id="captchaValue"
                  label="Captcha Value"
                  value={formValues.captchaValue}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus("captchaValue")}
                  onBlur={() => handleInputBlur("captchaValue")}
                  helperText={captchaHelperText}
                  variant="standard"
                  required
                  InputProps={{
                    endAdornment: formValues.captchaValue && (
                      <InputAdornment position="end">
                        <ErrorOutlineIcon color="error" />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#000000",
                    marginLeft: "2rem",
                  }}
                  onClick={handleRefreshCaptcha}
                >
                  <span style={{ marginRight: "3rem", fontSize: "1.5rem" }}>
                    {captchaText}
                  </span>
                  <RefreshIcon />
                </Typography>
              </div>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "left", // Align items vertically
                  marginRight: "1rem", // Add margin to the right side
                }}
              >
                <Switch
                  checked={termsAccepted}
                  onChange={handleChange}
                  required
                  inputProps={{ "aria-label": "accept terms and conditions" }}
                />
                <Typography variant="body3">
                  I agree to the Terms and Conditions
                </Typography>
              </div>

              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!termsAccepted}
                  sx={{
                    width: "45%",
                    padding: "0.75rem 1rem",
                  }}
                >
                  Login
                </Button>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    flex: "1",
                    textAlign: "right",
                    textDecoration: "none",
                    color: "#215eb2",
                    lineHeight: "2.50rem",
                  }}
                >
                  Change Password
                </Typography>
              </CardContent>
            </form>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}

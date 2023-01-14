import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoginFormModal from '../../views/loginForm/LoginFormModel'
// mui imports
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import DateInput from "../../components/common/menu/dateInput";
import { bodyStreamToNodeStream } from "next/dist/server/body-streams";
import { Route } from "@mui/icons-material";

const Register = () => {
  const router = useRouter();
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [qualification, setQualification] = useState("");
  const [dob, setDob] = useState("");

  async function register(body) {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(body),
      });

      if (response.status >= 200 && response.status <= 299) {
        console.log(response)
        alert('User Registered')
        setIsLoginFormOpen(true);
      }
    } catch (response) {
      if (response.status >= 400 && response.status <= 499) {
        console.log(`Error!, ${response.data.error}`);
      }
      if (response.status >= 500 && response.status <= 599) {
        console.log(`Server Error! try again later.`);
      }
    }
  }
  function handleRegister(e) {
    e.preventDefault();
    const body = {
      // email: "nabeel1699@gmail.com",
      // password: "test@123",
      // cpassword: "test@123",
      // name: "Nabeel Ahmed",
      // city: "lahore",
      // dob: "2-4-2001",
      // address: "multan",
      // phoneno: "45666",
      // qualification: "bsit",
      name,
      email,
      password,
      city,
      address,
      qualification,
      dob,
      phoneno: phoneNo,
      cpassword: confirmPassword,
    };
    register(body);
  }
  return (
    <>
      <Head>
        <title>Register | ShopJOB</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Back to Login
            </Button>
          </NextLink>
          <form>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
            <DateInput label="Date Of Birth" value={dob} onChange={(date) => setDob(date)} />
            <TextField
              fullWidth
              margin="normal"
              name="city"
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              name="address"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              name="qualification"
              label="Qualification "
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PhoneInput
              fullWidth
              country={"pk"}
              value={phoneNo}
              onChange={(phone) => setPhoneNo(phone)}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              name="confirm_password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox name="policy" />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            <Button fullWidth variant="contained" type="submit" onClick={handleRegister}>
              Register
            </Button>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
      <LoginFormModal open={isLoginFormOpen} />
    </>
  );
};

export default Register;

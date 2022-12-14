import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbars from "./navbar";

function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
        )
        .then((response) => {
          const requestToken = response.data.request_token;
          console.log(requestToken);
          axios
            .post(
              `${process.env.REACT_APP_BASE_URL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_TMDB_KEY}`,
              {
                username: values.username, // priambudi.lintang (bang pinjem ya buat testing)
                password: values.password,
                request_token: requestToken,
              }
            )
            .catch(function (e) {
              alert("username or password ar not valid");
            })
            .then((res) => {
              const validatedRequestToken = res.data.request_token;
              console.log(validatedRequestToken);
              axios
                .post(
                  `${process.env.REACT_APP_BASE_URL}authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`,
                  {
                    request_token: validatedRequestToken,
                  }
                )
                .then((res) => {
                  const sessionID = res.data.session_id;
                  console.log(sessionID);
                  localStorage.setItem("session", sessionID);
                  axios
                    .get(
                      `${process.env.REACT_APP_BASE_URL}account?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionID}`
                    )
                    .then((des) => {
                      const userNames = des.data.username;
                      const avatar = des.data.avatar.gravatar.hash;
                      const profilePicture = des.data.avatar.tmdb.avatar_path;
                      localStorage.setItem("profile", profilePicture);
                      localStorage.setItem("avatar", avatar);
                      localStorage.setItem("usernames", userNames);
                      window.location.assign("/profile");                  
                    });
                });
            });
        });
    },
  });
  return (
    <>
      <Navbars />
      <Form onSubmit={formik.handleSubmit} className="form">
        <Form.Group className="mb-3">
          <Form.Label
            style={{ color: "white", fontSize: 20 }}
            htmlFor="username"
          >
            Username
          </Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <Form.Text
            className="text-muted"
            style={{ color: "white", fontSize: 15 }}
          >
            We'll never share your email with anyone else.
          </Form.Text>
          {formik.touched.username && formik.errors.username ? (
            <div style={{ color: "red" }}>{formik.errors.username}</div>
          ) : null}
          <br />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="password"
            style={{ color: "white", fontSize: 20 }}
          >
            Password
          </Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </Form.Group>
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;

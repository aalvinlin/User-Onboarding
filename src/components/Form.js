import React, {useState, useEffect} from "react";

import axios from "axios";
import { withFormik, Form, Field, setNestedObjectValues} from "formik";
import * as Yup from "yup";

const UserForm = function ( {values, errors, touched, status}) {

    // hold form submission status
    const [userInfo, setUserInfo] = useState([]);

    console.log("userInfo:", userInfo)

    useEffect(() => {

        console.log( "status has changed!", status);

        status && setUserInfo(userInfo => [...userInfo, status]);

    }, [status]);

    return (
        <div>
            <h1>Sign Up</h1>

            <Form>
                <div className="inputDiv">
                    <label htmlFor="userName">Name:</label>
                    <Field name="userName" type="text" value={values.userName}/>
                </div>
                <p className="errors">{touched.userName && errors.userName && (errors.userName)}</p>

                <div className="inputDiv">
                    <label htmlFor="userEmail">Email:</label>
                    <Field name="userEmail" type="email" value={values.userEmail}/>
                </div>
                <p className="errors">{touched.userEmail && errors.userEmail && (errors.userEmail)}</p>

                <div className="inputDiv">
                    <label htmlFor="userPassword">Password:</label>
                    <Field name="userPassword" type="password" value={values.userPassword}/>
                </div>
                <p className="errors">{touched.userPassword && errors.userPassword && (errors.userPassword)}</p>

                <div className="inputDiv">
                    <Field id="tosCheckbox" name="tosCheckbox" type="checkbox" checked={values.tosCheckbox}/>
                    <label htmlFor="tosCheckbox">I accept the Terms of Service</label>
                </div>
                <p className="errors">{touched.tosCheckbox && errors.tosCheckbox && (errors.tosCheckbox)}</p>

                <button type="submit">Register!</button>

            </Form>

            {
                userInfo.map(user =>{

                    let tosStatus = "have";
                    
                    if (!user.tosCheckbox)
                        { tosStatus = "have not"; }

                    return (
                        <div>
                            <p>A new profile has been created for {user.userName}.</p>
                            <p>The following information has been added to your profile.</p>
                            <ul key={Date.now()}>
                                <li>Email: {user.userEmail}</li>
                                <li>Password: {(user.userPassword)}</li>
                            </ul>
                            <p>You {tosStatus} agreed to our Terms and Conditions.</p>
                        </div>
                    )
                })

            }


        </div>
    )
}

const FormikUserForm = withFormik({

    mapPropsToValues(props) {
        return {
            // userName: props.userName,
            // userEmail: props.userEmail,
            // userPassword: props.userPassword,
            // tosCheckbox: props.tosCheckbox

            userName: props.userName || "" ,
            userEmail: props.userEmail || "",
            userPassword: props.userPassword || "",
            tosCheckbox: props.tosCheckbox || false
        }
    },

    validationSchema: Yup.object().shape({

        userName: Yup.string().required("A name is required."),
        userName: Yup.string().length(3, "Your name must be more than 3 characters long."),
        userEmail: Yup.string().email("A valid email is required."),
        userPassword: Yup.string().required("A password is required."),
        userPassword: Yup.string().length(16, "Your password must be more than 16 characters long."),
        // tosCheckbox: Yup.boolean().isValid(true)
        tosCheckbox: Yup.boolean().oneOf([true], "You must accept the Terms and Conditions").required("You need to check the checkbox."),
        // tosCheckbox: Yup.boolean().test("OK", "You must accept the Terms and Conditions", () => {tosCheckbox === true})
    }),

    handleSubmit(
        values,
        { setStatus, resetForm }
     ) {
         console.log("submitting", values);

         axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                console.log("Axios POST request successful", response);
                // setStatus(response.data);

                resetForm();
                })
            .catch(error => console.log(error.response));
     }

})(UserForm);

export default FormikUserForm;
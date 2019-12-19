import React, {useState} from "react";

import axios from "axios";
import { withFormik, Form, Field, setNestedObjectValues} from "formik";
import * as Yup from "yup";

let values = {};
values.tosAccepeted = true;

const UserForm = function () {

    return (
        <div>
            <h1>Sign Up</h1>

            <Form>
                <div className="inputDiv">
                    <label htmlFor="userName">Name:</label>
                    <Field name="userName" type="text"/>
                </div>

                <div className="inputDiv">
                    <label htmlFor="userEmail">Email:</label>
                    <Field name="userEmail" type="email"/>
                </div>

                <div className="inputDiv">
                    <label htmlFor="userPassword">Password:</label>
                    <Field name="userPassword" type="password"/>
                </div>

                <div className="inputDiv">
                    <Field name="tosCheckbox" type="checkbox" checked={values.tosAccepted}/>
                    <label htmlFor="tosCheckbox">I accept the Terms of Service</label>
                </div>

                <button type="submit">Register!</button>

            </Form>


        </div>
    )
}

const FormikUserForm = withFormik({

    mapPropsToValues(props) {
        return {
            userName: props.userName,
            userEmail: props.userEmail,
            userPassword: props.userPassword,
            tosAccepted: props.tosAccepted
        }
    }

})(UserForm);

export default FormikUserForm;
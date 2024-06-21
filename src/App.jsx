import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./App.css";
import Shifts from "./Shifts";

const validationSchema = Yup.object({
  start_time: Yup.date().required("Start time is required"),
  end_time: Yup.date().required("End time is required"),
  worker_id: Yup.number()
    .required("Worker ID is required")
    .positive()
    .integer(),
  date: Yup.date().required("Date is required"),
});

function App() {
  const initialValues = {
    start_time: "",
    end_time: "",
    worker_id: "",
    date: "",
  };

  const [baseError, setBaseError] = useState("");
  const formik1 = useFormikContext();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:3007/shifts", values);
      console.log("Form submitted successfully:", response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
      setBaseError("")
      alert("Worker shift saved successfully!")
      formik1.resetForm(); // Reset all form fields
    } catch (error) {
      if (error.response && error.response.data && error.response.data.base) {
        console.log("Error submitting form:", error);
        setBaseError(error.response.data.base);
      } else {
        console.error("Error submitting form:", error);
        // Handle non-validation errors (e.g., show a generic error message)
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>Worker Shift Management</h1>
      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
              {baseError && (
                <div className="mb-4 text-red-600 text-sm">{baseError}</div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="start_time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <Field
                  type="datetime-local"
                  id="start_time"
                  name="start_time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="start_time"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_time"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <Field
                  type="datetime-local"
                  id="end_time"
                  name="end_time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="end_time"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="worker_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Worker ID
                </label>
                <Field
                  type="number"
                  id="worker_id"
                  name="worker_id"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="worker_id"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Shifts></Shifts>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

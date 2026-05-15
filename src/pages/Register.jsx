import axios from 'axios'
import React, { useActionState } from 'react'

export default function Register() {

  // Handles form action state
  const [state, formAction, isPending] =
    useActionState(submitHandler, {})

  // Runs when form submits
  async function submitHandler(prev, formData) {

    // Get form values
    const email = formData.get("email")
    const password = formData.get("pass")

    // POST request to create user
    const res = await axios.post(
      "http://localhost:3000/api/users",
      {
        email: email,
        password: password
      }
    )

    // Debug logs
    console.log(res.data);
    console.log(res.data.token);

    // TODO:
    // redirect to login page
  }

  return (
    <div>

      <h1>Register</h1>

      <form action={formAction}>

        {/* Email input */}
        <input
          className='input'
          type="text"
          name="email"
        />

        {/* Password input */}
        <input
          className='input'
          type="text"
          name="pass"
        />

        {/* Submit button */}
        <input
          type='submit'
          value={"Submit"}
          className='btn'
        />

      </form>
    </div>
  )
}
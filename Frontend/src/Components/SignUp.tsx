function SignUp() {
  return (
    <div>
      <input type="text" placeholder="Full Name" />
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Confirm Password" />
      <div className="bg-amber-200 cursor-pointer">
        Submit
      </div>
    </div>
  );
}

export default SignUp;

export default function ({ $auth, redirect }) {
  if ($auth.user?.role?.name === 'Admin') {
    console.log('Admin can access admin page')
  } else {
    console.log("User can't access admin page")
    redirect('/')
  }
}

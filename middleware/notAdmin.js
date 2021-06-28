export default function ({ $auth, redirect }) {
  if ($auth.user?.role?.name === 'Admin') {
    console.log("Admin can't access admin page")
    redirect('/')
  } else {
    console.log('User can access admin page')
  }
}

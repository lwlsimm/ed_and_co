import './about.css'

const About = () => {
  return (
    <div className="aboutPage">
      <h2 className="aboutHeader">About</h2>
      <p className="aboutPara">
        Thank you for visiting this website.  This is a dummy e-commerce app that I created as part of my codecademy full-stack course.
      </p>
      <p className="aboutPara">
        This web app is fully functional.  It allows users to create an account, login in and out, view and update theirm account, create orders and view their past orders.  
      </p>
      <p className="aboutPara">
        I have used the following in the development of this app:
      </p>
      <ul>
        <li className="aboutList">React</li>
        <li className="aboutList">React Router</li>
        <li className="aboutList">Redux</li>
        <li className="aboutList">NodeJS Express</li>
        <li className="aboutList">Postgres SQL</li>
      </ul>
      <h2 className="aboutHeader">How to Use</h2>
      <p className="aboutPara">First of all, you should register for an account.  There is no need for you to use your actual email, name or address details - this site is only for demo purposes and therefore no personal data should be entered.  You will then be able to log in and logout, place orders, add and remove addresses, view your orders and change your password.</p>
    </div>
  )
}

export default About;
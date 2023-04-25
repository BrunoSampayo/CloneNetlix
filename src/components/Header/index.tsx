import "./Header.css"
import netflixLogo from '../../assets/Netflix_2015_logo.svg'
import netflixUser from '../../assets/Netflix-avatar.png'

type Props ={
    black:boolean
}

export const Header = ({black}:Props)=>{
    return(
        <header className={black ? 'black' : ''} >
            <div className="header--logo">
                <a href="/">
                    <img src={netflixLogo} alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src={netflixUser} alt="" />
                </a>
            </div>
        </header>
    )
}
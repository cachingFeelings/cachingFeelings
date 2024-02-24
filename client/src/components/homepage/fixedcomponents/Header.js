import './fixedcomponents.css'

const Header = () => {

    const content = (
        <div className='above-navigation-bar'>
          <p className='title'>Caching Feelings</p>
          <div className='button-group'>
            <button className='community-button'>Community</button>
            <button className='signout-button'>Sign Out</button>
          </div>
        </div>
      )
    
      return content; 
}
export default Header
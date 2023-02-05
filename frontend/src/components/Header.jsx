import { useEffect } from 'react';
/* Provides some basic header tags + JS files for pages */
function Header(props) {
    useEffect(() => {
        document.title = props.title
     });
}
export default Header;

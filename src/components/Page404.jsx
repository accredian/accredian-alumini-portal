import React, { useState } from 'react';
import './Page.css'
const Page404=()=>{
   
    return(
        <>
        <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<a href="https://accredian.com/">Go To Homepage</a>
		</div>
	</div>
        </>
    )
}
export default Page404
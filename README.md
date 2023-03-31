#  AppTrack
Welcome to AppTrack!

### Building
```
git clone git@github.com:akhorana14/AppTrack.git
cd AppTrack
npm i
cd backend && npm i && cd ..
cd frontend && npm i && cd ..
```
This should build/install all necessary components for the AppTrack backend and frontend.

## Backend
To create a backend route, use the following snippet:
```
router.get("/test", GoogleAuth.getAuthMiddleware(), async function (req, res, next) {
	let user:User = req.user;
	res.send(req.user.id);
});
```
This will ensure that the user is logged in (due to the inclusion of `GoogleAuth.getAuthMiddleware()`), get the current user's id, and return it to the caller. Any request that has `GoogleAuth.getAuthMiddleware()` should have a defined `user` object attached to `req` (and if not the user will be redirected to sign in with Google). 

### Query on Frontend
To query that route on the frontend, use the following snippet on the frontend page (.jsx):
```
async function queryTest() {
	let res = await fetch(`${process.env.REACT_APP_BACKEND}/test`, {
		credentials: "include"
	});
	if (res.ok) {
		return await res.text();
	}
	else {
		console.error("Request failed")
		return null;
	}
}
```

This code will send a request to the test endpoint and will include any relevant session cookies (like the user's Google login credentials). Keep in mind, this request will not work unless the user has been authenticated on the backend (simply navigate to the google auth endpoint and sign in). This snippet will return the response's text if it has code 200 (HTTP OK). 

### Database Integration
Moving back to the backend, we can query and save objects to the database in our test endpoint, like so:
```
router.get("/test", GoogleAuth.getAuthMiddleware(), async function (req, res, next) {
	//Get the object from the DB
	let company = await CompanyController.getByName("Google");
	//Modify it
	company.leetcodeLink = "https://example.com";
	//Save it
	await CompanyController.save(company);
	res.send("All done!");
});
```
This will get the company object with the name "Google" from the database, change it, and save it to the database. The database will then update the data as needed. 

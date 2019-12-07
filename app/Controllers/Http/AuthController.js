'use strict'

class AuthController {
	async getLogin({ view }) {
		return view.render('login')
	}
	async postLogin({ request, response, auth }) {
		const { email, password } = request.all()
		await auth.attempt(email, password)
		console.log({
			email: request.all()['email'],
			pass: request.all()['password']
		})
		return response.route('profile')
	}
	async postLogout({ auth, response }) {
		await auth.logout()
		return response.route('/')
	}
	async getProfile({ auth, view }) {
		const user = auth.user.toJSON()
		return view.render('profile', {user: user})
	}
}

module.exports = AuthController

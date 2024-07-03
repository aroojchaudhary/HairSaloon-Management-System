/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return "Hey, Welcome to Shape your Style!"
})



//Auth
Route.post('api/user_signup', 'CustomersController.signUp')
Route.post('api/user_login', 'CustomersController.login')
Route.post('api/user_logout', 'CustomersController.logout').middleware('auth')



//Admin Routes
Route.group(() => {
  // Barbers
  Route.post('/barbers', 'BarbersController.store')
  Route.get('/barbers', 'BarbersController.index')
  Route.put('/barbers/:id', 'BarbersController.update')
  Route.delete('/barbers/:id', 'BarbersController.destroy')
  // HairStyles
  Route.post('/hair_styles', 'HairStylesController.store')
  Route.get('/hair_styles', 'HairStylesController.index')
  Route.put('/hair_styles/:id', 'HairStylesController.update')
  Route.delete('/hair_styles/:id', 'HairStylesController.destroy')
  // Appointments
  Route.get('/all_appointments', 'AppointmentsController.allAppointments')
  // Reviews
  Route.get('/all_reviews', 'ReviewsController.allReviews')
}).prefix('api').middleware(['auth', 'adminAuth'])



//Barber Routes
Route.group(() => {
  // Appointments
  Route.get('/barber_appointments', 'AppointmentsController.barberAppointments')
  Route.put('/appointments/:id', 'AppointmentsController.update')
  // Reviews
  Route.get('/barber_reviews', 'ReviewsController.barberReviews')
}).prefix('api').middleware(['auth', 'barberAuth'])



//Customers Routes
Route.group(() => {
  // Barbers
  Route.get('/all_barbers', 'BarbersController.index')
  // Appointments
  Route.post('/appointments', 'AppointmentsController.store')
  Route.get('/customer_appointments', 'AppointmentsController.customerAppointments')
  // HairStyles
  Route.post('/saved_hair_styles', 'SavedHairStylesController.store')
  Route.get('/saved_hair_styles', 'SavedHairStylesController.index')
  Route.delete('/saved_hair_styles/:id', 'SavedHairStylesController.destroy')
  // Reviews
  Route.post('/reviews', 'ReviewsController.store')
  Route.get('/customer_reviews', 'ReviewsController.customerReviews')
}).prefix('api').middleware(['auth', 'customerAuth'])
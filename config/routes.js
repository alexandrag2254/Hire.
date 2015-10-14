var users = require('./../server/controllers/users.js');
  module.exports = function(app) {
    app.post('/charge',function(req,res){
      var stripe = require("stripe")("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
      var stripeToken = req.body.id;     
      var charge = stripe.charges.create({
        amount: req.body.amount, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          // The card has been declined
        }
      })
    });

    app.post('/check_login', function(req, res) {
      users.check_login(req.body, res);
    });
    app.post('/check_contact', function(req, res) {
      users.check_contact(req.body, res);
    });
    app.post('/new_user', function(req, res) {
      users.new_user(req.body, res);
    });
   app.post('/add_appointment', function(req, res){
      users.add_appointment(req.body, res);
    });
   app.post('/add_task', function(req, res){
      users.add_task(req.body, res);
    });
   app.post('/add_event', function(req, res){
      users.add_vacation(req.body, res);
    });
   app.post('/add_contact', function(req, res){
      users.add_contact(req.body, res);
    });
   app.post('/add_message', function(req, res){
      users.add_message(req.body, res);
    });
    app.post('/add_user', function(req, res){
      users.add_user(req.body, res);
    });
    app.post('/add_service', function(req, res){
      users.add_service(req.body, res);
    });
    app.post('/add_review', function(req, res){
      users.add_review(req.body, res);
    });
    app.get('/get_appointment/:id', function(req, res) {
      users.get_appointment(req.params, res);
    });
    app.get('/get_user_by_name/:name', function(req, res) {
      users.get_user_by_name(req.params, res);
    });
    app.get('/get_service/:id', function(req, res) {
      users.get_service(req.params, res);
    });
    app.get('/get_user/:id', function(req, res) {
      users.get_user(req.params, res);
    });
    app.get('/get_contractor/:id', function(req, res) {
      users.get_contractor(req.params, res);
    });
    app.get('/delete_appointment/:user_id/:id', function(req, res) {
      users.delete_appointment(req.params, res);
    });
    app.get('/get_appointments/:id', function(req, res) {
      users.get_appointments(req.params, res);
    });
    app.get('/get_messages/:id', function(req, res) {
      users.get_messages(req.params, res);
    });
    app.get('/get_tasks/:id', function(req, res) {
      // console.log(req.params)
      users.get_tasks(req, res);
    });
    app.get('/get_services/:id', function(req, res) {
      users.get_services(req, res);
    });
    app.get('/get_events/:id', function(req, res) {
      users.get_vacations(req.params, res);
    });
    app.get('/get_reviews/:id', function(req, res) {
      users.get_reviews(req.params, res);
    });
    app.get('/get_users', function(req, res) {
      users.get_users(req, res);
    });
    app.get('/get_servicelist/:id', function(req, res){
      users.get_servicelist(req.params, res);
    });
    app.get('/get_contact_list/:id', function(req, res){
      users.get_contact_list(req.params, res);
    });
    app.get('/get_globalServices', function(req, res){
      users.get_globalServices(req, res);
    });
    app.get('/get_users/:id', function(req, res){
      users.get_servicelist(req.params, res);
    });
    app.get('/search_users/:service', function(req, res){
      users.search_users(req.params, res);
    });
}
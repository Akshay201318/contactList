const express=require('express');
const path= require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){


    Contact.find({}, function(err,contacts){
        if(err)
        {
            console.log('Eroor in fetching');
            return;
        }
        return res.render('home',{title:"My cintacts list",
    contact_list:contacts});
    });

    

});
app.get('/practice',function(req,res){

    return res.render('practice',{title:"let's play with ejs"});

});

app.post('/create-contact', function(req,res){
           //contactList.push(req.body);

           Contact.create({
               name: req.body.name,
               phone: req.body.phone
           }, function(err, newContact){


            if(err)
            {
                console.log('error in creating a contact');
                return;
            }

            console.log('********', newContact);
            return res.redirect('back');
            

           });
});
app.get('/delete-contact',function(req,res){
          
      let id=req.query.id;
      Contact.findByIdAndDelete(id , function(err)
      {
          if(err)
          {
              console.log('error in deleting the contact');
              return;
          }
              
          return res.redirect('/');

      });
      
});




app.listen(port,function(err){
    if(err)
    {
        console.log('error in running the server',err);
        return;
    }
    console.log('Yup! My express server is running on port:',port);

});
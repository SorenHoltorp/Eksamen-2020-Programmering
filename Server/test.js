"use strict";

const mongoose = require('mongoose');
const User = mongoose.Schema;
const chai = require('chai').expect;
//const expect = chai.expect;

// Laver et nyt schema, det ligner det jeg har i model

  const newuser = new User ({
    userName: {type: String, required: true}
});

  //Laver en ny collection af data tilhørende min model, lister alle de parametere jeg normalt ville have i min model
const UserName = mongoose.model('userName,password,gender,email,birthday', newuser);

describe('Database Test', function() {
    //Før jeg tester, etablerer jeg en helt ny database i MongDB, så jeg ikke ødelægger noget i den gamle.
    before(function (done) {mongoose.connect(
        "mongodb+srv://tester:tester1@testing.jfz5s.mongodb.net/tester?retryWrites=true&w=majority",
       { useNewUrlParser: true },
       () => console.log("Serveren kører babe!"));

      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function() {
        console.log('Der er oprettet forbindelse til MONGODB!');
        done();
      });
    });
    // Her beskriver jeg hvad jeg kommer til at teste
    describe('Mocha og chai testing af Create user til Databasen', function() {
      //Jeg tester om jeg kan gemme et nyt objekt, altså parameteren userName med værdien "Nikolaj" til databasen.
      //Jeg undlader at teste om jeg kan gemme alle 5 parametere, da hvis jeg kan med en, bør jeg kunne med alle.
      it('Et nyt userName er blevet tilføjet til databasen', function(done) {
        let testuserName = UserName({
            userName: 'Nikolaj'
        });

        testuserName.save(done);
        //Her gemmer jeg nu denne test af et objekt i databasen.
      });
      it('Her tester jeg så, om den gemmer et save af et forkert userName', function(done) {
        //Jeg prøver at gemme et forkert navn, burde udløse en fejl
        var forkertSave = UserName({
          notuserName: 'Ikke Nikolaj'
        });
        forkertSave.save(err => {
          if(err) 
        { return done(); }
          throw new Error('Udløs en fejl!');
        });
      });
      it('Burde modtage data fra databasen', function(done) {
        //Her prøver jeg at finde brugeren med userName Nikolaj, hvis det skulle være rigtigt, skulle det være et id parameter.
        UserName.find({userName: 'Nikolaj'}, (err, userName) => {
          if(err) 
          {throw err;}
          if(userName.length === 0) {throw new Error('Ingen nikolaj!');}
          done();
        });
      });
              //Jeg prøver at gemme et forkert navn, burde udløse en fejl
        it('Burde slette data fra databasen', function(done) {
        //Her prøver jeg at finde brugeren med userName Nikolaj, hvis det skulle være rigtigt, skulle det være et id parameter.
        UserName.deleteOne({userName: 'Nikolaj'}, (err, userName) => {
            if(err) 
            {throw err;}
            if(userName.length === 0) {return('User er blevet slettet!');}
            done();
                });
              });
    });
    //Når alle tests er færdige dropper jeg database og lukker forbindelsen.
    after(function(done){
      mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close(done);
      });
    });
  });
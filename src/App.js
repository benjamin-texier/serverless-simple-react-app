import React, {Component} from 'react';
import * as configs from './configs'
import './App.css';


/****************************************************
Nom ......... : React-Simple-App.js
Role ........ : Render de l'application
Projet ...... : Serverless | Veille Techno
Auteur ...... : Benjamin TEXIER
Version ..... : V1.0 du 03/04/2019
*****************************************************/


class App extends Component {


    /**
     * Constructeur de la classe
     */
    constructor() {
        super();

        this.sendMail = this.sendMail.bind(this);
        this.getData = this.getData.bind(this);
        this.postData = this.postData.bind(this);

        this.state = {data: null}
    }



    /**
     * Fonction lancée une fois le composant créé
     */
    componentDidMount() {
        this.getData();
    }



    /**
     * Permet de récupérer les données du formualaire
     */
    getForm(){
      return {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
      }
    }



    /**
     * Fonction pour "valider" le formulaire
     * @param {obj} data 
     */
    formValidator(data){
      if(data.name === "")
        return false
      if(data.email === "")
        return false
      if(data.message === "")
        return false
      return true
    }


    /**
     * Fonction pour envoyer les données du formulaire de contact
     * @param {*} event 
     */
    sendMail(event) {
        event.preventDefault();
        var data = this.getForm()
        if(!this.formValidator(data)){
            console.error("erreur(s) dans le formulaire", data)
            return false;
        }
        fetch(configs.SEND_MAIL_URL, {
            headers: {
                'Accept': configs.SEND_MAIL_ACCEPT,
                'Content-Type': configs.SEND_MAIL_CONTENT_TYPE
            },
            method: configs.SEND_MAIL_METHOD,
            body: JSON.stringify(data)
        }).then(res => {
          if(res.ok === true) console.log("message envoyé", data)
          else console.error("Message non envoyé")
        })
        .catch(function(error) {console.error(error.message)});
    }



    /**
     * Fonction pour envoyer les données sur DynamoDB
     * @param {*} event 
     */
    postData(event){
        event.preventDefault();
        var data = {text: this.data.value}
        if(data.text === ""){
            console.error("data vide")
            return false;
        }
        fetch(configs.POST_DATA_URL, {
            headers: {
                'Accept': configs.POST_DATA_ACCEPT,
                'Content-Type': configs.POST_DATA_CONTENT_TYPE
            },
            mode: "cors",
            method: configs.POST_DATA_METHOD,
            body: JSON.stringify(data)
        }).then(res => {
          if(res.ok === true) console.log("data stockée", data)
          else console.error("data non stockée")
        }).then(setTimeout(()=>{this.getData()},1000))
        .catch(function(error) {console.error(error.message)});
    }


    /**
     * Requête pour récupérer les données de DynamoDB
     */
    getData(){
        fetch(configs.GET_DATA_URL, {
            mode:"cors",
            method: configs.GET_DATA_METHOD
        })
        .then(response => response.json())
        .then(response => {
            this.setState({ data: response })
            console.log(response)
        })
        .catch(function(error) {console.error(error.message)});
    }




    /**
     * Render de l'application react
     */
    render() {
        return (
            <div className="App">
                {/*
                    BLOC | Header
                */}
                <header className="App-header">
                    <h1 className="display-3">Une application 100% Serverless ?</h1>
                </header>

                {/*
                    BLOC | Corps de l'application
                */}
                <div className="jumbotron jumbotron-fluid">

                    <div className="container">
                            <div>
                                <input
                                ref={input => this.data = input}
                                type="text"
                                id="data"
                                className="form-control mb-3"
                                placeholder="Ma nouvelle donnée"
                                required="required"
                            />
                            <button
                                type="submit"
                                className="btn btn-warning btn-lg btn-block mb-5"
                                onClick={this.postData}> 
                                Ajouter une donnée?
                            </button>
                            </div>
                    <h1 className="display-6">Mes données</h1>
                      {this.state.data !== null && this.state.data.length > 0 ?
                        <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Value</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(value =>
                                    <tr key={value.id}>
                                        <td className="row">{value.text}</td>
                                        <td>{value.id}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        :   
                        <div>
                            pas encore de données <span role="img" aria-label="triste">☹️</span>
                        </div>
                        } 
                    </div>
                </div>

                {/*
                    BLOC | Nous contacter
                */}
                <div className="container pb-5">
                    <h1 className="display-6">Vous souhaitez nous contacter?</h1>
                    <form onSubmit={this.sendMail}>

                        {/* NOM */}
                        <div className="form-group">
                            <label htmlFor="name">
                                Votre nom
                            </label>
                            <input
                                ref={input => this.name = input}
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="John Doe"
                                required="required"/>
                            <small id="nameHelp" className="form-text text-muted">Saisissez ici votre nom ou surnom.</small>
                        </div>

                        {/* EMAIL */}
                        <div className="form-group">
                            <label htmlFor="email">Votre adresse mail</label>
                            <input
                                ref={input => this.email = input}
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="exemple@mail.com"
                                required="required"/>
                            <small id="emailHelp" className="form-text text-muted">Saisissez ici votre adresse mail.</small>
                        </div>

                        {/* MESSAGE */}
                        <div className="form-group">
                            <label htmlFor="message">Votre commentaire</label>
                            <textarea
                                ref={input => this.message = input}
                                rows="3"
                                id="message"
                                className="form-control"
                                required="required">
                            </textarea>
                        </div>

                        {/* ENVOYER */}
                        <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={this.sendMail}>Envoyer</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
